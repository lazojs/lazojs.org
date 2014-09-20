var gulp = require('gulp');
var exec = require('child_process').exec;
var jshint = require('gulp-jshint');
var nodemon = require('gulp-nodemon');
var path = require('path');
// assumes first path is the global node modules path
var NODE_PATH = process.env.NODE_PATH.split(':')[0];
var lazo = path.normalize(NODE_PATH + path.sep + 'lazo' + path.sep + 'lazo.js');

gulp.task('lint', function () {
    return gulp.src(['src/**/*.js', '!src/app/client/bower_components/**/**.*'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('develop', function () {
    nodemon({ script: lazo, watch: ['src'], args: ['start', path.normalize(__dirname + path.sep + 'src')] })
    .on('change', ['lint'])
    .on('restart', function () {
        console.log('restarted!');
    });
});