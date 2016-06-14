'use strict';

var webpack      = require('webpack'),
    path         = require('path'),
    precss       = require('precss'),
    autoprefixer = require('autoprefixer');

module.exports = {
  entry: ['babel-polyfill', path.join(__dirname, 'js/index.js')],
  output: {
    filename: 'bundle.js'
  },
  resolve: {
    alias: {
      'font-awesome': path.join(__dirname, 'node_modules/font-awesome/css/font-awesome.css')
    }
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
      output:   { comments: false }
    }),
    new webpack.DefinePlugin({
      process: {
        env: {
          NODE_ENV: JSON.stringify(process.env.NODE_ENV)
        }
      }
    })
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015']
        }
      },
      { test: /\.css$/,  loader: 'style!css?modules' },
      { test: /\.scss$/, loader: 'style!css!postcss!sass' }
    ]
  },
  postcss: function () {
    return [precss, autoprefixer];
  }
};
