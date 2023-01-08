const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // devServer: {
  //   // port: port,
  //   open: true,
  //   // overlay: {
  //   //   warnings: false,
  //   //   errors: true
  //   // },
  //   proxy: {
  //     '/': {
  //       target: `http://123.207.32.32:9002`,
  //       changeOrigin: true,
  //       pathRewrite: {
  //         '^/': '/'
  //       }
  //     }
  //   }
  //   // before: require('./mock/mock-server.js')
  // },
})
