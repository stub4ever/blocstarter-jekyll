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
var concat            = require('gulp-concat');
var del               = require('del');
var notify            = require('gulp-notify');
var rename            = require('gulp-rename');

var size              = require('gulp-size');
var rev               = require('gulp-rev');
var revNapkin         = require('gulp-rev-napkin');
var sequence          = require('run-sequence');


// =============================================================================
// 'jekyll:prod'

// Build the html,json,etc in prodFolder
// Preprocess PRODUCTION sources
// =============================================================================
var preprocess   = require('gulp-preprocess');
var run          = require('gulp-run');
var shellCommand = 'JEKYLL_ENV=production bundle exec jekyll build' + ' --source=' + config.production.jekyll.src + ' --destination=' + config.production.jekyll.dest + ' --config=' + config.production.jekyll.config;

gulp.task('jekyll:prod', function (done) {
    return gulp.src(config.source.path)
        .pipe(run(shellCommand))
        .on('close', done);
});

gulp.task('preprocess:prod', function() {
    return gulp
        .src('./' + config.production.path + '/{,*/}*.html')
        .pipe(preprocess({context: { NODE_ENV: 'PRODUCTION', DEBUG: true}})) //To set environment variables in-line
        .pipe(gulp.dest('./' + config.production.path + '/'))
});


// =============================================================================
// OPTIMIZE HTML

// Copy and minimize, remove HTML files
// This task remove comments, output the size of the file and copy them to the production assets folder.
// =============================================================================
var htmlmin = require('gulp-htmlmin');

gulp.task('optimize:html:prod', function() {
    return gulp
        .src(config.production.optimize.html.src)
        .pipe(htmlmin(config.production.optimize.html.options))
        .pipe(gulp.dest(config.production.optimize.html.dest));
});

// =============================================================================
// OPTIMIZE CSS

// Copy and minimize
// remove unusued CSS
// Replace urls in CSS fies with base64 encoded data > If the images are not too large this will speed up loading website a lot.
// This task remove comments, output the size of the file and copy them to the production assets folder.
// =============================================================================
var csso    = require('gulp-csso');
var base64  = require('gulp-base64');

gulp.task('minimize:css:prod', function() {
    return gulp
        .src(config.production.optimize.css.group)
        .pipe(concat(config.production.optimize.css.bundleFile))
        .pipe(base64(config.production.optimize.css.base64.options))
        .pipe(csso(config.production.optimize.css.options))
        .pipe(gulp.dest(config.production.optimize.css.dest))
        .pipe(notify({
            title: 'optimize:css:prod succesfully!',
            message: 'optimize:css:prod task completed.'
        }))
});


gulp.task('clean:css:prod', function() {
    return del([
            config.production.optimize.css.dest+'*',
            '!'+config.production.optimize.css.dest+'/bundle-*',
        ])
});

gulp.task('optimize:css:prod', ['minimize:css:prod', 'clean:css:prod']);

// =============================================================================
// OPTIMIZE JAVASCRIPT

// Copy and minimize JS files
// This task remove comments, output the size of the file and copy them to the production assets folder.
// =============================================================================
var uglify = require('gulp-uglify');


gulp.task('minimize:headScript:prod', function() {
    return gulp
        .src(config.production.optimize.js.src + config.production.optimize.js.headScript)
        .pipe(concat(config.production.optimize.js.headScript))
        .pipe(uglify(config.production.optimize.js.options))
        .pipe(gulp.dest(config.production.optimize.js.dest))
        .pipe(notify({
            title: 'optimize:headScript:prod succesfully!',
            message: 'optimize:headScript:prod task completed.'
        }))
        .pipe(size());
});

gulp.task('minimize:bodyScript:prod', function() {
    return gulp
        .src(config.production.optimize.js.bodyGroup)
        .pipe(concat(config.production.optimize.js.bodyScript))
        .pipe(uglify(config.production.optimize.js.options))
        .pipe(gulp.dest(config.production.optimize.js.dest))
        .pipe(notify({
            title: 'optimize:bodyScript:prod succesfully!',
            message: 'optimize:bodyScript:prod task completed.'
        }))
        .pipe(size());
});

