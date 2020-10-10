let gulp = require('gulp'),
    pug = require('gulp-pug'),
    batchreplace = require('gulp-batch-replace'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    csso = require('gulp-clean-css'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    minify=require('@node-minify/core'),
    terser=require('@node-minify/terser'),
    browserSync = require('browser-sync').create();

let classList = require('./src/class_replace');

let js_objects = [
    //'node_modules/bootstrap/js/src/util/index.js',
    //'node_modules/bootstrap/js/src/collapse.js',
    'node_modules/bootstrap/dist/js/bootstrap.js',
];

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
        .pipe(rename("suprachem.css"))
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

gulp.task('combineJS', function () {
    return gulp.src(js_objects)
        .pipe(concat('suprachem.js'))
        .pipe(gulp.dest('builds/development'))
});

gulp.task('distJS', function () {
    return minify({
        compressor: terser,
        input:'builds/development/suprachem.js',
        output:'builds/dist/suprachem.js',
        options:{
            warnings: true, // pass true to display compressor warnings.
            mangle: false, // pass false to skip mangling names.
            output: {}, // pass an object if you wish to specify additional output options. The defaults are optimized for best compression.
            compress: false
        }
    });
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

gulp.task('default', gulp.series('sass','pug','classReplaceHtml', 'classReplaceCss', 'combineJS', 'distJS'));
