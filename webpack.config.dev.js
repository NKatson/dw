const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: [
    'webpack-hot-middleware/client',
    './src/index',
  ],
  output: {
    path: path.join(__dirname, 'dist'),
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
          include: path.join(__dirname, 'src'),
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
      ]
  }
};
