const gulp = require('gulp')
const uglify = require('gulp-uglify')
const concat = require('gulp-concat')

const paths = {
  scripts: ['js/index.js', 'index.js']
}
gulp.task('default', () => {
  gulp.src('js/*.js')
    .pipe(uglify())
    .pipe(concat('all.min.js'))
    .pipe(gulp.dest('build'))
})