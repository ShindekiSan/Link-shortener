const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',
  output: {
    filename: '[contenthash].bundle.js',
    chunkFilename: '[chunkhash].bundle.js',
  },
  plugins: [
    new CleanWebpackPlugin(),
  ],
});
