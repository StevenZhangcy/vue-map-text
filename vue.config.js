const path = require('path')
module.exports = {
  devServer: {
    open: true,
    proxy: {
      '/weather': { // 天气
        target: 'http://apis.juhe.cn/',
        secure: false, // false为http访问，true为https访问
        changeOrigin: true, // 在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
        pathRewrite: { // 路径重写，
          '^/weather': '' // 替换target中的请求地址，也就是说以后你在请求http://api.douban.com/v2/XXXXX这个地址的时候直接写成/api即可。
        }
      },
      '/joke': { // 笑话
        target: 'http://v.juhe.cn/joke/',
        secure: false, // false为http访问，true为https访问
        changeOrigin: true, // 在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
        pathRewrite: { // 路径重写，
          '^/joke': '' // 替换target中的请求地址，也就是说以后你在请求http://api.douban.com/v2/XXXXX这个地址的时候直接写成/api即可。
        }
      }

    }
  },

  /**这里之后，还有第一行的path是跟svg有关系的配置**/
  chainWebpack: config => {
    const svgRule = config.module.rule('svg')
    // 清除已有的所有 loader。
    // 如果你不这样做，接下来的 loader 会附加在该规则现有的 loader 之后。
    svgRule.uses.clear()
    svgRule
      .test(/\.svg$/)
      // 配置icons的目录  我这里默认放在了 /src/assets/icons 目录下  如要修改 记得更换你的目录
      .include.add(path.resolve(__dirname, './src/icons/svg'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
    const fileRule = config.module.rule('file')
    fileRule.uses.clear()
    fileRule
      .test(/\.svg$/)
      // 配置icons的目录  我这里默认放在了 /src/assets/icons 目录下  如要修改 记得更换你的目录
      .exclude.add(path.resolve(__dirname, './src/icons/svg'))
      .end()
      .use('file-loader')
      .loader('file-loader')
  }



}