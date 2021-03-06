var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var plumber = require('gulp-plumber');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var autoPrefixer = require('gulp-autoprefixer');
var cssComb = require('gulp-csscomb');
var cmq = require('gulp-merge-media-queries');
var cleanCss = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var pug = require('gulp-pug');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var pngquant = require('imagemin-pngquant');
var mainBowerFiles = require('main-bower-files');
var print = require('gulp-print');
var gulpFilter = require('gulp-filter');
var sassGlob = require('gulp-sass-glob');
var useref = require('gulp-useref');
var gulpif = require('gulp-if');

gulp.task('sass', function () {
    gulp.src(['src/css/main.scss'])
        .pipe(plumber({
            handleError: function (err) {
                console.log(err);
                this.emit('end');
            }
        }))
        // .pipe(sourcemaps.init())
        .pipe(sassGlob())
        .pipe(sass())
        .pipe(autoPrefixer())
        .pipe(cssComb())
        .pipe(cmq({log: true}))
        .pipe(concat('main.css'))
        .pipe(gulp.dest('docs/css'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(cleanCss())
        // .pipe(sourcemaps.write())
        .pipe(gulp.dest('docs/css'))
        .pipe(reload({stream: true}))
});

gulp.task('js', function () {
    gulp.src(['src/js/*.js'])
        .pipe(concat('main.js'))
        .pipe(gulp.dest('docs/js'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(uglify())
        .pipe(gulp.dest('docs/js'))
        .pipe(reload({stream: true}));
});

gulp.task('pug', function () {
    gulp.src(['src/html/*.pug'])
        .pipe(plumber({
            handleError: function (err) {
                console.log(err);
                this.emit('end');
            }
        }))
        .pipe(pug({
            pretty: '\t',
            basedir: './'
        }))
        .pipe(gulp.dest('docs'))
        .pipe(reload({stream: true}))
});

gulp.task('images', function () {
    gulp.src(['src/img/**/*'])
        .pipe(plumber({
            handleError: function (err) {
                console.log(err);
                this.emit('end');
            }
        }))
        .pipe(cache(imagemin({
            optimizationLevel: 3,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        })))
        .pipe(gulp.dest('docs/img'))
        .pipe(reload({stream: true}))
});

gulp.task('vendor', function () {

    var bowerFiles = mainBowerFiles();
    var jsFilter = gulpFilter('**/*.js', {restore: true});
    var cssFilter = gulpFilter('**/*.css', {restore: true});
    var imgFilter = gulpFilter(['**/*.gif', '**/*.png', '**/*.jpg'], {restore: true});

    gulp.src(bowerFiles)
        .pipe(print())
        .pipe(jsFilter)
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest('docs/js'))
        .pipe(uglify())
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(gulp.dest('docs/js'))
        .pipe(jsFilter.restore);

    gulp.src(bowerFiles)
        .pipe(print())
        .pipe(cssFilter)
        .pipe(concat('vendor.css'))
        .pipe(gulp.dest('docs/css'))
        .pipe(cleanCss())
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(gulp.dest('docs/css'))
        .pipe(cssFilter.restore);

    return gulp.src(bowerFiles)
        .pipe(imgFilter)
        .pipe(cache(imagemin({
            optimizationLevel: 3,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        })))
        .pipe(gulp.dest('docs/img'));
});

gulp.task('fonts', function () {
    return gulp.src('src/fonts/**/*.*')
        .pipe(gulp.dest('docs/fonts'));
});

gulp.task('pug2', function () {
    gulp.src(['src/html/*.pug'])
        .pipe(plumber({
            handleError: function (err) {
                console.log(err);
                this.emit('end');
            }
        }))
        .pipe(pug({
            pretty: '\t',
            basedir: './'
        }))
        .pipe(useref())
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', cleanCss()))
        .pipe(gulp.dest('docs'))
        .pipe(reload({stream: true}))
});

gulp.task('copy-file', function () {
    gulp.src('src/bower/slick-carousel/slick/fonts/*.*')
        .pipe(gulp.dest('docs/fonts/slick'));
    return gulp.src('src/bower/slick-carousel/slick/ajax-loader.gif')
        .pipe(gulp.dest('docs/img'));
});

gulp.task('watch', function () {
    browserSync.init({
        server: "./docs"
    });
    gulp.watch('src/js/*.js', ['js']);
    gulp.watch('src/css/**/*.scss', ['sass']);
    gulp.watch('src/html/**/*.pug', ['pug2']);
    gulp.watch('src/img/**/*', ['images']);
});

gulp.task('default', ['sass', 'js', 'images', 'fonts', 'pug2', 'copy-file', 'watch']);