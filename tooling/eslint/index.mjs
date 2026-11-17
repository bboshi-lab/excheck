import { componentComposition } from "./component-composition.mjs"
import { componentConventions } from "./component-conventions.mjs"
import { importLayout } from "./import-layout.mjs"
import { importPaths } from "./import-paths.mjs"
import { moduleBoundaries } from "./module-boundaries.mjs"
import { noTableOrBreak } from "./no-table-or-break.mjs"

export default {
  rules: {
    "component-composition": componentComposition,
    "component-conventions": componentConventions,
    "import-layout": importLayout,
    "import-paths": importPaths,
    "module-boundaries": moduleBoundaries,
    "no-table-or-break": noTableOrBreak,
  },
}
