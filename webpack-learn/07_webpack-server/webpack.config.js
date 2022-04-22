const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { DefinePlugin } = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader')
module.exports = {
  // 构建目标
  target:'web',
  // 开发阶段：development
  // 上线阶段：production
  mode: 'development',
  devtool: 'source-map',
  entry: "./src/main.js",
  output: {
    filename: 'js/bundle.js',
    path: path.resolve(__dirname, "./build"),
    clean: true
    // 第一种讲图片资源打包的方式
    // assetModuleFilename: 'images/[name]_[hash:6][ext][query]'
  },
  devServer: {
    hot: true,
    // 当打包的资源里没有的静态资源的情况下，可以使用这个配置项，从本地的指定目录中去找相应的文件
    static: [
      path.join(__dirname, './public'),
      path.join(__dirname, './aaa')
    ],
  },
  module: {
    rules: [
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
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      title: '啊哈哈哈'
    }),
    new DefinePlugin({
      BASE_URL: JSON.stringify('./'),
      // 解释:不写下面两行，浏览器将提示警告
      // https://github.com/vuejs/core/tree/main/packages/vue#bundler-build-feature-flags
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: false
    }),
    new CopyPlugin({
      patterns: [
        {
          from: 'public',  //path.resolve(__dirname, './build'),
          // to: './',  //可忽略不写,默认输出到output写的path对应的目录里，也可以这样写： to: path.resolve(__dirname, './build'),
          globOptions: {
            dot: true,
            gitignore: true,
            ignore: ['**/*.html']
          }
        },
        {
          from: 'aaa'
        }
      ]
    }),
    new VueLoaderPlugin()
  ]
}