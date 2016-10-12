const webpack = require('webpack');

module.exports = {
     entry: './assets/js/src/app.js',
     output: {
         path: 'assets/js/dist/',
         filename: 'app.bundle.js'
     },
     module: {
         loaders: [{
             test: /\.js$/,
             exclude: /node_modules/,
             loader: 'babel-loader'
         }]
     }
 };