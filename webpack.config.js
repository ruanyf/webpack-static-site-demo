var fs = require('fs');
var webpack = require('webpack')
var StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin');
var template = require('./template');

var paths = [
  '/',
  '/repos',
  '/about'
];

module.exports = {
  entry: {
    'main': './index.js',
  },

  output: {
    path: 'dist',
    filename: 'index.js',
    libraryTarget: 'umd'
  },

  plugins: process.env.NODE_ENV === 'production' ? [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin()
  ] : [
    new StaticSiteGeneratorPlugin('main', paths, { template: template, assets: 'index.js' })
  ],

  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader?presets[]=es2015&presets[]=react' }
    ]
  }
}
