const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  mode: 'development', // Change to 'production' for production builds
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'build'), // Change 'dist' to 'build'
    filename: 'bundle.js',
    publicPath: '/ReelTime/', // Replace 'ReelTime' with your actual repository name
  },
  devServer: {
    static: './dist',
    hot: true,
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
    ],
  },
  plugins: [
    new Dotenv(), // Add this line
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
};
