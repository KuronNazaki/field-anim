import { Circle, Line, makeScene2D, Rect } from "@motion-canvas/2d";
import { createRef, useLogger, Vector2 } from "@motion-canvas/core";

export default makeScene2D(function* (view) {
  const logger = useLogger();
  const lineRef = createRef<Line>();

  view.fill("white");

  const arrows = Array.from(
    { length: (1920 * 1080) / (40 * 40) },
    (_, index) => (
      <Rect
        key={`${index}`}
        width={40}
        height={40}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Line
          ref={lineRef}
          points={[
            [-10, 0],
            [10, 0],
          ]}
          stroke={"gray"}
          opacity={0.2}
          lineWidth={5}
          endArrow={true} // Adds the arrowhead at the end
          arrowSize={8} // Controls the size of the arrowhead
          rotation={0}
        />
      </Rect>
    ),
  );
  const fieldGrid = (
    <Rect
      layout
      justifyContent={"space-between"}
      alignItems={"center"}
      wrap="wrap"
      width={1920}
      height={1080}
    >
      {arrows}
    </Rect>
  );
  arrows.forEach((value) =>
    logger.info(
      `x: ${value.absolutePosition().x}, y: ${value.absolutePosition().y}, grad: ${fromGradToDegree(calculateAngle(value.absolutePosition()))}`,
    ),
  );

  view.add(fieldGrid);
});

const calculateAngle = (dimension: Vector2) => {
  return Math.asin(
    dimension.y / (Math.pow(dimension.x, 2) + Math.pow(dimension.y, 2)),
  );
};

const fromGradToDegree = (grad: number) => {
  return grad * 180
}
