// =============================================================================
// Deploy
//
// Run the prodServer
// =============================================================================

// File Settings
var $                 = require('gulp-load-plugins')();
var gulp              = require('gulp');
var config            = require('../config');
var rename            = require('gulp-rename');
var sequence          = require('run-sequence');


// =============================================================================
// COPY PROD. FOLDER

// Copy production folder to deployment folder
// =============================================================================
var wait              = require('gulp-wait');

gulp.task('copy:prod_dest', function() {
    return gulp
        .src(config.production.path + '/**/**/**/*')
        .pipe(wait(1500))
        .pipe(gulp.dest(config.deploy.path));
});

// =============================================================================
// CLEAN DEPLOY

// Delete the production folder
// This happens every time a production task starts
// =============================================================================
var del     = require('del');

gulp.task('clean:deploy', function() {
    return del([
            config.deploy.path+'/*',
        ], {force: true})
});

gulp.task('clean:buildFile', function() {
    return del('../../build', {force: true})
});


gulp.task('deploy', function(done) {
    sequence('clean:deploy', 'build:prod', [
        'copy:prod_dest',
    ],
    'clean:buildFile', done);
});
