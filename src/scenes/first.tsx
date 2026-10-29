import { Circle, Line, makeScene2D, Rect, Node, Layout } from "@motion-canvas/2d";
import {
  all,
  Color,
  createRef,
  createSignal,
  DEFAULT,
  easeInOutCubic,
  linear,
  tween,
  useLogger,
  Vector2,
  waitFor,
  waitUntil,
} from "@motion-canvas/core";

export default makeScene2D(function* (view) {
  view.fill("white");

  const logger = useLogger();

  const degree = createSignal<number>(0);
  const pass = createSignal<number>(-1920);
  const computedPass = createSignal<Vector2>(
    () => new Vector2({ x: pass() / 2, y: 0 }),
  );

  const arrow = createRef<Line>();
  const dot = createRef<Circle>();
  const container = createRef<Rect>();

  const refs: Node[] = [];

  const arrows = Array.from(
    { length: (1920 * 1080) / (40 * 40) },
    (_, index) => {
      const a = (
        <Rect
          key={`${index}`}
          width={40}
          height={40}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Line
            points={[
              [-10, 0],
              [10, 0],
            ]}
            opacity={0.2}
            stroke={"teal"}
            lineWidth={3}
            endArrow={true}
            arrowSize={6}
          />
        </Rect>
      );

      refs.push(a);

      return a;
    },
  );

  view.add(
    <Layout
      layout
      wrap={"wrap"}
      width={1920}
      height={1080}
      justifyContent={"center"}
      alignItems={"center"}
    >
      {arrows}
    </Layout>,
  );

  refs.forEach((arrow) => {
    const { x, y } = arrow.absolutePosition();
    const computedX = x - (1920 / 2)
    const computedY = y - (1080 / 2)
    logger.info(`x = ${computedX}, y = ${computedY}`);
    const c = createSignal(() => 180 + Math.atan2(computedY, computedX - (pass() + (1920 / 4))) * (180 / Math.PI))
    arrow.rotation(c);
  });

  view.add(<Circle ref={dot} size={20} position={computedPass} />);

  yield* all(
    pass(DEFAULT, 0).to(1920, 10),
    tween(10, (value) => {
      dot().fill(
        Color.lerp(
          new Color("coral"),
          new Color("teal"),
          easeInOutCubic(value),
        ),
      );
    }),
  );
});
