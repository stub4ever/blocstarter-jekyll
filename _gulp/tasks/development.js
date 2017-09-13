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
var del               = require('del');
var concat            = require('gulp-concat');
var gutil             = require('gulp-util');
var notify            = require('gulp-notify');
var plumber           = require('gulp-plumber');
var sourcemaps        = require('gulp-sourcemaps');
var sequence          = require('run-sequence');
var rename            = require('gulp-rename');



// =============================================================================
// JEKYLL

// Rebuild Jekyll & do page reload
// =============================================================================
var messages = {
    jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
};

var run          = require('gulp-run');
var shellCommand = 'JEKYLL_ENV=development bundle exec jekyll build' + ' --source=' + config.development.jekyll.src + ' --destination=' + config.development.jekyll.dest + ' --config=' + config.development.jekyll.config;

gulp.task('jekyll-build:dev', function (done) {
    browser.notify(messages.jekyllBuild);
    return gulp.src(config.source.path)
        .pipe(run(shellCommand))
        .on('close', done);
});

gulp.task('jekyll-rebuild', ['jekyll-build:dev'], function () {
    gulp.start('kss:dev');
    browser.reload();
});



// =============================================================================
// KSS

// Compile Sass into CSS
// In production, the CSS is compressed
// =============================================================================

// if OS is Mac.
if (process.platform === 'darwin') { var open = 'open'; }

// if OS is Linux.
else if (process.platform === 'linux') { var open = 'xdg-open'; }

// if OS is Windows.
else if (process.platform === 'win32') { var open = 'start'; }


gulp.task('kss:dev', function (done) {
    return gulp.src(config.source.path)
        .pipe(run('kss --config kss-config.json'))
        .on('close', done);
});

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
// Critical CSS

// Processes critical CSS, to be included in head.html.
// https://gomakethings.com/inlining-critical-css-for-better-web-performance/
// =============================================================================
var csso    = require('gulp-csso');

