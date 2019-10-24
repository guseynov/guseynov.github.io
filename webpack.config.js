const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
require('babel-register');

module.exports = {
  entry: './src/index.js',
  mode: 'none',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.pug',
      hash: true,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.styl$/,
        use: ['style-loader', 'css-loader', 'stylus-loader'],
      },
      {
        test: /\.pug$/,
        use: ['pug-loader'],
      },
      {
        test: /\.(png|svg|jpg|gif|ico)$/,
        use: ['file-loader'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
    ],
  },
  watch: true,
  devtool: 'source-map',
};
