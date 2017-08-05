// =============================================================================
// DEVEPLOPMENT TASK
// Build the devFolder, run the server, and watch for file changes
// =============================================================================

// File Settings
var $                 = require('gulp-load-plugins')();
var gulp              = require('gulp');
var config            = require('../config');

// // utils
var browser           = require('browser-sync');
var changed           = require('gulp-changed');
var concat            = require('gulp-concat');
var gutil             = require('gulp-util');
var notify            = require('gulp-notify');
var sourcemaps        = require('gulp-sourcemaps');
var sequence          = require('run-sequence');


// =============================================================================
// JEKYLL

// Rebuild Jekyll & do page reload
// =============================================================================
var messages = {
    jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
};

var run          = require('gulp-run');
var shellCommand = 'JEKYLL_ENV=development bundle exec jekyll build' + ' --source=' + config.development.jekyll.src + ' --destination=' + config.development.jekyll.dest + ' --config=' + config.development.jekyll.config;

gulp.task('jekyll-build', function (done) {
    browser.notify(messages.jekyllBuild);
    return gulp.src(config.source.path)
        .pipe(run(shellCommand))
        .on('close', done);
});

gulp.task('jekyll-rebuild', ['jekyll-build'], function () {
    browser.reload();
});

// =============================================================================
// SASS

// Compile Sass into CSS
// In production, the CSS is compressed
// =============================================================================
var sass              = require('gulp-sass');
var sassdoc           = require('sassdoc');
var sassdoc           = require('require-dir');
var autoprefixer      = require('gulp-autoprefixer');
var cssnano           = require('gulp-cssnano');


gulp.task('coreSass', function() {
    return gulp
        .src(config.core.sass.src)
        .pipe(sourcemaps.init())
        .pipe(sass()).on('error', notify.onError(function (error) {
            return "Problem file : " + error.message;
        }))
        .pipe(autoprefixer())
        .pipe(cssnano())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(config.core.sass.dest))
        .pipe(browser.reload({stream:true}))
        .pipe(gulp.dest(config.source.path + '/css'));
});

gulp.task('sass', function() {
    return gulp
        .src(config.development.sass.src)
        .pipe(sourcemaps.init())
        .pipe(sass()).on('error', notify.onError(function (error) {
            return "Problem file : " + error.message;
        }))
        .pipe(autoprefixer())
        .pipe(cssnano())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(config.development.sass.dest))
        .pipe(browser.reload({stream:true}))
        .pipe(gulp.dest(config.source.path + '/css'));
});


// =============================================================================
// KSS

// Compile Sass into CSS
// In production, the CSS is compressed
// =============================================================================

var kss = require('gulp-kss');

gulp.task('styleguide', function () {
    gulp.src([config.core.sass.src])
        .pipe(kss({
            overview: 'app/sass/styleguide.md',
            templateDirectory: 'app/css/styleguide/template'
        }))
        .pipe(gulp.dest('build/development/styleguide/'));
});

// =============================================================================
// JAVASCRIPT

// Combine JavaScript into one file
// In production, the file is minified
// Runs 2 tasks, a core and a src as to seperate the core updates
// =============================================================================
var babel = require("gulp-babel");


gulp.task('coreJavascript', function() {
    return gulp
        .src(config.core.javascript.src)
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(sourcemaps.write())
        .pipe(concat(config.core.javascript.mainFile))
        .pipe(gulp.dest(config.core.javascript.dest))
        .pipe(browser.reload({stream:true}))
        .pipe(gulp.dest(config.source.path + '/js'));
});


gulp.task('javascript', function() {
    return gulp
        .src(config.development.javascript.src)
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(sourcemaps.write())
        .pipe(concat(config.development.javascript.mainFile))
        .pipe(gulp.dest(config.development.javascript.dest))
        .pipe(browser.reload({stream:true}))
        .pipe(gulp.dest(config.source.path + '/js'));
});


// =============================================================================
// IMAGES

// Copy images to the devPath folder
// In production, the images are compressed
// =============================================================================

gulp.task('images', function() {
    return gulp
        .src(config.development.assets.images.src)
        .pipe(changed(config.development.assets.images.dest)) // Ignore unchanged files
        .pipe(gulp.dest(config.development.assets.images.dest));
});


// =============================================================================
// FONTS

// Copy src fonts to the devPath folder
// =============================================================================
gulp.task('fonts', function() {
    return gulp
        .src(config.development.assets.fonts.src)
        .pipe(changed(config.development.assets.fonts.dest)) // Ignore unchanged files
        .pipe(gulp.dest(config.development.assets.fonts.dest));
});


// =============================================================================
// ICONS

// Copy src icons to the devPath folder
// =============================================================================
gulp.task('icons', function() {
    return gulp
        .src(config.development.assets.icons.src)
        .pipe(changed(config.development.assets.icons.dest)) // Ignore unchanged files
        .pipe(gulp.dest(config.development.assets.icons.dest));
});


// =============================================================================
// Start a dyancmic server with LiveReload to proxy the site in
// =============================================================================
gulp.task('server:development', ['build:development'], function() {
    browser.init({
        server: config.development.browsersync.baseDir,
        proxy: config.development.browsersync.proxy,
        port: config.development.browsersync.port,
        ghostMode: false, // Toggle to mirror clicks, reloads etc. (performance)
        logFileChanges: true,
        logLevel: 'debug',
        open: true        // Toggle to automatically open page when starting.
    });
});


// =============================================================================
// CLEAN DEVELOPMENT

// Delete the development folder
// This happens every time a default starts
// =============================================================================
var rimraf = require('rimraf');

gulp.task('clean:development', function(done) {
    rimraf(config.development.path, done);
});


// =============================================================================
// BUILD DEVELOPMENT

// Build the buildPath folder by running all of the above tasks
// =============================================================================
gulp.task('build:development', function(done) {
    sequence('clean:development', [
        'jekyll-build',
        'coreSass',
        'coreJavascript',
        'sass',
        'javascript'
    ],
    [
        'images',
        'fonts',
        'icons'
    ], done);
});


// =============================================================================
// Build the devFolder, run the server, and watch for file changes
// =============================================================================
gulp.task('default', ['build:development', 'server:development'], function() {
    gulp.watch([config.core.watch.sass], ['coreSass', browser.reload]);
    gulp.watch([config.core.watch.javascript], ['coreJavascript', browser.reload]);
    gulp.watch([config.development.watch.jekyll], ['jekyll-rebuild']);
    gulp.watch([config.development.watch.sass], ['sass', browser.reload]);
    gulp.watch([config.development.watch.javascript], ['javascript', browser.reload]);
    gulp.watch([config.development.watch.assets.images], ['images', browser.reload]);
    gulp.watch([config.development.watch.assets.fonts], ['fonts', browser.reload]);
    gulp.watch([config.development.watch.assets.icons], ['icons', browser.reload]);
});


