global.gulp = require('gulp');
var fs = require('fs');
var livereload = require('./node_modules/gulp-livereload');
var gulpsync = require('./node_modules/gulp-sync')(global.gulp);

var package = JSON.parse(fs.readFileSync('package.json'));

// include task files
require("./gulp-tasks/styles");

//options
var rootPath = "./";

var srcFolder = rootPath+'/';
global.srcFolder = srcFolder;

var buildFolder = rootPath + 'build/';
global.buildFolder = buildFolder;

var distFolder = rootPath + 'dist/';
global.distFolder = distFolder;

var tasks = ['sass-form-build'];

// Watch Files For Changes
global.gulp.task('watch', tasks, function() {
	livereload.listen();

	console.log("Watch task started — development");

	global.gulp.watch(rootPath + 'themes/*.scss', ['sass-form']);
});

// Default tasks
global.gulp.task('default', ['watch']);
global.gulp.task('build', gulpsync.sync(tasks));