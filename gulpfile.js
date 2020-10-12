let gulp = require('gulp'),
    pug = require('gulp-pug'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    csso = require('gulp-clean-css'),
    rename = require('gulp-rename'),
    purgecss = require('gulp-purgecss'),
    minifyinline = require('gulp-minify-inline'),
    browserSync = require('browser-sync').create();

let classList = require('./src/class_replace');

gulp.task('pug', function () {
    return gulp.src('src/*pug')
        .pipe(pug({
            pretty: false
        }))
        .pipe(minifyinline())
        .pipe(gulp.dest('builds/dev'));
});


gulp.task('sass', function () {
    return gulp.src('suprachem.scss')
        .pipe(sass())
        .pipe(autoprefixer({browserlist: [">= 1%", "last 1 major version", "not dead", "Chrome >= 60", "Firefox >= 60", "Edge >= 16", "iOS >= 10", "Safari >= 10", "Android >= 6", "not Explorer <= 11"]}))
        .pipe(rename("suprachemraw.css"))
        .pipe(gulp.dest("builds/dev"))
});

gulp.task('purgeCSS', function (){
    return gulp.src('builds/dev/*.css')
        .pipe(purgecss({
            content: ['builds/dev/*.html']
        }))
        .pipe(rename('suprachem.css'))
        .pipe(gulp.dest('builds/assets'))
});


//browsersync dist
gulp.task('browserSync', function () {
    browserSync.init({
        server: {
            baseDir: ["./builds/dev/", "./builds/assets/"]
        }
    });
});

//replace classes in html and css
gulp.task('classReplace', gulp.series('classReplaceHtml', 'classReplaceCss'));

//pug and html class replace
gulp.task('noSassNoJs', gulp.series('pug', 'classReplaceHtml'));

gulp.task('default', gulp.series('sass','pug','classReplaceHtml', 'classReplaceCss'));
