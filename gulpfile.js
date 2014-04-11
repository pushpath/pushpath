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
var server = tinylr();

var paths = {
	scripts: 'app/**/*.js',
	ts: 'app/**/*.ts',
	html: 'app/**/*.html',
	css: 'app/**/*.css',
	fonts: ['app/**/*.eot', 'app/**/*.svg', 'app/**/*.ttf', 'app/**/*.woff'],
	images: 'app/**/*.png',
	tmp: './.tmp/',
	tsbuild: './.tsbuild/'
}

gulp.task('typescript', function(){
	return gulp.src([paths.ts])
		.pipe(typescript({
			sourcemap: false
		}))
		.pipe(gulp.dest(paths.tsbuild));
});

gulp.task('browserify', ['typescript'], function(){
	return gulp.src(paths.tsbuild + 'app.js')
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
			.pipe(gulp.dest(paths.tmp)))
		.pipe(refresh(server));
});

gulp.task('clean', function(){
	return gulp.src([paths.tmp, paths.tsbuild], {read: false})
		.pipe(clean());
});

gulp.task('livereload', function(){
	server.listen(35729, function(err){
		if(err) return console.log(err);
	});
});

gulp.task('dev', ['assets','browserify', 'typescript'], function(){
	nodemon({
		script: 'pushpath.js',
		ext: 'html ts js' })
		.on('change', ['assets','browserify', 'typescript'])
		.on('restart', function(){
			console.log('server restart');
		});

});

gulp.task('default', ['browserify', 'assets']);