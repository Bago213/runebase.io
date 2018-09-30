'use strict';
var webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");


var config = {
  context: __dirname + '/', // `__dirname` is root of project and `src` is source
  entry: {
    bottomScripts: './webpack/bottomScripts.js',
    topScripts: './webpack/topScripts.js',
    walletScripts: './webpack/walletScripts.js',
  },
  output: {
    path: __dirname + '/dist', // `dist` is the destination
    filename: "[name].js"
  },
  module: {
    rules: [
      {
        test:/\.css$/, 
        use: ExtractTextPlugin.extract({ 
          fallback:'style-loader',
          use:['css-loader'],
        })
      },
      { test: /modernizr/, loader: 'imports-loader?this=>window!exports-loader?window.Modernizr'},
      {
        test: /\.(sass|scss)$/, //Check for sass or scss file names
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ]
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({filename: "[name].css"})
  ]
};

module.exports = config;