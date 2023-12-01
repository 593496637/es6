// 打包localstorage插件
import typescript from 'rollup-plugin-typescript2';

export default {
  input: 'src/index.ts',
  output: {
    file: 'dist/localstorage.js',
  },

  plugins: [typescript()],
};
