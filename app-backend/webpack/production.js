const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { merge } = require("webpack-merge");
const common = require("./webpack.common");

module.exports = merge(common, {
	mode: "production",
	output: {
		filename: "[hash].bundle.js",
	},
	plugins: [
		new BundleAnalyzerPlugin(),
		new CleanWebpackPlugin(),
	],
});
