const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'main.js',
  },
  module: {
    rules: [
      {
        test: /\.css/,
        use: [
          {
            loader: 'style-loader', // style-loaderを適用してね（下から上に適用される）<style></style>として、jsを通して出力される
          },
          {
            loader: 'css-loader', // cssで見つけたら、
          },
        ],
      },
    ],
  },
};
