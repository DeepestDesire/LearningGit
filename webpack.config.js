var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')

var HtmlWebpackPluginEntry = new HtmlWebpackPlugin({
  title: 'demo',
  template: path.join(__dirname, 'index.html'),
})

module.exports = {
  // mode: 'production',
  mode: 'development',
  entry: path.resolve(__dirname, 'src/app.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[contenthash:6].[name].bundle.js',
    // filename: '[name].bundle.js'
  },
  module: {
    rules: [{ test: /\.js?$/, loader: 'babel-loader' }],
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    open: true,
    historyApiFallback: true,
  },
  plugins: [HtmlWebpackPluginEntry],
}
