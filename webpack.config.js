const webpack = require('webpack');
const path = require('path');
const WebpackNotifierPlugin = require('webpack-notifier');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production' ? true : false;

var plugins = [
    new ExtractTextPlugin('[name].css'),
    new WebpackNotifierPlugin({
        title: 'DrafTouch',
        contentImage: path.join(__dirname, '/img/brush.png'),
        alwaysNotify: true,
        excludeWarnings: true
    })
];

if (isProduction) {
    plugins.push(new UglifyJSPlugin())
}

module.exports = {
  entry: {
    app: [
      './assets/js/app.js', 
      './assets/sass/app.scss'
    ]
  },
  output: {
    path: path.resolve(__dirname, './build'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/,
        use: ExtractTextPlugin.extract({
          use: ["css-loader", 'sass-loader']
        })
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
    ]
  },
  plugins,
  watch: true
};