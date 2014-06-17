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
var runSequence = require('gulp-run-sequence');

var appserver = express();
var watch = require('gulp-watch');
var plumber = require('gulp-plumber');

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

gulp.task('build-typescript',  function(){
	return gulp.src([paths.ts])
		.pipe(typescript({
			sourcemap: false
		}))
		.pipe(gulp.dest(paths.build));
});

gulp.task('build-browserify', function(){
	return gulp.src(paths.build + 'app.js')
		.pipe(browserify())
		.pipe(gulp.dest(paths.tmp));
});

gulp.task('build-assets', function(){
	return es.concat(
		gulp.src(paths.html)
            .pipe(watch(function(){
                gulp.dest(paths.tmp)
                    .pipe(refresh());
            }))
			.pipe(gulp.dest(paths.tmp)),
		gulp.src(paths.fonts)
            .pipe(watch(function(){
                gulp.dest(paths.tmp)
                    .pipe(refresh());
            }))
			.pipe(gulp.dest(paths.tmp)),
		gulp.src(paths.images)
            .pipe(watch(function(){
                gulp.dest(paths.tmp)
                    .pipe(refresh());
            }))
			.pipe(gulp.dest(paths.tmp)),
		gulp.src(paths.css)
            .pipe(watch(function(){
                gulp.dest(paths.tmp)
                    .pipe(refresh());
            }))
			.pipe(gulp.dest(paths.tmp)));
});

gulp.task('clean', function(){
	return gulp.src([paths.tmp, paths.build], {read: false})
		.pipe(clean());
});

gulp.task('dev', function(){
    runSequence('clean', 'build-typescript', 'build-browserify', 'build-assets', function(){
        start_livereload();
        start_express();
    });
});

gulp.task('default', function(){
	console.log('[Pushpath] Do nothing for now...');
});