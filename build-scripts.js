'use strict'

var gulp = require('gulp')
var webpack = require('webpack')
var gutil = require('gulp-util')

var config = require('./config')

function wptask(mode) {

	var cfg = genWebpackConfig({
		dest: config.dist + '/d',
		env: process.env.NODE_ENV,
		watchMode: mode === 'watch',
	})

	return function (cb) {
		webpack(cfg, function (err, stats) {
			if (err) throw new gutil.PluginError('webpack:build', err)

			var statsJson = stats.toJson()
			var needLog = mode === 'watch'
				|| statsJson.errors.length
				|| statsJson.warnings.length

			if (needLog) {
				gutil.log('[webpack:build]', stats.toString({
					colors: true,
				}))
			}
			cb()
		})
	}
}

gulp.task('build-scripts', wptask())
gulp.task('watch-scripts', wptask('watch'))

function genWebpackConfig(opt) {

	// default config
	var cfg = {
		entry: {
			'demo': './src/demo'
		},
		output: {
			filename: '[name]/index.js',
			path: opt.dest,
		},
		devtool: '#source-map',
		plugins: [
			new webpack.NoErrorsPlugin(),
			//new webpack.optimize.CommonsChunkPlugin('refashion-lib/base.js'),
		],
		resolve: {
			extensions: ['', '.js', '.jsx']
		},
		module: {
			loaders: [
				{ test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel' },

				{
					test: /\.scss$/,
					loaders: ["style-loader", "css-loader", "sass-loader"]
				},

				{ test: /\.css$/, loader: 'style!css?localIdentName=[local]___[hash:base64:5]&sourceMap'},
				{ test: /\.png$/, loader: "url-loader?mimetype=image/png" }
			],
		}
	}

	// watch mode
	if (opt.watchMode) cfg.watch = true

	return cfg
}

