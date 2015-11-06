const webpack = require('webpack');
var path = require('path');

var assetsPath = path.resolve(__dirname, '../static/');
var host = (process.env.HOST || 'localhost');
var port = parseInt(process.env.PORT) + 1 || 3001;

module.exports = {
  devtool: 'inline-source-map',
  entry: {
    'main': [
        'webpack-hot-middleware/client?path=http://' + host + ':' + port + '/__webpack_hmr',
        './src/client.js'
    ]
  },
  output: {
    path: assetsPath,
    filename: 'bundle.js',
    publicPath: 'http://' + host + ':' + port + '/dist/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      __CLIENT__: true,
      __SERVER__: false,
      __DEVELOPMENT__: true,
     __DEVTOOLS__: JSON.stringify(JSON.parse(process.env.DEV_TOOLS || 'false')),
   }),
  ],
  progress: true,
  resolve: {
    modulesDirectories: [
      'src',
      'node_modules'
    ],
    extensions: ['', '.json', '.js']
  },
  module: {
    loaders : [
        {
          test: /\.js$/,
          loader: 'babel',
          include: path.join(__dirname, '../src'),
          query: {
            stage: 0,
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
        { test: /\.css$/, loaders: ['style', 'css'] },
        { test: /\.png$/, loader: 'url-loader?&mimetype=image/png' },
        { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&minetype=application/font-woff" },
        { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" },
      ]
  }
};
