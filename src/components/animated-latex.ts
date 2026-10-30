import { Curve, Latex, LatexProps, Node } from '@canvas-commons/2d'
import { all, delay } from '@canvas-commons/core'

/**
 * LaTeX rendered by MathJax and exposed as native canvas-commons nodes.
 *
 * The inherited Latex pipeline converts SVG paths to Path and other supported
 * SVG elements to their corresponding Shape subclasses, such as Rect.
 */
export class AnimatedLatex extends Latex {
  public constructor(props: LatexProps) {
    super(props)
  }

  private generatedNodes(): Node[] {
    const nodes: Node[] = []

    const visit = (node: Node) => {
      nodes.push(node)
      node.children().forEach(visit)
    }

    this.wrapper.children().forEach(visit)
    return nodes
  }

  /** Glyph outlines converted from SVG `<path>` elements. */
  public curves(): Curve[] {
    return this.generatedNodes().filter((node): node is Curve => node instanceof Curve)
  }

  public *appear() {
    const STROKE_DURATION = 0.25
    const FILL_DURATION = 0.75
    const SHAPE_DELAY = 0.05

    const paths = this.curves()
    paths.forEach((p) => {
      p.start(0)
      p.end(0)
      p.fill(null)
    })

    yield* all(
      ...paths.map((curve, index) => delay(index * SHAPE_DELAY, curve.end(1, STROKE_DURATION))),
    )
    yield* all(...paths.map((curve) => curve.fill('white', FILL_DURATION)))
  }
}
