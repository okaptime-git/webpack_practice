const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
//clean-webpack-pluginの中にたくさんあるけど、これだけ{}で囲むと、CleanWebpackPluginだけ使うという意味になる
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: './src/js/main.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: './js/main.js',
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
    new MiniCssExtractPlugin({
      filename: './css/style.css',
    }),
    new HtmlWebpackPlugin({
      template: './src/templates/index.html',
    }),
    new CleanWebpackPlugin(),
  ],
};
