const path = require('path')

const config = {
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [
        path.resolve(__dirname, './src/presentations/stylesheets/init.scss'),
      ],
    },
  },
  configureWebpack: {
    plugins: [],
  },
}

const SENTRY_AUTH_TOKEN = process.env.SENTRY_AUTH_TOKEN
if (SENTRY_AUTH_TOKEN !== undefined) {
  const SentryWebpackPlugin = require('@sentry/webpack-plugin')
  const version = require('./public/manifest.json').version

  config.configureWebpack.plugins.push(
    new SentryWebpackPlugin({
      // sentry-cli configuration
      authToken: process.env.SENTRY_AUTH_TOKEN,
      org: 'ryou',
      project: 'vrchat-friend-instance-list',
      release: version,

      // webpack specific configuration
      include: './dist',
      ignore: ['node_modules', 'webpack.config.js'],
    })
  )
}

module.exports = config
