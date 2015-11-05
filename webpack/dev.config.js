var path = require('path');
var webpack = require('webpack');
var WebpackIsomorphicTools = require('webpack-isomorphic-tools');

var host = 'localhost';
var port = 3001;
//
// var WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
// var webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('./webpack-isomorphic-tools'));

module.exports = {
  devtool: 'inline-source-map',
  entry: [
    'webpack-hot-middleware/client?path=http://' + host + ':' + port + '/__webpack_hmr',
    './src/client.js',
  ],
  node: {
    __dirname: true,
    net: "empty",
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/dist',
  },
  module: {
    loaders :
      [
        {
          test: /\.js$/,
          loaders: ['babel'],
          include: path.join(__dirname, 'src')
        },
        {
          test: /\.css$/,
          loaders: [
            'style', 'css'
          ]
        },
        {
          test: /\.png$/,
          loader: 'url?.[ext]&mimetype=image/png',
          include: path.join(__dirname, 'src/public/images')
        },
        {
          test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: 'url?limit=10000&mimetype=application/font-woff',
          include: path.join(__dirname, 'src/public/fonts')
        },
        {
          test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: 'file',
          include: path.join(__dirname, 'src/public/fonts')
        },
      //  { test: webpackIsomorphicToolsPlugin.regular_expression('images'), loader: 'url-loader?limit=10240' }
      ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      __CLIENT__: true,
      __SERVER__: false,
      __DEVELOPMENT__: true,
     __DEVTOOLS__: JSON.stringify(JSON.parse(process.env.DEV_TOOLS || 'false'))
   }),
//   webpackIsomorphicToolsPlugin.development()
  ],
};
