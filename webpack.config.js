'use strict';
const webpack = require('webpack');
const path = require('path');
const getWebpackConfig = require('./script/getWebpackConf');


const getConfig = () => {
	const pkg = require(path.join(process.cwd(), 'package.json'));
	const config = Object.assign({}, pkg, {
		env: process.env.NODE_ENV,
	});

	return config;
}

const webpackConfig = getWebpackConfig(getConfig());
module.exports = webpackConfig;
