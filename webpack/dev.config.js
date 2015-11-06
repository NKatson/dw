const path = require('path');
const webpack = require('webpack');

var assetsPath = path.resolve(__dirname, '../static/dist');
var host = (process.env.HOST || 'localhost');
var port = parseInt(process.env.PORT) + 1 || 3001;

module.exports = {
  devtool: 'inline-source-map',
  entry: {
    'main': [
        'webpack-hot-middleware/client',
        './src/client.js'
    ]
  },
  output: {
    path: assetsPath,
    filename: 'bundle.js',
    publicPath: '/dist',
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
  ],
  module: {
    loaders : [
        {
          test: /\.js$/,
          loader: 'babel',
          include: path.join(__dirname, '../src'),
          query: {
            stage: 2,
            optional: ['es7.classProperties'],
            loose: 'all',
            plugins: ['react-transform'],
            extra: {
              'react-transform': {
                'transforms': [
                  {
                    'transform': 'react-transform-hmr',
                    'imports': ['react'],
                    'locals': ['module']
                  }, {
                    'transform': 'react-transform-catch-errors',
                    'imports': ['react', 'redbox-react']
                  }
                ]
              }
            }
          }
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
          include: path.join(__dirname, '../static/images')
        },
        {
          test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: 'url?limit=10000&mimetype=application/font-woff',
          include: path.join(__dirname, '../static/fonts')
        },
        {
          test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: 'file',
          include: path.join(__dirname, '../static/fonts')
        },
      ]
  }
};
