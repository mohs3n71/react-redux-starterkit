const optimize = require('webpack').optimize
const DefinePlugin = require('webpack').DefinePlugin
const ContextReplacementPlugin = require('webpack').ContextReplacementPlugin
const HtmlWebpackPlugin = require('html-webpack-plugin')
const LessPluginCleanCSS = require('less-plugin-clean-css')
const path = require('path')

const package = require('../package.json')
const __PROD__ = process.env.NODE_ENV === 'production'

const webpackPlugins = [
  new DefinePlugin({
    process: {
      env: {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        PMAC_VERSION: JSON.stringify(package.version),
        PMAC_THEME: JSON.stringify(package.theme)
      }
    }
  }),
  new HtmlWebpackPlugin({
    title: 'React Redux Starter Kit',
    template: path.resolve(__dirname, './template.ejs')
  })
]

if (__PROD__) {
  webpackPlugins.push(...[
    new ContextReplacementPlugin(/moment[/\\]locale$/, /en-us|en-gb/),
    new optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module) {
        return module.context && module.context.includes('node_modules')
      }
    }),
    new optimize.CommonsChunkPlugin({
      name: 'manifest'
    }),
    new optimize.ModuleConcatenationPlugin(),
    new optimize.UglifyJsPlugin()
  ])
}

const lessPlugins = [
  new LessPluginCleanCSS({
    advanced: true
  })
]

module.exports = {
  context: path.resolve(__dirname, '../src'),
  entry: ['babel-polyfill', './app.js'],
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
    filename: '[chunkhash].js',
    sourceMapFilename: '[chunkhash].map'
  },
  devtool: !__PROD__ ? 'cheap-module-source-map' : 'hidden-source-map',
  module: {
    loaders: [
      {
        loader: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'less-loader',
            options: {
              modifyVars: package.theme,
              paths: [
                path.resolve(__dirname, '../node_modules')
              ],
              plugins: lessPlugins
            }
          }
        ]
      }
    ]
  },
  plugins: webpackPlugins,
  performance: {
    maxAssetSize: 2621440
  }
}
