// =============================================================================
// PRODUCTION TASK
// Build the prodFolder, run the server, and watch for file changes
// =============================================================================

// File Settings
var $                 = require('gulp-load-plugins')();
var gulp              = require('gulp');
var config            = require('../config');
var path              = require('path');

// Util
var browser           = require('browser-sync');
var sequence          = require('run-sequence');
var size              = require('gulp-size');

var rev               = require('gulp-rev');
var revNapkin         = require('gulp-rev-napkin');



// =============================================================================
// 'jekyll:production'

// Build the html,json,etc in prodFolder
// =============================================================================

var run          = require('gulp-run');
var shellCommand = 'JEKYLL_ENV=production bundle exec jekyll build' + ' --source=' + config.production.jekyll.src + ' --destination=' + config.production.jekyll.dest + ' --config=' + config.production.jekyll.config;

gulp.task('jekyll:production', function (done) {
    return gulp.src(config.source.path)
        .pipe(run(shellCommand))
        .on('close', done);
});

// =============================================================================
// OPTIMIZE HTML

// Copy and minimize, remove HTML files
// This task remove comments, output the size of the file and copy them to the production assets folder.
// =============================================================================
var htmlmin = require('gulp-htmlmin');

gulp.task('optimize:html', function() {
    return gulp
        .src(config.production.optimize.html.src)
        .pipe(htmlmin(config.production.optimize.html.options))
        .pipe(gulp.dest(config.production.optimize.html.dest));
});

// =============================================================================
// OPTIMIZE CSS

// Copy and minimize, remove CSS files
// This task remove comments, output the size of the file and copy them to the production assets folder.
// =============================================================================
var csso   = require('gulp-csso');

gulp.task('optimize:css', function() {
    return gulp
        .src(config.production.optimize.css.src)
        .pipe(csso(config.production.optimize.css.options))
        .pipe(gulp.dest(config.production.optimize.css.dest))
        .pipe(size());
});


// =============================================================================
// BASE64

// Base64 encoded images
// Replace urls in CSS fies with base64 encoded data
// If the images are not too large this will speed up loading website a lot.
// =============================================================================
var base64 = require('gulp-base64');

/**
 * Replace urls in CSS fies with base64 encoded data
 */
gulp.task('base64', ['sass'], function() {
    return gulp
        .src(config.production.base64.src)
        .pipe(base64(config.production.base64.options))
        .pipe(gulp.dest(config.production.base64.dest))
});


// =============================================================================
// OPTIMIZE JAVASCRIPT

// Copy and minimize JS files
// This task remove comments, output the size of the file and copy them to the production assets folder.
// =============================================================================
var uglify = require('gulp-uglify');


gulp.task('optimize:javascript', function() {
    return gulp
        .src(config.production.optimize.javascript.src)
        .pipe(uglify(config.production.optimize.javascript.options))
        .pipe(gulp.dest(config.production.optimize.javascript.dest))
        .pipe(size());
});



// =============================================================================
// OPTIMIZE IMAGES

// Copy and optimize images
// This task output the size of the file and copy them to the production assets folder.
// =============================================================================
var imagemin = require('gulp-imagemin');


gulp.task('optimize:images', function() {
    return gulp
        .src(config.production.optimize.images.src)
        .pipe(imagemin (config.production.optimize.images.options))
        .pipe(gulp.dest(config.production.optimize.images.dest))
        .pipe(size());
});


// =============================================================================
// REV ASSETS

// Add md5 hashes to assets referenced by CSS and JS files
// this task will rename all  CSS and JS files that has been changed to invalidate the old cache to latest update.
// =============================================================================

gulp.task('rev-assets', function() {
    // Ignore files that may reference assets. We'll rev them next.
    var ignoreThese = '!' + path.join(config.production.path,'/**/*+(css|js|json|html)')

    return gulp
        .src(config.production.path, {base: ignoreThese})
        .pipe(rev())
        .pipe(gulp.dest(config.production.path))
        .pipe(revNapkin({verbose: false}))
        .pipe(rev.manifest(path.join(config.production.path, config.production.revision.dest.manifest.name), {merge: true}))
        .pipe(gulp.dest(''));
});


// =============================================================================
// REV UPDATE REFERENCES

// Update asset references with reved filenames in compiled css + js
// =============================================================================
var revReplace = require('gulp-rev-replace');

