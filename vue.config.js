// TODO: 設定型ファイルのJSのLintどうするか再考
/* eslint-disable */
const path = require('path')

module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "~@/presentations/stylesheets/init.scss";`
      }
    }
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [path.resolve(__dirname, './src/presentations/stylesheets/init.scss')],
    },
  },
}
