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
var plumber           = require('gulp-plumber');
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
    gulp.start('kss:dev');
    browser.reload();
});



// =============================================================================
// KSS

// Compile Sass into CSS
// In production, the CSS is compressed
// =============================================================================

var shell   = require('gulp-shell');

// if OS is Mac.
if (process.platform === 'darwin') { var open = 'open'; }

// if OS is Linux.
else if (process.platform === 'linux') { var open = 'xdg-open'; }

// if OS is Windows.
else if (process.platform === 'win32') { var open = 'start'; }

gulp.task('kss:dev', shell.task([

    'kss --config kss-config.json'

]));

gulp.task('kss:show', shell.task([

    'kss --config kss-config.json',
    open + ' kss_styleguide/styleguide/index.html'

]));


// =============================================================================
// SASS

// Compile Sass into CSS
// In production, the CSS is compressed
// =============================================================================
var sass              = require('gulp-sass');
var sassdoc           = require('sassdoc');
var sassdoc           = require('require-dir');
var postcss           = require('gulp-postcss');
var autoprefixer      = require('autoprefixer');
var cssnano           = require('gulp-cssnano');


var processors = [
    autoprefixer
];

gulp.task('coreStyles:dev', ['kss:dev'], function() {
    return gulp
        .src(config.core.styles.src)
        .pipe(sourcemaps.init())
        .pipe(sass()).on('error', notify.onError(function (error) {
            return "Problem file : " + error.message;
        }))
        .pipe(postcss(processors))
        .pipe(cssnano())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(config.core.styles.app_dest))
        .pipe(gulp.dest(config.core.styles.dev_dest))
        .pipe(notify({
            title: 'coreStyles:dev succesfully!',
            message: 'coreStyles:dev task completed.'
        }));
});

gulp.task('styles:dev', function() {
    return gulp
        .src(config.development.styles.src)
        .pipe(sourcemaps.init())
        .pipe(sass()).on('error', notify.onError(function (error) {
            return "Problem file : " + error.message;
        }))
        .pipe(postcss(processors))
        .pipe(cssnano())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(config.development.styles.app_dest))
        .pipe(gulp.dest(config.development.styles.dev_dest))
         .pipe(notify({
            title: 'styles:dev succesfully!',
            message: 'styles:dev task completed.'
        }));
});



// =============================================================================
// MODERNISZR

// Detects custom features we need to test as we like call them for browser supports
// https://modernizr.com/
// =============================================================================
var modernizr = require('gulp-modernizr');

gulp.task('modernizr:dev', function() {
    return gulp.src([config.development.styles.dev_dest + '/*.css', config.development.scripts.dest + '/*.js'])
    .pipe(modernizr({
        "options": [
        "setClasses"
        ]
    }))
    .pipe(gulp.dest(config.development.modernizr.dest));
});


// =============================================================================
// JAVASCRIPT

// Combine JavaScript into one file
// In production, the file is minified
// Runs 2 tasks, a core and a src as to seperate the core updates
// =============================================================================
var babel               = require("gulp-babel");
var webpack             = require("webpack");
var webpackStream       = require('webpack-stream');
var webpackConfig       = require('../../webpack.config.js');


gulp.task('coreScripts:dev', function() {
    return gulp
        .src(config.core.scripts.src)
        .pipe(plumber(function(error){
            console.log("Error happend!", error.message);
            this.emit('end');
        }))
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(concat(config.core.scripts.mainFile))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(config.development.scripts.dest))
        .pipe(notify({
            title: 'coreScripts:dev succesfully!',
            message: 'coreScripts:dev task completed.'
        }));
});


// gulp.task('scripts:dev', function() {
//     return gulp
//         .src(config.development.scripts.src)
//         .pipe(sourcemaps.init())
//         .pipe(babel())
//         .pipe(concat(config.development.scripts.mainFile))
//         .pipe(sourcemaps.write())
//         .pipe(gulp.dest(config.development.scripts.dest));
// });

// babel + webpack
gulp.task('scripts:dev', ['modernizr:dev'], function(err) {
    return gulp
        .src([config.development.scripts.src])
        .pipe(plumber(function(error){
            console.log("Error happend!", error.message);
            this.emit('end');
        }))
        .pipe(sourcemaps.init())
        .pipe(webpackStream(webpackConfig), webpack)
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(config.development.scripts.dest))
        .pipe(notify({
            title: 'scripts:dev succesfully!',
            message: 'scripts:dev task completed.'
        }));
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
        // ghostMode: false, // Toggle to mirror clicks, reloads etc. (performance)
        // logFileChanges: true,
        // logLevel: 'debug',
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
    sequence('clean:development', ['jekyll-build'], [
        'styles:dev',
        'coreStyles:dev',
        'scripts:dev',
        'coreScripts:dev',
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
    gulp.watch([config.development.watch.jekyll], ['jekyll-rebuild']);

    gulp.watch([config.development.watch.styles], ['styles:dev', browser.reload]);
    gulp.watch([config.core.watch.styles], ['coreStyles:dev', browser.reload]);

    gulp.watch([config.development.watch.scripts], ['scripts:dev', browser.reload]);
    gulp.watch([config.core.watch.scripts], ['coreScripts:dev', browser.reload]);

    gulp.watch([config.development.watch.assets.images], ['images', browser.reload]);
    gulp.watch([config.development.watch.assets.fonts], ['fonts', browser.reload]);
    gulp.watch([config.development.watch.assets.icons], ['icons', browser.reload]);
});


