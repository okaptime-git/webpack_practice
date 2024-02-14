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
      {
        // test: /\.png|\.jpg)/,
        test: /\.(png|jpg)/,
        type: 'asset/resource',
        generator: {
          filename: 'img/[name][ext]',
        },
        use: [
          // ↓↓↓webpack5をインストールしていれば、別の書き方ができる↑↑↑（type、generatorを記述）
          // file-loader、url-loaderをアンインストールした
          //
          // {
          //   // ここまでの設定だと、dataとしてめっちゃ長い文字列でindex.htmlに画像が出てしまう
          //   // loader: 'url-loader',
          //   loader: 'file-loader',
          //   options: {
          //     esModule: false,
          //     // extentionの略
          //     name: 'img/[name].[ext]',
          //   },
          // },
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
