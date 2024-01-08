var gulp = require('gulp'),
    stylus = require('gulp-stylus'),
    nib = require('nib'),
    livereload = require('gulp-livereload'),
    htmlmin = require('gulp-htmlmin'),
    rename = require('gulp-rename'),
    cssnano = require('gulp-cssnano'),
    autoprefixer = require('gulp-autoprefixer'),
    notify = require('gulp-notify'),
    uglify = require('gulp-uglify');



gulp.task('css', function() {
    gulp.src('./app/css/*.styl')
        .pipe(stylus({
            use: nib(),
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
        .pipe(gulp.dest('./app/css/'))
        .pipe(cssnano({
            safe: true
        }))
        .pipe(rename('main.min.css'))
        .pipe(gulp.dest('./app/css/'));
});

gulp.task('js', function() {
    gulp.src('./app/js/main.js')
        .pipe(uglify())
        .pipe(rename('main.min.js'))
        .pipe(gulp.dest('./app/js/'));
});


gulp.task('html', function() {
    return gulp.src('./app/index_verbose.html')
        .pipe(htmlmin({
            collapseWhitespace: true
        }))
        .pipe(rename('index.html'))
        .pipe(gulp.dest('./app'));
});


gulp.task('watch', function() {
    livereload.listen();
    // Watch any files in dist/, reload on change
    gulp.watch('./app/index_verbose.html', ['html']);
    gulp.watch('./app/css/*.styl', ['css']);
    gulp.watch('./app/js/*.js', ['js']);
    gulp.watch(['./app/css/main.min.css', './app/index.html', './js/main.js']).on('change', livereload.changed);
});
