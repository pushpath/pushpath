var gulp = require('gulp');
var typescript = require('gulp-tsc');
var browserify = require('gulp-browserify');
var path = require('path');
var tinylr = require('tiny-lr');
var nodemon = require("gulp-nodemon");
var rename = require("gulp-rename");
var clean = require("gulp-clean");
var es = require("event-stream");
var refresh = require('gulp-livereload');
var express = require('express');
var appserver = express();

var LIVERELOAD_PORT = 35729;
var EXPRESS_PORT = 3000;

var paths = {
	scripts: 'app/**/*.js',
	ts: 'app/**/*.ts',
	html: 'app/**/*.html',
	css: 'app/**/*.css',
	fonts: ['app/**/*.eot', 'app/**/*.svg', 'app/**/*.ttf', 'app/**/*.woff'],
	images: 'app/**/*.png',
	tmp: './.tmp/',
	build: './.build/'
}

function start_livereload() {
	tinylr().listen(LIVERELOAD_PORT);
	console.log('[Pushpath] Tiny-lr listening on ' + LIVERELOAD_PORT);
}

function start_express() {
	appserver.use(require('connect-livereload'));
	appserver.use(express.static(__dirname + path.tmp));
	appserver.listen(EXPRESS_PORT);
	console.log('[Pushpath] Express listening on port ' + EXPRESS_PORT);
}

gulp.task('typescript', ['clean'],  function(){
	return gulp.src([paths.ts])
		.pipe(typescript({
			sourcemap: false
		}))
		.pipe(gulp.dest(paths.build));
});

gulp.task('browserify', ['typescript'], function(){
	return gulp.src(paths.build + 'app.js')
		.pipe(browserify())
		.pipe(gulp.dest(paths.tmp));
});

gulp.task('assets', ['browserify'], function(){
	return es.concat(
		gulp.src(paths.html)
			.pipe(gulp.dest(paths.tmp)),
		gulp.src(paths.fonts)
			.pipe(gulp.dest(paths.tmp)),
		gulp.src(paths.images)
			.pipe(gulp.dest(paths.tmp)),
		gulp.src(paths.css)
			.pipe(gulp.dest(paths.tmp)));
});

gulp.task('clean', function(){
	return gulp.src([paths.tmp, paths.build], {read: false})
		.pipe(clean());
});

gulp.task('dev', ['assets','browserify', 'typescript'], function(){
	start_livereload();
	start_express();
	console.log('[Pushpath] Done starting up servers');
});

gulp.task('devx', ['assets','browserify', 'typescript'], function(){
	nodemon({
		script: 'pushpath.js',
		ext: 'html ts js' })
		.on('change', ['assets','browserify', 'typescript'])
		.on('restart', function(){
			console.log('server restart');
		});
});

gulp.task('default', function(){
	console.log('[Pushpath] Do nothing for now...');
});