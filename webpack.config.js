const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    main: path.resolve(__dirname, './src/index.js'),
  },

  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].bundle.js',
  },

  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'My App',
      template: path.resolve(__dirname, './src/index.html'),
      filename: 'index.html',
      inject: 'body',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
      chunkFilename: '[name].[id].[contenthash].css',
    }),
  ],

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: '/node_modules/',
        use: ['babel-loader'],
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg|webp|svg)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: 'asset/inline',
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
    ],
  },
  mode: 'development',
  devServer: {
    historyApiFallback: true,
    static: {
      directory: path.join(__dirname, 'dir'),
    },
    compress: true,
    port: 9000,
    open: true,
    hot: false,
  },
};
