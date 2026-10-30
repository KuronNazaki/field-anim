import { makeScene2D } from '@canvas-commons/2d'
import { createRef, waitFor } from '@canvas-commons/core'
import { AnimatedLatex } from '../components/animated-latex'

export default makeScene2D(function* (view) {
  view.fill('black')

  const latex = createRef<AnimatedLatex>()

  view.add(
    <AnimatedLatex
      ref={latex}
      tex={'\\frac{\\pi}{2} \\LaTeX Hello\\ Phú'}
      scale={0.25}
      fontSize={300}
      fill={'white'}
      stroke={'white'}
      lineWidth={2}
    />,
  )

  yield* latex().appear()
  yield* waitFor(2)
  yield* latex().tex('\\Psi(x,t) = \\psi(x) e^{-i\\frac{E}{\\hbar}t}', 1)
  yield* waitFor(3)
})
