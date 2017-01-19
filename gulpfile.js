var gulp = require('gulp');
var less = require('gulp-less');
var minifyCSS = require('gulp-csso');
var concatCss = require('gulp-concat-css');
var concat = require('gulp-concat');
var watch = require('gulp-watch');
var copy = require('gulp-copy');

function compile_js(stream) {
  return stream
    .pipe(concat('app.js'))
    .pipe(gulp.dest('public/dist/js/'));
}

function compile_css(stream) {
  return stream
    .pipe(less())
    .pipe(concatCss('stylesheet.css'))
    .pipe(minifyCSS())
    .pipe(gulp.dest('public/dist/css/'))
}

gulp.task('css', function(){
  var pipeline = gulp.src('src/less/base.less');
  return compile_css(pipeline);
});

gulp.task('copy-fonts', function(){
  return gulp.src('node_modules/bootstrap/dist/fonts/*')
    .pipe(copy('public/dist/', {prefix: 3}))
  
});

gulp.task('js', function(){
  var pipeline = gulp.src(['node_modules/jquery/dist/jquery.min.js', 'node_modules/bootstrap/dist/js/bootstrap.min.js', 'src/js/*.js'])
  return compile_js(pipeline);
});

gulp.task('watch', function () {
    return watch('src/**/*', function () {
      gulp.start('copy-fonts');
      gulp.start('css');
      gulp.start('js');
    });
});

gulp.task('default', [ 'copy-fonts', 'css', 'js']);