var path = require('path')
var webpack = require('webpack')


module.exports = {
  devtool:'eval-source-map',
  entry: './src/index.js',
  output: { path: __dirname, filename: 'dist/bundle.js' },
  plugins:[
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.DefinePlugin({
      __DEV__: false,
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })
  ],
  module: {
    loaders: [
        {
            test: /\.js$/,
            loader: 'babel',
            query: {
                presets: ['es2015','stage-0']
            }
        }
    ]
  }
};