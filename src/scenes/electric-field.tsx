import { Circle, Layout, Line, makeScene2D, Rect } from '@canvas-commons/2d'
import { all, createRef, createSignal, DEFAULT, makeRef, Vector2 } from '@canvas-commons/core'
import { appear, disappear } from '../utils/animation'

export default makeScene2D(function* (view) {
  view.fill('white')

  const dotPosition = Vector2.createSignal([0, 0])

  const dotRef = createRef<Circle>()
  const arrowRefs: Line[] = []

  view.add(
    <Layout
      layout
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
            opacity={0.2}
            stroke={'teal'}
            lineWidth={3}
            endArrow={true}
            arrowSize={6}
          />
        </Rect>
      ))}
    </Layout>,
  )

  arrowRefs.forEach((arrow) => {
    const { x, y } = arrow.position.abs()
    const computedX = x - view.width() / 2
    const computedY = y - view.height() / 2
    const rotation = createSignal(
      () =>
        180 +
        Math.atan2(computedY - dotPosition().y, computedX - dotPosition().x) * (180 / Math.PI),
    )
    arrow.rotation(rotation)
  })

  view.add(<Circle ref={dotRef} fill={'coral'} size={20} position={dotPosition} />)

  yield* all(dotPosition([200, -200], 1), appear(dotRef()))
  yield* dotPosition([200, 200], 1).to([-200, 200], 1).to([-200, -200], 1)
  yield* all(dotPosition(DEFAULT, 1), disappear(dotRef()))
})
