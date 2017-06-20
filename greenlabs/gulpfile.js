var gulp = require('gulp'),
    stylus = require('gulp-stylus'),
    livereload = require('gulp-livereload'),
    rename = require('gulp-rename'),
    cssnano = require('gulp-cssnano'),
    autoprefixer = require('gulp-autoprefixer'),
    notify = require('gulp-notify'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat');




gulp.task('css', function() {
    gulp.src('app/css/main.styl')
        .pipe(stylus({
            compress: false
        }))
        .pipe(autoprefixer({
            browsers: ['last 3 versions'],
            cascade: false
        }))
        .on("error", notify.onError({
            message: "Error: <%= error.message %>",
            title: "Error running something"
        }))
        .pipe(gulp.dest('app/css/'))
        .pipe(cssnano({
            safe: true
        }))
        .pipe(rename('main.min.css'))
        .pipe(gulp.dest('app/css/'));
});


gulp.task('js', function() {
    gulp.src('app/js/main.js')
        .pipe(uglify())
        .on("error", notify.onError({
            message: "Error: <%= error.message %>",
            title: "Error running something"
        }))
        .pipe(rename('main.min.js'))
        .pipe(gulp.dest('app/js/'));
});


// gulp.task('pug', function buildHTML() {
//   return gulp.src('app/*.pug')
//   .pipe(pug({
//     'pretty': true
//   }))
//   .pipe(gulp.dest('app/'));
// });


gulp.task('watch', function() {
    livereload.listen();
    // Watch any files in dist/, reload on change
    //gulp.watch('app/*.pug', ['pug']);
    gulp.watch('app/css/*.styl', ['css']);
    gulp.watch('app/js/main.js', ['js']);
    gulp.watch(['app/css/main.min.css', 'app/*.html', 'app/js/main.min.js']).on('change', livereload.changed);
});
