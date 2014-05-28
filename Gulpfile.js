'use strict';

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var mocha = require('gulp-mocha');
var stylish = require('jshint-stylish');

gulp.task('jshint', function () {
  // Minify and copy all JavaScript (except vendor scripts)
  return gulp.src(['./lib/**/*.js', './index.js'])
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

// Copy all static images
gulp.task('mocha', function () {
  return gulp.src('./test/*.js')
    .pipe(mocha({
      globals: ['chai'],
      timeout: 6000,
      ignoreLeaks: false,
      ui: 'bdd',
      reporter: 'spec'
    }));
});


gulp.task('test', function () {
  gulp.run('mocha', function () {});
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['jshint', 'mocha', 'watch']);
