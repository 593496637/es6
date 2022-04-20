const path = require('path');

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "./build"),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      // sass 与 css分开写法
      // {
      //   test: /\.css$/,
      //   //1.语法糖写法
      //   // loader: 'css-loader', 
      //   // 2.完整写法
      //   use: [
      //     "style-loader",
      //     "css-loader",
      //     "postcss-loader"
      //     // {
      //     //   loader: 'postcss-loader',
      //     //   options: {
      //     //     postcssOptions: {
      //     //       plugins:[
      //     //         require('autoprefixer')
      //     //       ]
      //     //     }
      //     //   }
      //     // }
      //   ]
      // },
      // {
      //   test: /\.s[ac]ss$/,
      //   use: [

      //     'style-loader',
      //     'css-loader',
      //     'sass-loader'
      //   ]
      // }

      // sass 与 css合并写法
      {
        test: /\.(css|s[ac]ss)$/,
        //1.语法糖写法
        // loader: 'css-loader', 
        // 2.完整写法
        use: [
          "style-loader",
          "css-loader",
          "sass-loader",
          "postcss-loader" // 自动添加浏览器前缀，支持兼容性，单独添加

          // 此处可使用上方直接写postcss-loader的方式,也可以使用下方的方式。直接写的方式，不需要写options，只需要写postcss-loader，需要添加postcss.config.js文件
          // {
          //   loader: 'postcss-loader',
          //   options: {
          //     postcssOptions: {
          //       plugins:[
          //         require('autoprefixer') // 使用autoprefixer插件，添加浏览器前缀
          //       ]
          //     }
          //   }
          // }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 4 * 1024
          }
        }
      }
    ]
  },
}