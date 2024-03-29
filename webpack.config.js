const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
//clean-webpack-pluginの中にたくさんあるけど、これだけ{}で囲むと、CleanWebpackPluginだけ使うという意味になる
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// vueのプラグイン読み込み↓
const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
  mode: 'development',
  // ↓記述したまんまの js をブラウザで確認できるようになる
  devtool: 'source-map',
  entry: './src/js/main.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: './js/main.js',
  },
  // output
  module: {
    rules: [
      {
        test: /\.vue$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'vue-loader',
          },
        ],
      },
      {
        test: /\.js/,
        exclude: /node-modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              // reactでは、↓だけだと足りない
              presets: [['@babel/preset-env', { targets: '> 0.25%, not dead' }], '@babel/preset-react'],
            },
          },
        ],
      },
      {
        test: /\.(css|sass|scss)/,
        use: [
          {
            // loader: 'style-loader', // style-loaderを適用してね（下から上に適用される）<style></style>として、jsを通して出力されるが、別のものを使用する！
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader', // cssを見つけたら読み込んで、、、
            // ↓scssをブラウザで確認できるようになる
            options: {
              // sourceMap: true,
              sourceMap: false,
            },
          },
          {
            loader: 'sass-loader', // scss使用できるようにする
          },
        ],
      },
      {
        // test: /\.png|\.jpg)/,
        test: /\.(png|jpg|jpeg|svg)/,
        type: 'asset/resource',
        generator: {
          filename: 'img/[name][ext]',
        },
        use: [
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65,
              },
              webp: {
                quality: 75,
              },
            },
          },
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
      {
        test: /\.pug/,
        use: [
          {
            loader: 'html-loader',
          },
          {
            loader: 'pug-html-loader',
            options: {
              pretty: true,
            },
          },
        ],
      },
    ],
  },
  // module
  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: './css/style.css',
    }),
    new HtmlWebpackPlugin({
      // template: './src/templates/index.html',
      template: './src/templates/index.pug',
      filename: 'index.html',
    }),
    new HtmlWebpackPlugin({
      template: './src/templates/access.pug',
      filename: 'access.html',
    }),
    new HtmlWebpackPlugin({
      template: './src/templates/members/taro.pug',
      filename: 'members/taro.html',
    }),
    new CleanWebpackPlugin(),
  ],
  // webpack-dev-serverで追加したもの↓
  devServer: {
    static: {
      directory: path.join(__dirname, 'src'),
    },
    compress: true,
    port: 9000,
  },
};
