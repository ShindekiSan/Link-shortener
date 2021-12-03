const { merge } = require("webpack-merge");
const common = require("./webpack.common");

module.exports = merge(common, {
    mode: "development",
    output: {
        filename: "[name].[contenthash:8].bundle.js",
        chunkFilename: "[name].[chunkhash:8].bundle.js",
    },
    devServer: {
        historyApiFallback: true,
    },
});
