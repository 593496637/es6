const path = require('path');
const ConsoleLogPlugin = require('../plugins/ConsoleLogPlugin');

module.exports = {
  entry: path.resolve(__dirname, 'src/index.js'),
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.md$/,
        use: [path.resolve(__dirname, '../loaders/markdown-loader.js')],
      },
    ],
  },
  plugins: [new ConsoleLogPlugin()],
};
