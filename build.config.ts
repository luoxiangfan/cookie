import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  declaration: true,
  clean: false,
  entries: [
    'src/index'
  ]
})