gulp.task('styles:critical:dev', function() {
    return gulp
        .src(config.core.styles.critical)
        .pipe(sass()).on('error', notify.onError(function (error) {
            return "Problem file : " + error.message;
        }))
        .pipe(postcss(processors))
        .pipe(csso(config.production.optimize.css.options))
        .pipe(gulp.dest(config.core.styles.critical_dest))
        .pipe(notify({
            title: 'styles:critical:dev succesfully!',
            message: 'styles:critical:dev task completed.'
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
        // .pipe(concat(config.core.scripts.mainFile))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(config.core.scripts.app_dest))
        .pipe(gulp.dest(config.core.scripts.dev_dest))
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
        .pipe(gulp.dest(config.development.scripts.app_dest))
        .pipe(gulp.dest(config.development.scripts.dev_dest))
        .pipe(notify({
            title: 'scripts:dev succesfully!',
            message: 'scripts:dev task completed.'
        }));
});


// =============================================================================
// SPRITE
/* https://github.com/jkphl/svg-sprite/blob/master/docs/templating.md */
// Create a PNG copy of our SVG icon sprite
// =============================================================================

var svgSprite   = require('gulp-svg-sprite');
var svg2png     = require('gulp-svg2png');

var spriteConfig = {
    shape: {
        spacing: {
            padding: 1 // give each sprite more1 1px space
        }
    },
    mode: {
        css: {
            variables: { // Add new variables for template.css
                replaceSvgWithPng: function() {
                    return function(sprite, render) {
                        return render(sprite).split('.svg').join('.png');
                    }
                }
            },
            sprite: 'sprite',  // Change generated name of the file
            render: {
                css: {
                    template: config.development.assets.sprites.create
                }
            }
        }
    }
};

gulp.task('beginSpriteClean:dev', function() {
  return del(['./app/assets/sprites/css']);
});


gulp.task('createSprite:dev', ['beginSpriteClean:dev'], function() {
  return gulp
    .src(config.development.assets.sprites.src)
    .pipe(svgSprite(spriteConfig))
    .pipe(gulp.dest(config.development.assets.sprites.dest));
});


gulp.task('createPngCopy:dev', ['createSprite:dev'], function() {
  return gulp.src(config.development.assets.sprites.dest + '/css/*.svg')
    .pipe(svg2png())
    .pipe(gulp.dest(config.development.assets.sprites.dest + '/css'));
});


gulp.task('copySpriteGraphic:dev', ['createPngCopy:dev'], function() {
  return gulp
    .src(config.development.assets.sprites.dest + '/css/*.{svg,png}')
    .pipe(gulp.dest(config.development.assets.sprites.copy_visuals_dest));
});

gulp.task('copySpriteSass:dev',['createSprite:dev'], function() {
  return gulp
    .src(config.development.assets.sprites.dest + '/css/*.css')
    .pipe(rename('_sprite.scss'))
    .pipe(gulp.dest(config.development.assets.sprites.copy_css_dest))
    .pipe(notify({
        title: 'sprites:dev succesfully!',
        message: 'sprites:dev task completed.'
    }));
});


gulp.task('endSpriteClean:dev', ['copySpriteGraphic:dev', 'copySpriteSass:dev'], function() {
    return del(config.development.assets.sprites.dest + '/css');
});

gulp.task('sprites:dev', ['beginSpriteClean:dev', 'createSprite:dev', 'copySpriteSass:dev', 'copySpriteGraphic:dev', 'endSpriteClean:dev']);


// =============================================================================
// RESPONSIVE

// Resize one source image to one or more output images in different resolutions
// https://github.com/mahnunchik/gulp-responsive
// =============================================================================
var responsive = require('gulp-responsive');

gulp.task('responsive:dev', function () {
  return gulp
    .src(config.development.responsive.src)
    .pipe(responsive(config.development.responsive.files, {
        // Global configuration for all images
        // The output quality for JPEG, WebP and TIFF output formats
        quality: 80,
        // Use progressive (interlace) scan for JPEG and PNG output
        progressive: true,
        // Strip all metadata
        withMetadata: false,
        // Do not emit the error when image is enlarged.
        // errorOnEnlargement: false,
    }))
    .pipe(gulp.dest(config.development.assets.images.dest))
});


// =============================================================================
// IMAGES

// Copy images to the devPath folder
// In production, the images are compressed
// =============================================================================

gulp.task('images:dev', ['responsive:dev'], function() {
    return gulp
        .src(config.development.assets.images.src)
        .pipe(changed(config.development.assets.images.dest)) // Ignore unchanged files
        .pipe(gulp.dest(config.development.assets.images.dest))
        .pipe(notify({
            title: 'images:dev succesfully!',
            message: 'images:dev task completed.'
        }));
});


// =============================================================================
// FONTS

// Copy src fonts to the devPath folder
// =============================================================================
gulp.task('fonts:dev', function() {
    return gulp
        .src(config.development.assets.fonts.src)
        .pipe(changed(config.development.assets.fonts.dest)) // Ignore unchanged files
        .pipe(gulp.dest(config.development.assets.fonts.dest))
        .pipe(notify({
            title: 'fonts:dev succesfully!',
            message: 'fonts:dev task completed.'
        }));
});


// =============================================================================
// ICONS

// Copy src icons to the devPath folder
// =============================================================================
gulp.task('icons:dev', function() {
    return gulp
        .src(config.development.assets.icons.src)
        .pipe(changed(config.development.assets.icons.dest)) // Ignore unchanged files
        .pipe(gulp.dest(config.development.assets.icons.dest))
        .pipe(notify({
            title: 'icons:dev succesfully!',
            message: 'icons:dev task completed.'
        }));
});


// =============================================================================
// Start a dyancmic server with LiveReload to proxy the site in
// =============================================================================
gulp.task('server:dev', ['build:development'], function() {
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
gulp.task('clean:dev', function() {
    return del(config.development.path)
});

// =============================================================================
// BUILD DEVELOPMENT

// Build the buildPath folder by running all of the above tasks
// =============================================================================
gulp.task('build:development', function(done) {
    sequence('clean:dev', ['jekyll-build:dev'], [
        'styles:critical:dev',
        'styles:dev',
        'coreStyles:dev',
        'scripts:dev',
        'coreScripts:dev'
    ],
    [
        'sprites:dev',
        'images:dev',
        'fonts:dev',
        'icons:dev'
    ], done);
});


// =============================================================================
// Build the devFolder, run the server, and watch for file changes
// =============================================================================
gulp.task('default', ['build:development', 'server:dev'], function() {
    gulp.watch([config.development.watch.jekyll], ['jekyll-rebuild']);
    gulp.watch([config.development.watch.kss], ['kss:dev', browser.reload]);

    gulp.watch([config.development.watch.styles], ['styles:dev', browser.reload]);
    gulp.watch([config.core.watch.styles], ['coreStyles:dev', browser.reload]);
    gulp.watch([config.core.watch.critical], ['styles:critical:dev', browser.reload]);

    gulp.watch([config.development.watch.scripts], ['scripts:dev', browser.reload]);
    gulp.watch([config.core.watch.scripts], ['coreScripts:dev', browser.reload]);

    gulp.watch([config.development.watch.assets.images], ['images:dev', browser.reload]);
    gulp.watch([config.development.watch.assets.sprites], ['sprites:dev', browser.reload]);
    gulp.watch([config.development.watch.assets.fonts], ['fonts:dev', browser.reload]);
    gulp.watch([config.development.watch.assets.icons], ['icons:dev', browser.reload]);
});


