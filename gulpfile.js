let gulp = require('gulp'),
    pug = require('gulp-pug'),
    batchreplace = require('gulp-batch-replace'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    csso = require('gulp-clean-css'),
    rename = require('gulp-rename'),
    purgecss=require('gulp-purgecss'),
    browserSync = require('browser-sync').create();

let classList = require('./src/class_replace');

gulp.task('pug', function () {
    return gulp.src('src/*pug')
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest('builds/development'));
});


gulp.task('sass', function () {
    return gulp.src('suprachem.scss')
        .pipe(sass())
        .pipe(autoprefixer({browserlist: [">= 1%", "last 1 major version", "not dead", "Chrome >= 60", "Firefox >= 60", "Edge >= 16", "iOS >= 10", "Safari >= 10", "Android >= 6", "not Explorer <= 11"]}))
        .pipe(rename("suprachemraw.css"))
        .pipe(gulp.dest("builds/development"))
});

gulp.task('classReplaceHtml', function () {
    return gulp.src('builds/development/*.html')
        .pipe(batchreplace(classList))
        .pipe(gulp.dest('builds/dist'))
});

gulp.task('classReplaceCss', function () {
    return gulp.src('builds/development/suprachem.css')
        .pipe(csso())
        .pipe(batchreplace(classList))
        .pipe(gulp.dest("builds/dist"))
});

gulp.task('purgeCSS', function (){
    return gulp.src('builds/development/*.css')
        .pipe(purgecss({
            content: ['builds/development/*.html']
        }))
        .pipe(rename('suprachem.css'))
        .pipe(gulp.dest('builds/assets'))
});


//browsersync dist
gulp.task('browserSync', function () {
    browserSync.init({
        server: {
            baseDir: ["./builds/development/", "./builds/assets/"]
        }
    });
});

//replace classes in html and css
gulp.task('classReplace', gulp.series('classReplaceHtml', 'classReplaceCss'));

//pug and html class replace
gulp.task('noSassNoJs', gulp.series('pug', 'classReplaceHtml'));

gulp.task('default', gulp.series('sass','pug','classReplaceHtml', 'classReplaceCss'));
