var gulp = require('gulp'),
    gulpUtil = require('gulp-util'),
    spawn = require('child_process').spawn,
    node;

/**
 * $ gulp server
 * description: launch the server. If there's a server already running, kill it.
 */
gulp.task('app', function () {

    "use strict";

    if (node) {
        node.kill();
    }
    node = spawn('node', ['app.js'], {stdio: 'inherit'});
    node.on('close', function (code) {
        if (code === 8) {
            gulpUtil.log('Error detected, waiting for changes...');
        }
    });
});


/**
 * $ gulp
 * description: start the development environment
 */
gulp.task('default', ['app']);

// clean up if an error goes unhandled.
process.on('exit', function () {

    "use strict";

    if (node) {
        node.kill();
    }
});