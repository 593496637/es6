const { merge } = require('webpack-merge');
const CopyPlugin = require('copy-webpack-plugin');
const common = require('./webpack.common.config');
module.exports = merge(common, {
  mode: 'production',
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: './public',  //path.resolve(__dirname, './build'),
          // to: './',  //可忽略不写,默认输出到output写的path对应的目录里，也可以这样写： to: path.resolve(__dirname, './build'),
          globOptions: {
            dot: true,
            ignore: ['**/*.html']
          },
        },
        {
          from: './aaa',
        }
      ]
    }),
  ]
})