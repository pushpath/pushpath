var gulp = require('gulp');
var typescript = require('gulp-tsc');
var browserify = require('gulp-browserify');
var path = require('path');
var rename = require("gulp-rename");
var clean = require("gulp-clean");
var runSequence = require('run-sequence');
var nodemon = require('gulp-nodemon');
var watch = require('gulp-watch');

var refresh = require('gulp-livereload');
var lr = require('tiny-lr');
var server = lr();

var ENV = 'dev';

var paths = {
	scripts: 'app/**/*.js',
	ts: 'app/**/*.ts',
	html: 'app/**/*.html',
	css: 'app/**/*.css',
	fonts: ['app/**/*.eot', 'app/**/*.svg', 'app/**/*.ttf', 'app/**/*.woff'],
	images: 'app/**/*.png',
	build: './.build'
}

function start_hapi() {
    nodemon({
        script: 'pushpath.js',
        ext: 'html js',
        watch: ['.build/dev/app']
    });
}

gulp.task('build-typescript',  function(){
	return gulp.src([paths.ts])
		.pipe(typescript({
			sourcemap: false
		}))
		.pipe(gulp.dest(paths.build + '/' + ENV + '/app'))
        .pipe(refresh(server));
});

gulp.task('build-browserify', function(){
	return gulp.src(paths.build + '/' + ENV + '/app/' + '/app.js')
		.pipe(browserify())
        .pipe(rename('app.min.js'))
		.pipe(gulp.dest(paths.build + '/' + ENV + '/app'))
        .pipe(refresh(server));
});

gulp.task('copy-fonts', function(){
	return gulp.src(paths.fonts)
		.pipe(gulp.dest(paths.build + '/' + ENV + '/app'));
});

gulp.task('copy-html', function(){
	return gulp.src(paths.html)
		.pipe(gulp.dest(paths.build + '/' + ENV + '/app'))
        .pipe(refresh(server));
});

gulp.task('copy-images', function(){
	return gulp.src(paths.images)
		.pipe(gulp.dest(paths.build + '/' + ENV + '/app'));
});

gulp.task('copy-css', function(){
	return gulp.src(paths.css)
		.pipe(gulp.dest(paths.build + '/' + ENV + '/app'));
});

gulp.task('clean', function(){
	return gulp.src([paths.build], {read: false})
		.pipe(clean());
});

gulp.task('start-servers', function(){
	start_hapi();
});

gulp.task('dev', function(){
    runSequence(
		'clean',
		'copy-fonts',
		'copy-html',
		'copy-images',
		'copy-css',
		'build-typescript',
		'build-browserify',
		'start-servers'
    );

    gulp.watch(paths.html, ['copy-html']);
    gulp.watch(paths.css, ['copy-css']);
    gulp.watch(paths.fonts, ['copy-fonts']);
    gulp.watch(paths.images, ['copy-images']);
    gulp.watch(paths.ts, function(){
        runSequence('build-typescript', 'build-browserify');
    });

});

gulp.task('default', function(){
	console.log('[Pushpath] Do nothing for now...');
});