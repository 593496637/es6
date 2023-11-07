import path from 'node:path';
import ts from 'rollup-plugin-typescript2';
import commonJS from '@rollup/plugin-commonjs';
export default {
  input: 'src/index.ts',
  output: {
    file: path.resolve(__dirname, './lib/index.js'),
    format: 'umd',
  },
  plugins: [
    ts(),
    commonJS({
      sourceMap: false,
      ignore: cjsIgnores,
    }),
  ],
};
