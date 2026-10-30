import { makeProject } from '@canvas-commons/core'

import electricField from './scenes/electric-field?scene'
import latex from './scenes/latex?scene'

export default makeProject({
  scenes: [latex],
})
