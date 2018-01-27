/**
 * Created by yuqian on 16/5/14.
 */
'use strict'

var gulp = require('gulp')
var stylus = require('gulp-stylus')
var sass = require('gulp-sass')
var gulpif = require('gulp-if')
var cached = require('gulp-cached')
var progeny = require('gulp-progeny')
var sourcemaps = require('gulp-sourcemaps')
var postcss = require('gulp-postcss')
var gulpFilter = require('gulp-filter')

var AUTOPREFIXER_BROWSERS = [
	'Chrome >= 20',
	'last 2 Firefox versions',
	'Explorer >= 8',
]

var config = require('./config')
var onDev = process.env.NODE_ENV !== 'production'
var destDir = config.dist + '/d'

gulp.task('build-css', function () {
	return gulp.src(['./src/**/*.scss', './src/**/*.sass', '!./node_modules/**/*'])
		.pipe(gulpif(onDev, cached('scss')))
		.pipe(gulpif(onDev, progeny({
			exclusion: /node_modules/,
		})))
		.pipe(gulpif(onDev, sourcemaps.init()))
		.pipe(sass())
		.pipe(gulpif(!onDev, postCssHandler()))
		.pipe(gulpif(onDev, sourcemaps.write('.')))
		.pipe(gulp.dest(destDir))
})

function postCssHandler() {
	return postcss([
		require('autoprefixer')({ browsers: AUTOPREFIXER_BROWSERS }),
		require('postcss-color-rgba-fallback'),
		require('postcss-pseudoelements'),
	])
}

