const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { DefinePlugin } = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
module.exports = {
  // 开发阶段：development
  // 上线阶段：production
  mode: 'development',
  devtool: 'source-map',
  entry: "./src/index.js",
  output: {
    filename: 'js/bundle.js',
    path: path.resolve(__dirname, "./build"),
    clean: true
    // 第一种讲图片资源打包的方式
    // assetModuleFilename: 'images/[name]_[hash:6][ext][query]'
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
            maxSize: 100 * 1024
          }
        },
        // 第二种讲图片资源打包的方式
        generator: {
          filename: 'static/[name]_[hash:6][ext][query]'
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name]_[hash:6][ext][query]'
        },
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      title: '啊哈哈哈'
    }),
    new DefinePlugin({
      BASE_URL: JSON.stringify('./')
    }),
    new CopyPlugin({
      patterns: [
        {
          from: 'public',  //path.resolve(__dirname, './build'),
          // to: './',  //可忽略不写，也可以这样写： to: path.resolve(__dirname, './build'),
          globOptions: {
            dot: true,
            gitignore: true,
            ignore: ['**/*.html']
          }
        }
      ]
    })
  ]
}