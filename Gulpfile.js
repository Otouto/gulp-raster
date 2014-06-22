'use strict';

var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    mocha = require('gulp-mocha'),
    stylish = require('jshint-stylish'),
    runSequence = require('run-sequence');

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


gulp.task('test', function (done) {
  runSequence('mocha', done);
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['jshint', 'mocha']);
