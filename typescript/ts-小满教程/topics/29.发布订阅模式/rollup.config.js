import typescript from 'rollup-plugin-typescript2'
import serve from 'rollup-plugin-serve'
import path from 'path'
import { fileURLToPath } from 'url'
const metaUrl = fileURLToPath(import.meta.url)
const dirName = path.dirname(metaUrl)

export default {
  input: 'src/index.ts',
  output: {
    file: path.resolve(dirName, './dist/index.js'),
    sourcemap: true,
  },

  plugins: [
    typescript(),
    serve({
      open: true,
      openPage: '/public/index.html',
      port: 3000,
      contentBase: ''
    })
  ],
}