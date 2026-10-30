import { Node } from '@canvas-commons/2d'
import { all } from '@canvas-commons/core'

export function* appear(node: Node) {
  yield* all(node.opacity(0, 0).to(1, 1), node.scale(0, 0).to(1, 1))
}

export function* disappear(node: Node) {
  yield* all(node.opacity(1, 0).to(0, 1), node.scale(1, 0).to(0, 1))
}
