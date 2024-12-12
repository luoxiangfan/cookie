import { openSync, closeSync, mkdirSync, existsSync } from 'node:fs'

if (!existsSync('dist')) {
  mkdirSync('dist')
}
closeSync(openSync('dist/index.js', 'w'))