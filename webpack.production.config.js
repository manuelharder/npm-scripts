const webpack = require('webpack');

module.exports = {
     entry: './assets/js/src/app.js',
     output: {
         path: 'assets/js/dist/',
         filename: 'scripts.min.js'
     },
     module: {
         loaders: [{
             test: /\.js$/,
             exclude: /node_modules/,
             loader: 'babel-loader'
         }]
     },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
            },
            output: {
                comments: false,
            },
        }),
    ]
 };