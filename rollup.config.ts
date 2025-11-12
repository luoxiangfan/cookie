import terser from '@rollup/plugin-terser'
import typescript from '@rollup/plugin-typescript'

const emsPath = './dist/index.mjs'
const browserPath = './dist/index.js'

export default [
  {
    input: 'src/index.ts',
    output: [
      // config for <script type="module">
      {
        file: emsPath,
        format: 'esm'
      },
      // config for <script nomodule>
      {
        file: browserPath,
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
        file: emsPath.replace('.mjs', '.min.mjs'),
        format: 'esm'
      },
      // config for <script nomodule>
      {
        file: browserPath.replace('.js', '.min.js'),
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