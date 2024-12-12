import { readFileSync } from 'node:fs'
import terser from '@rollup/plugin-terser'
import typescript from '@rollup/plugin-typescript'

const loadJSON = (path) =>
  JSON.parse(readFileSync(new URL(path, import.meta.url)))

const pkg = loadJSON('./package.json')

export default [
  {
    input: 'src/index.ts',
    output: [
      // config for <script type="module">
      {
        file: pkg.module,
        format: 'esm'
      },
      // config for <script nomodule>
      {
        file: pkg.browser,
        format: 'umd',
        name: 'Cookies',
        noConflict: true,
        banner: ';'
      }
    ],
    plugins: [
      typescript()
    ]
  },
  {
    input: 'src/index.ts',
    output: [
      // config for <script type="module">
      {
        file: pkg.module.replace('.mjs', '.min.mjs'),
        format: 'esm'
      },
      // config for <script nomodule>
      {
        file: pkg.browser.replace('.js', '.min.js'),
        format: 'umd',
        name: 'Cookies',
        noConflict: true
      }
    ],
    plugins: [
      terser(),
      typescript()
    ]
  }
]