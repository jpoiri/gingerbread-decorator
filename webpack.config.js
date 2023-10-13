const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
	entry: './src/index.js',
	mode: 'development',
	devtool: 'inline-source-map',
	plugins: [
		new HtmlWebpackPlugin({
			title: 'Escape game',
		}),
		new CopyPlugin({
			patterns: [
				{
					from: path.resolve(__dirname, 'assets'),
					to: path.resolve(__dirname, 'dist/assets')
				}
			]
		})
	],
	devServer: {
		static: './dist.js'
	},
	optimization: {
		splitChunks: {
			cacheGroups: {
				commons: {
					test: /[\\/]node_modules[\\/]/,
					name: 'vendor',
					chunks: 'all'
				}
			}
		}
	},
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'dist'),
		clean: true
	}
};
