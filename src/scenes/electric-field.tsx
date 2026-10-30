import { Circle, Latex, Layout, Line, makeScene2D, Rect } from '@canvas-commons/2d'
import {
  all,
  createRef,
  useLogger,
  createSignal,
  DEFAULT,
  makeRef,
  Vector2,
  SignalValue,
  PossibleVector2,
} from '@canvas-commons/core'
import { appear, disappear } from '../utils/animation'

export default makeScene2D(function* (view) {
  const log = useLogger()

  view.fill('white')

  const dotPosition = Vector2.createSignal([0, 0])
  const arrowOpacity = createSignal(0)

  const dotRef = createRef<Circle>()
  const arrowRefs: Line[] = []

  const layoutRef = createRef<Layout>()

  view.add(
    <Layout
      layout
      ref={layoutRef}
      wrap={'wrap'}
      width={800}
      height={800}
      justifyContent={'center'}
      alignItems={'center'}
    >
      {Array.from({ length: 400 }, (_, index) => (
        <Rect
          key={`${index}`}
          width={40}
          height={40}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <Line
            ref={makeRef(arrowRefs, index)}
            points={[
              [-10, 0],
              [10, 0],
            ]}
            opacity={arrowOpacity}
            stroke={'teal'}
            lineWidth={3}
            endArrow={true}
            arrowSize={6}
          />
        </Rect>
      ))}
    </Layout>,
  )

  arrowRefs.forEach((arrow, index) => {
    arrow.points(fromWidthToVector(Math.abs(mapInterval(index, 0, 399, 2, 20))))

    const { x, y } = arrow.position.abs()
    const computedX = x - view.width() / 2
    const computedY = y - view.height() / 2
    log.info(`${computedX} ${computedY}`)
    const rotation = createSignal(
      () =>
        180 +
        Math.atan2(computedY - dotRef().position().y, computedX - dotRef().position().x) *
          (180 / Math.PI),
    )
    arrow.rotation(rotation)
  })
  layoutRef().add(
    <Latex
      width={300}
      marginTop={70}
      tex={`E_{\\text{field}} = \\frac{F}{q_{\\text{test}}} = k_0 \\frac{|Q|}{r^2}`}
      fill="coral"
    />,
  )

  view.add(<Circle ref={dotRef} fill={'coral'} size={20} position={dotPosition} />)

  yield* all(appear(dotRef()), arrowOpacity(0.5, 1))
  yield* dotPosition([200, -200], 1)
  yield* dotPosition([200, 200], 1).to([-200, 200], 1).to([-200, -200], 1)
  yield* all(dotPosition(DEFAULT, 1), disappear(dotRef()))
  yield* arrowOpacity(0, 1)
})

function getElectricalIntensity(q: number, r: number, epsilon = 1) {
  const k = 9 * 10 ** 9
  return (k * Math.abs(q)) / (epsilon * r ** 2)
}
function mapInterval(x: number, a1: number, b1: number, a2: number, b2: number) {
  return a2 + ((b2 - a2) / (b1 - a1)) * (x - a1)
}
function fromWidthToVector(width: number): SignalValue<PossibleVector2>[] {
  const each = width / 2
  return [
    [-each, 0],
    [each, 0],
  ]
}
