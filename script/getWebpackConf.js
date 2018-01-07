'use strict';
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const { CheckerPlugin } = require("awesome-typescript-loader");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const autoprefixer = require("autoprefixer");


module.exports = function (pkg) {
	const basePath = path.resolve(pkg.context);
	const indexPath = path.join(basePath, pkg.entry);
	const buildPath = path.join(basePath, '../build');

	const webpackConfig = {}
	webpackConfig.context = basePath;
	webpackConfig.entry = indexPath;
	webpackConfig.output = {
		path: buildPath,
		filename: '[name].[hash].js'
	};

	if (pkg.env === "DEV"){
		webpackConfig.devtool = "source-map";
		webpackConfig.devServer = Object.assign({}, {
			historyApiFallback: true,
			hot: true
		}, pkg.url_proxy)
	}

	webpackConfig.module = {
		rules: [
			{
				test: /\.tsx?$/,
				include: basePath,
				use: [
					{
						loader: 'react-hot-loader/webpack'
					},
					{
						loader: 'babel-loader',
					},
					{
						loader: "awesome-typescript-loader",
						options: {
							useCache: true
						}
					}
				]
			},
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				use: [{ loader: "babel-loader" }]
			},
			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract([
					{
						loader: "css-loader",
						options: {
							sourceMap:true
						}
					},
					{
						loader: "postcss-loader",
						options: {
							sourceMap: true,
							plugins: loader => []
						}
					}
				])
			},
			{
				test: /\.scss$/,
				exclude: /node_modules/,
				use: ['css-hot-loader'].concat(ExtractTextPlugin.extract([
					{
						loader: "css-loader",
						options: {
							sourceMap:true
						}
					},
					{
						loader: "postcss-loader",
						options: {
							sourceMap: true,
							plugins: loader => []
						}
					},
					{
						loader: "sass-loader",
						options: {
							includePaths: [basePath],
							sourceMap: true
						}
					}
				]))
			},
			{
				enforce: "pre",
				test: /\.js$/,
				exclude:/node_modules/,
				loader: "source-map-loader"
			}
		]
	}

	let plugins = [];
	plugins = plugins.concat([
		new webpack.HotModuleReplacementPlugin(),
		new HtmlWebpackPlugin({
			template: path.join(basePath, 'index.html'),
			filename: 'index.html',
			inject: 'body'
		}),
		new CleanWebpackPlugin(["build"]),
		new ExtractTextPlugin({
			filename: "park.css",
		}),
		new CheckerPlugin()
	]);

	webpackConfig.plugins = plugins;

	webpackConfig.resolve = {
		extensions: [".ts", ".tsx", ".js", ".json"]
	};

	return webpackConfig;
}
