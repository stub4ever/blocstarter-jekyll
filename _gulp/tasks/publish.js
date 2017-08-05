// =============================================================================
// PUBLISH
//
// Run the prodServer
// =============================================================================

// File Settings
var $                 = require('gulp-load-plugins')();
var gulp              = require('gulp');
var config            = require('../config');


const browser = require('browser-sync');

gulp.task('publish', function() {
    browser.init({
        server: config.production.browsersync.baseDir,
        proxy: config.production.browsersync.proxy,
        port: config.production.browsersync.port
    });
});
