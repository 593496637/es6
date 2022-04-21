module.exports = {
  plugins: [
    require('postcss-preset-env') // 使用postcss-preset-env插件，自动添加浏览器前缀，支持兼容性，可以代替autoprefixer插件，并且功能更强大
  ]
}