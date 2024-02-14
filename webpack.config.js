const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'main.js',
  },
  // output
  module: {
    rules: [
      {
        test: /\.css/,
        use: [
          {
            // loader: 'style-loader', // style-loaderを適用してね（下から上に適用される）<style></style>として、jsを通して出力されるが、別のものを使用する！
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader', // cssを見つけたら読み込んで、、、
          },
        ],
      },
    ],
  },
  // module
  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
};
