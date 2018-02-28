var flatten = require('gulp-flatten');
var changed = require('gulp-changed');
var gutil = require('gulp-util');
var livereload = require('gulp-livereload');
var notify = require("gulp-notify");
var concat = require('gulp-concat');
var cleanCSS = require('gulp-clean-css');
var rename = require('gulp-rename');

const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');

function swallowError(error) {
	// If you want details of the error in the console
	gutil.log(error.toString());
	gutil.beep();
	this.emit('end');
}

/**
 * form style tasks
 */
global.gulp.task('sass-form-build', ['sass-form'], function(){
	var src = [
		global.buildFolder + "*.css",
		"!" + global.buildFolder + "*min.css"
	]

	var stream = global.gulp.src(src)
		// .pipe(concat('conversational-form.css'))
		.pipe(global.gulp.dest(global.buildFolder))
		.pipe(cleanCSS())
		.pipe(rename({suffix: '.min'}))
		.pipe(global.gulp.dest(global.buildFolder));

	return stream;
});

/**
 * SCSS
 */
global.gulp.task('sass-form', function () {
	var src = [
		global.srcFolder + "/themes/*.scss"
	]
	var dst = global.buildFolder;

	var stream = global.gulp.src(src)
		.pipe(sass({
			includePaths: ['node_modules','node_modules/conversational-form/src/styles/']
		}).on('error', sass.logError))
		.pipe(autoprefixer({ browsers: ['> 1%']}))
		.pipe(global.gulp.dest(dst))
		.pipe(livereload())
		.pipe(notify("CSS compiled."));

	return stream;
});







