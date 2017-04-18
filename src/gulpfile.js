'use strict';
 
var gulp = require('gulp');
var sass = require('gulp-sass');
var minify = require('gulp-minify');
 
gulp.task('sass', function () {
  return gulp.src('./sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'));
});
 
gulp.task('watch', function () {
  gulp.watch('./sass/**/*.scss', ['sass']);
});

gulp.task('compress', function() {
  gulp.src('js/picker.js')
    .pipe(minify({
        ext:{
            min:'-min.js'
        }
    }))
    .pipe(gulp.dest('./js'))
});

gulp.task('default', ['watch','sass','compress']);