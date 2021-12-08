const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
	entry: './src/server.ts',
	target: 'node',
	output: {
		path: path.join(__dirname, '..', 'dist')
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: ['ts-loader'],
				exclude: /node_modules/
			}
		]
	},
	resolve: {
		extensions: ['', '.ts', '.js']
	},
	externals: [
		nodeExternals()
	]
}