gulp.task('rev-update-references', function(){
    var manifest = gulp.src(path.join(config.production.revision.dest.manifest.path, config.production.revision.dest.manifest.name))

    return gulp
        .src(path.join(config.production.path, config.production.revision.src.assets))
        .pipe(revReplace({manifest: manifest}))
        .pipe(gulp.dest(config.production.path))
})

// =============================================================================
// REV CSS

// Rev and compress CSS and JS files (this is done after assets, so that if a
// referenced asset hash changes, the parent hash will change as well
// =============================================================================

gulp.task('rev-css', function() {

    return gulp
        .src(path.join(config.production.path, config.production.revision.src.assets))
        .pipe(rev())
        .pipe(gulp.dest(config.production.path))
        .pipe(revNapkin({verbose: false}))
        .pipe(rev.manifest(path.join(config.production.revision.dest.manifest.path, config.production.revision.dest.manifest.name), {merge: true}))
        .pipe(gulp.dest(''));
})


// =============================================================================
// REV UPDATE HTML

// Update asset references in HTML
// =============================================================================

gulp.task('rev-update-html', function(){
    var manifest = gulp.src(path.join(config.production.revision.dest.manifest.path , config.production.revision.dest.manifest.name))

    return gulp
        .src(path.join(config.production.path, './', config.production.revision.src.html))

        .pipe(revReplace({manifest: manifest}))
        .pipe(gulp.dest(path.join(config.production.path, './')))
})



// =============================================================================
// COPY FONTS

// Copy src fonts to the devPath folder
// =============================================================================
gulp.task('copy:fonts:production', function() {
    return gulp
        .src(config.production.copy.fonts.src)
        .pipe(gulp.dest(config.production.copy.fonts.dest));
});


// =============================================================================
// COPY ICONS

// Copy src icons to the devPath folder
// =============================================================================
gulp.task('copy:icons:production', function() {
    return gulp
        .src(config.production.copy.icons.src)
        .pipe(gulp.dest(config.production.copy.icons.dest));
});


// =============================================================================
// SIZEREPORT

// Display a report of the size and Gzipped size of your project and trigger
// alarms when the sizes are higher than expected
// =============================================================================
var sizereport  = require('gulp-sizereport')

gulp.task('size-report', function() {
    return gulp
        .src([config.production.gzip.src, '!manifest.json'])
        .pipe(sizereport(config.production.gzip.options))
})

// =============================================================================
// Start a dyancmic server with LiveReload to proxy the site in
// =============================================================================
gulp.task('server:production', ['build:production'], function() {
    browser.init({
        server: config.production.browsersync.baseDir,
        proxy: config.production.browsersync.proxy,
        port: config.production.browsersync.port
    });
});

// =============================================================================
// CLEAN PRODUCTION

// Delete the production folder
// This happens every time a production task starts
// =============================================================================
var rimraf = require('rimraf');

gulp.task('clean:production', function(done) {
    rimraf(config.production.path, done);
});


// =============================================================================
// BUILD PRODUCTION

// Build the buildPath folder by running all of the above tasks
// =============================================================================
gulp.task('build:production', function(done) {
    sequence('clean:development', 'clean:production', 'jekyll:production', [
        'coreSass',
        'coreJavascript',
        'sass',
        'javascript'
        'images',
        'fonts',
        'icons'
    ],
        'base64',
    [
        'optimize:html',
        'optimize:css',
        'optimize:javascript',
        'optimize:images',
    ],
    // 1) Add md5 hashes to assets referenced by CSS and JS files
    'rev-assets',
    // 2) Update asset references (images, fonts, etc) with reved filenames in compiled css + js
    'rev-update-references',
    // 3) Rev and compress CSS and JS files (this is done after assets, so that if a referenced asset hash changes, the parent hash will change as well
    'rev-css',
    // 4) Update asset references in HTML
    'rev-update-html',
    [
    // Directory that you won't want to process or revision in production.
        'copy:fonts:production',
        'copy:icons:production' // Favicons, icons etc
    ],
    'size-report', done);
});


// =============================================================================
// Build the PRODUCTION FOLDER, run the server
// =============================================================================
gulp.task('production', ['build:production', 'server:production']);

gulp.task('deploy', ['build:production']);




