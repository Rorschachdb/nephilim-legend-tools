var gulp = require('gulp');
var uglify = require('gulp-uglify');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync');
var less = require('gulp-less');
var path = require('path');

gulp.task('minify', function() {
  gulp.src('js/main.js')
  .pipe(uglify())
  .pipe(gulp.dest('build'));
});

gulp.task('processHtml', function(){
    gulp.src('*.htm*')
    .pipe(gulp.dest('build'));
});

gulp.task('processCSS', function() {
  gulp.src('styles/main.css')
  .pipe(autoprefixer())
  .pipe(gulp.dest('build'));
});

gulp.task('default', ['processHtml','minify', 'processCSS']);

gulp.task('watch', function() {
  gulp.watch('styles/*.css', ['processCSS']);
});

gulp.task('processSheetHtml', function(){
    gulp.src('sheet/*.htm*')
    .pipe(gulp.dest('build/sheet'));
});

gulp.task('processSheetCSS', function() {
  gulp.src('sheet/*.less')
  .pipe(less({
      paths: [ path.join(__dirname, 'sheet') ]
    }))
  .pipe(gulp.dest('build/sheet'));
});

gulp.task('sheet', ['processSheetHtml','processSheetCSS']);

gulp.task('serve',['default','sheet'], function() {
  browserSync.init({
    server: './build',
    port: 3000
  });
  gulp.watch('**/*.less', ['processCSS','processSheetCSS']).on('change', browserSync.reload);
  gulp.watch('**/*.html',['processSheetHtml']).on('change', browserSync.reload);
});
