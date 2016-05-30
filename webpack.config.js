'use strict';

var webpack      = require('webpack'),
    path         = require('path'),
    precss       = require('precss'),
    autoprefixer = require('autoprefixer');

module.exports = {
  entry: ['babel-polyfill', path.join(__dirname, 'js/main.js')],
  output: {
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
      output:   { comments: false }
    }),
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        loader: 'style!css!postcss!sass'
      }
    ]
  },
  postcss: function () {
    return [precss, autoprefixer];
  }
};
