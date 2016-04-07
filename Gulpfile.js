'use strict';

var gulp       = require('gulp');
var del        = require('del');
var babel      = require('babelify');
var browserify = require('browserify');
var uglify     = require('gulp-uglify');
var source     = require('vinyl-source-stream');
var streamify  = require('gulp-streamify');

gulp.task('clean', function() {
  del(['./dist/*']);
});

gulp.task('build', ['clean'], function() {

  return browserify(['./src/react-infinite-scroll.js'])
    .transform(babel.configure({
      optional: ['spec.protoToAssign', 'es7.classProperties']
    }))
    .bundle()
    .on('error', console.log.bind(console))
    .pipe(source('react-infinite-scroll.js'))
    .pipe(streamify(uglify()))
    .pipe(gulp.dest('./dist/'));
});
