var gulp = require('gulp'),
    gutil = require('gulp-util'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat');
browserSync = require('browser-sync').create();

var jsSources = ['./src/client/components/*.js'],
    sassSources = ['styles/*.scss'],
    htmlSources = ['**/*.html'],
    outputDir = './assets';

gulp.task('browserSync', function () {
    browserSync.init({
        server: {
            proxy: "localhost:8080"
        },
    })
})

// gulp.task('log', function () {
//     gutil.log('== My First Task ==')
// });

// gulp.task('copy', function () {
//     gulp.src('./public/index.html')
//         .pipe(gulp.dest(outputDir))
// });

// gulp.task('sass', function () {
//     gulp.src(sassSources)
//         .pipe(sass({ style: 'expanded' }))
//         .on('error', gutil.log)
//         .pipe(gulp.dest('./assets/css'))
//         .pipe(browserSync.reload({
//             stream: true
//         }))
// });

// gulp.task('js', function () {
//     gulp.src(jsSources)
//         .pipe(uglify())
//         .pipe(concat('script.js'))
//         .pipe(gulp.dest(outputDir))
//         .pipe(browserSync.reload({
//             stream: true
//         }))
// });

gulp.task('watch', function () {
    gulp.watch(jsSources, ['js']);
    gulp.watch(sassSources, ['sass']);
    gulp.watch(htmlSources, ['html']);
});

gulp.task('html', function () {
    gulp.src(htmlSources)
        .pipe(browserSync.reload({
            stream: true
        }))
});

gulp.task('default', ['watch', 'browserSync']);