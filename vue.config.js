const webpack = require('webpack');

module.exports = {
  devServer: {
    open: false,
    // port: 5001, // 自定义修改8080端口
    // 代理跨域
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:5000/',
        changeOrigin: true
      }
      // ,
      // '/proxy2/adm/': {
      //   target: 'http://192.168.0.xx:xxxx/',
      //   changeOrigin: true
      // },
      // '/httpsProxy3/config/': {
      //   target: 'https://xx.xx.com',
      //   secure: false, // https协议才设置
      //   changeOrigin: true
      // }
    }
  },
  
  lintOnSave: false,
  configureWebpack: {
    // Set up all the aliases we use in our app.
    resolve: {
      alias: {
        'chart.js': 'chart.js/dist/Chart.js'
      }
    },
    plugins: [
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 6
      })
    ]
  },
  pwa: {
    name: 'Vue Black Dashboard',
    themeColor: '#344675',
    msTileColor: '#344675',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: '#344675'
  },
  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: false
    }
  },
  css: {
    // Enable CSS source maps.
    sourceMap: process.env.NODE_ENV !== 'production'
  }
};
