var gulp = require('gulp');
var browserSync = require('browser-sync').create();
// Requires the gulp-sass plugin
var sass = require('gulp-sass');
var axe = require('gulp-axe-webdriver');

gulp.task('hello', function() {
  console.log('Hi!!');
});

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'app'
    },
  })
});

gulp.task('axe', function(done) {
  var options = {
    saveOutputIn: 'allHtml.json',
    urls: ['app/index.html']
  };
  return axe(options, done);
});

gulp.task('sass', function() {
  return gulp.src('app/scss/**/*.scss') // Gets all files ending with .scss in app/scss
    .pipe(sass())
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('watch', ['browserSync', 'sass', 'axe'], function (){
  gulp.watch('app/scss/*.scss', ['sass']);
  gulp.watch('app/css/*.css', browserSync.reload);
  gulp.watch('app/*.html', browserSync.reload);
  gulp.watch('app/js/*.js', browserSync.reload);
  gulp.watch('app/*.html', axe.reload);
});
