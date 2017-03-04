var path = require('path');
var _ = require('lodash');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var webpack = require('webpack');
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var pages = require('./templates.json');

var templatePages = _.map(pages, function (page) {
	return new HtmlWebpackPlugin({ filename: page.filename, template: page.template })
})

var webpackConfig = {
	context: path.resolve('./project'),
	entry: './js/index.js',
	output: {
		path: path.resolve('./dist/'),
		filename: 'js/bundle.js',
		publicPath: '/'
	},
	module : {}
}

webpackConfig.plugins = [
	new CleanWebpackPlugin(['dist']),
	new ExtractTextPlugin('./css/[name].css'),
	new webpack.ProvidePlugin({
		$: 'jquery',
		jQuery: 'jquery',
	}),
	new BrowserSyncPlugin({
		server: {
			baseDir: ['dist']
		},
		port: 3000,
		host: 'localhost',
		open: false
	}),
	new CopyWebpackPlugin([
		{
			from: './favicon.ico'
		},
		{
			from: './img/**/*',
			to: './'
		}
	])
].concat(templatePages)

webpackConfig.module.rules = [{
	test: /\.js$/,
	loader: 'babel-loader',
	exclude: /node_modules/,
	query: 'presets=es2015'
}]

webpackConfig.module.rules.push({
	test: /\.html$/,
	loader: "html"
})

webpackConfig.module.rules.push({
	test: /\.twig$/,
	loader: "twig-loader"
})

webpackConfig.module.rules.push({
	test: /\.scss$/,
	loader: ExtractTextPlugin.extract({
    fallback: "style-loader",
    use: "css-loader!sass-loader!webpack-px-to-rem?basePx=16"
  })
})

webpackConfig.module.rules.push({
	test: /\.css$/,
	loaders: ["style", "css"]
})

webpackConfig.module.rules.push({
	test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
	loader: "url-loader?limit=10000&mimetype=application/font-woff&name=fonts/[name].[ext]"
})

webpackConfig.module.rules.push({
	test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
	loader: "file?name=fonts/[name].[ext]"
})

webpackConfig.module.rules.push({
	test: /\.(jpe?g|png|gif)$/,
	loader: "file?name=img/[name].[ext]"
})

module.exports = webpackConfig