gulp.task('clean:js:prod', function() {
    return del([
            config.production.optimize.js.dest+'*',
            '!'+config.production.optimize.js.dest+'/bundle-*',
            '!'+config.production.optimize.js.dest+'/vendor-*',
        ])
});

gulp.task('optimize:js:prod', ['minimize:headScript:prod', 'minimize:bodyScript:prod', 'clean:js:prod']);


// =============================================================================
// OPTIMIZE IMAGES

// Copy and optimize images
// This task output the size of the file and copy them to the production assets folder.
// =============================================================================
var imagemin = require('gulp-imagemin');

gulp.task('optimize:images:prod', function() {
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

gulp.task('rev-assets:prod', function() {
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

gulp.task('rev-update-references:prod', function(){
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

gulp.task('rev-css:prod', function() {

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

gulp.task('rev-update-html:prod', function(){
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
gulp.task('copy:fonts:prod', function() {
    return gulp
        .src(config.production.copy.fonts.src)
        .pipe(gulp.dest(config.production.copy.fonts.dest));
});


// // =============================================================================
// // COPY ICONS

// // Copy src icons to the devPath folder
// // =============================================================================
gulp.task('copy:icons:prod', function() {
    return gulp
        .src(config.production.copy.icons.src)
        .pipe(gulp.dest(config.production.copy.icons.dest));
});


// =============================================================================
// COPY SPRITES

// Copy src icons to the devPath folder
// =============================================================================
gulp.task('copy:sprites:prod', function() {
    return gulp
        .src(config.production.copy.sprites.src)
        .pipe(gulp.dest(config.production.copy.sprites.dest));
});



// =============================================================================
// SIZEREPORT

// Display a report of the size and Gzipped size of your project and trigger
// alarms when the sizes are higher than expected
// =============================================================================
var sizereport  = require('gulp-sizereport')

gulp.task('size-report:prod', function() {
    return gulp
        .src([config.production.gzip.src, '!manifest.json'])
        .pipe(sizereport(config.production.gzip.options))
})

// =============================================================================
// Start a dyancmic server with LiveReload to proxy the site in
// =============================================================================
gulp.task('server:prod', ['build:prod'], function() {
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
var del               = require('del');

gulp.task('clean:prod', function() {
    return del(config.production.path, {force: true})
});


// =============================================================================
// BUILD PRODUCTION

// Build the buildPath folder by running all of the above tasks
// =============================================================================
gulp.task('build:prod', function(done) {
    sequence('clean:dev', 'clean:prod', 'jekyll:prod', [
        'preprocess:prod',
        'styles:dev',
        'styles:critical:dev',
        'coreStyles:dev',
        'scripts:dev',
        'coreScripts:dev',
        'sprites:dev',
        'images:dev',
        'fonts:dev',
        'icons:dev'
    ],
    [
        'optimize:html:prod',
        'optimize:css:prod',
        'optimize:js:prod',
        'optimize:images:prod',
    ],
    // 1) Add md5 hashes to assets referenced by CSS and JS files
    'rev-assets:prod',
    // 2) Update asset references (images, fonts, etc) with reved filenames in compiled css + js
    'rev-update-references:prod',
    // 3) Rev and compress CSS and JS files (this is done after assets, so that if a referenced asset hash changes, the parent hash will change as well
    'rev-css:prod',
    // 4) Update asset references in HTML
    'rev-update-html:prod',
    [
    // Directory that you won't want to process or revision in production.
        'copy:fonts:prod',
        'copy:icons:prod',
        'copy:sprites:prod'
    ],
    'size-report:prod', done);
});


// =============================================================================
// Build the PRODUCTION FOLDER, run the server
// =============================================================================
gulp.task('production', ['build:prod', 'server:prod']);



