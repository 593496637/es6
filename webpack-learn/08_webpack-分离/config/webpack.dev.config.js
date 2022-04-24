const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.config');
module.exports = merge(common, {
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    hot: true,
    host: '0.0.0.0',  //允许外部浏览器打开本地服务程序
    // port:8888,
    open: {
      target: ['http://localhost:8080'],
    },
    // 当打包的资源里没有的静态资源的情况下，可以使用这个配置项，从本地的指定目录中去找相应的文件
    // 替代了contentBase
    static: [
      path.join(__dirname, '../public'),
      path.join(__dirname, '../aaa')
    ],
    // 客户端
    client: {
      // 浏览器以进度条的方式查看编译进度
      progress: true,
    },
    // gzip压缩
    compress: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        pathRewrite: { '^/api': '' },
        // 默认情况下，将不接受在 HTTPS 上运行且证书无效的后端服务器
        secure: false,
        // 默认情况下，代理时会保留主机头的来源，可以将 changeOrigin 设置为 true 以覆盖此行为
        changeOrigin: true
      }
    },
  },
})