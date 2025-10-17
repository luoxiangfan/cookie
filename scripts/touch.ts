import { openSync, closeSync, mkdirSync } from 'node:fs'

mkdirSync('dist')
closeSync(openSync('dist/index.js', 'w'))