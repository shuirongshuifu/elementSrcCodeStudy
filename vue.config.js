const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}

const CompressionPlugin = require('compression-webpack-plugin');//引入gzip压缩插件

// 引入自己写的插件
const myPlugin = require('./src/myplugin/myPlugin')

module.exports = {
  lintOnSave: false, //是否开启eslint
  productionSourceMap: false, // 关闭源码映射
  chainWebpack: config => {
    config.resolve.alias.set('@', resolve('src')) //配置别名

    config.module.rule("images").test(/\.(jpg|jpeg|png|gif|ico)$/) // 给这些图片类型做压缩
      .use("url-loader") // url-loader要搭配file-loader做图片压缩
      .loader("url-loader")
      .options({
        limit: 1024 * 12,// 小于12kb的图片压缩成base64，图片太大转成base64反而不太合适
        name: "static/img/[name].[ext]"//指定打包后的图片存放的位置，一般放在static下img文件夹里 name.ext分别为：文件名.文件后缀（按照原图片名）
      })
      .end() // 返回上一级 以便于继续添加loader
      .use('image-webpack-loader')
      .loader("image-webpack-loader")
      .options({
        disable: process.env.NODE_ENV == 'development' ? true : false, // 开发环境禁用压缩，生产环境才做压缩，提升开发调试速度
        mozjpeg: { quality: 60 }, // 压缩JPEG图像，压缩质量quality为60，范围0到100
        optipng: { enabled: true }, // 压缩PNG图像，enabled为true开启压缩
        pngquant: { quality: [0.65, 0.90], speed: 4 }, // 质量区间和速度就使用默认值吧
        gifsicle: { interlaced: false }, // Interlace gif for progressive rendering 默认false
        webp: { quality: 60 } // 压缩webp图片，压缩质量quality为60，范围0到100
      })
      .end() // 返回上一级 继续添加loader
      .enforce('post') // 表示先执行配置在下面那个loader，即image-webpack-loader
  },
  configureWebpack: config => {
    // 开发环境不配置
    if (process.env.NODE_ENV !== 'production') return
    // 生产环境才去配置
    return {
      plugins: [
        new CompressionPlugin({ //此插件不能使用太高的版本，否则报错：TypeError: Cannot read property 'tapPromise' of undefined
          // filename: "[path][base].gz", // 这种方式是默认的，多个文件压缩就有多个.gz文件，建议使用下方的写法
          filename: '[path].gz[query]', //  使得多个.gz文件合并成一个文件，这种方式压缩后的文件少，建议使用
          algorithm: 'gzip', // 官方默认压缩算法也是gzip
          test: /\.js$|\.css$|\.html$|\.ttf$|\.eot$|\.woff$/, // 使用正则给匹配到的文件做压缩，这里是给html、css、js以及字体（.ttf和.woff和.eot）做压缩
          threshold: 10240, //以字节为单位压缩超过此大小的文件，使用默认值10240吧
          minRatio: 0.8, // 最小压缩比率，官方默认0.8
          //是否删除原有静态资源文件，即只保留压缩后的.gz文件，建议这个置为false，还保留源文件。以防：
          // 假如出现访问.gz文件访问不到的时候，还可以访问源文件双重保障
          deleteOriginalAssets: false
        }),
        new myPlugin('i-am-params')
      ],
      // 把chunk-vendors.js进行分包，提升资源加载速度，很有必要
      optimization: {
        /**
         * runtimeChunk可选值有：true或'multiple'或'single'
         * true或'multiple'会有每个入口对应的chunk。不过一般情况下
         * 考虑到模块初始化，设置为single就够多数情况下使用啦。
         * 详情见官网：https://webpack.docschina.org/configuration/optimization/#optimizationruntimechunk
         * */
        runtimeChunk: 'single',
        /**
         * 以前是CommonsChunkPlugin，现在换成optimization.splitChunks。普通项目下方的配置就足够用啦
         * 详情见官网：https://webpack.docschina.org/configuration/optimization/#optimizationsplitchunks
         * */
        splitChunks: {
          chunks: 'all', // 可选值：all，async 和 initial。all功能最强大，所以咱们就使用all
          maxInitialRequests: Infinity, // 最大并行请求数，为了以防万一，设置无穷大即可
          minSize: 20000, // 引入的模块大于20kb才做代码分割，官方默认20000，这里不用修改了
          maxSize: 60000, // 若引入的模块大于60kb，则告诉webpack尝试再进行拆分
          cacheGroups: {
            vendors: {
              test: /[\\/]node_modules[\\/]/, // 使用正则匹配node_modules中引入的模块
              priority: -10, // 优先级值越大优先级越高，默认-10，不用修改
              name(module) { // 设定分包以后的文件模块名字，按照包名字替换拼接一下
                const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]
                return `npm.${packageName.replace('@', '')}`
              },
            },
          },
        }
      },
      /**
       * 添加自己写的模块loader
       * */
      module: {
        rules: [
          /**
           * 对.vue和.js文件生效，不包含node_modules大文件夹，加载器的位置在
           * 当前目录下的./src/myLoader/removeConsole.js
           * */
          // {
          //   test: /\.vue$/,
          //   exclude: /node_modules/,
          //   loader: path.resolve(__dirname, "./src/myLoader/removeConsole.js")
          // },
          // {
          //   test: /\.js$/,
          //   exclude: /node_modules/,
          //   loader: path.resolve(__dirname, "./src/myLoader/removeConsole.js")
          // }
        ],
      }
    }
  },
  devServer: {
    open: false,
    host: "0.0.0.0",
    port: 8080,
    https: false,
    hotOnly: false,
  }
}
