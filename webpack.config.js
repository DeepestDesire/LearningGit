var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

// const marked = require('marked')
// const renderer = new marked.Renderer()

var HtmlWebpackPluginEntry = new HtmlWebpackPlugin({
  title: 'demo',
  template: path.join(__dirname, 'index.html'),
})

const isDevelopment = true

module.exports = {
  mode: 'production',
  // mode: 'development',
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
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader'],
      },

      {
        test: /\.module\.s(a|c)ss$/,
        loader: [
          isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true,
              sourceMap: isDevelopment,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: isDevelopment,
            },
          },
        ],
      },
      {
        test: /\.css$/,
        loader: ['style-loader', 'css-loader'],
      },
      {
        test: /\.s(a|c)ss$/,
        exclude: /\.module.(s(a|c)ss)$/,
        loader: [
          isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: isDevelopment,
            },
          },
        ],
      },
      // {
      //   test: /\.md$/,
      //   use: [
      //     {
      //       loader: 'html-loader',
      //     },
      //     {
      //       loader: 'markdown-loader',
      //       options: {
      //         pedantic: true,
      //         renderer,
      //       },
      //     },
      //   ],
      // },
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
  plugins: [
    HtmlWebpackPluginEntry,
    new MiniCssExtractPlugin({
      filename: isDevelopment ? '[name].css' : '[name].[hash].css',
      chunkFilename: isDevelopment ? '[id].css' : '[id].[hash].css',
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.scss'],
    alias: {
      '@src': path.resolve(__dirname, 'src'),
      '@images': path.resolve(__dirname, 'public/images'),
      components: path.resolve(__dirname, 'src/components'),
      network: path.resolve(__dirname, 'src/network'),
    },
  },
  watchOptions: {
    ignored: /node_modules/,
  },
}
