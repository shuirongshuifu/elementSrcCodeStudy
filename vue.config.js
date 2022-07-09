const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  lintOnSave: false, //是否开启eslint
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src')) //配置别名
  },
  devServer: {
    open: false,
    host: "0.0.0.0",
    port: 8080,
    https: false,
    hotOnly: false,
  }
}
