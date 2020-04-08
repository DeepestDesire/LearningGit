var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')

const marked = require('marked')
const renderer = new marked.Renderer()

var HtmlWebpackPluginEntry = new HtmlWebpackPlugin({
  title: 'demo',
  template: path.join(__dirname, 'index.html'),
})

module.exports = {
  mode: 'production',
  entry: path.resolve(__dirname, 'src/app.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[contenthash:6].[name].bundle.js',
    // filename: '[name].bundle.js'
  },
  module: {
    rules: [
      { test: /\.js?$/, loader: 'babel-loader' },
      { test: /\.jsx?$/, loader: 'babel-loader' },
      {
        test: /\.md$/,
        use: [
          {
            loader: 'html-loader',
          },
          {
            loader: 'markdown-loader',
            options: {
              pedantic: true,
              renderer,
            },
          },
        ],
      },
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    open: true,
    historyApiFallback: true,
    clientLogLevel: 'debug',
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
  plugins: [HtmlWebpackPluginEntry],
  resolve: {
    alias: {
      '@src': path.resolve(__dirname, 'src'),
      network: path.resolve(__dirname, 'src/network'),
    },
  },
}
