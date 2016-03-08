/* global require */

var gulp = require('gulp'),
    nodemon = require('gulp-nodemon'),
    gulpMocha = require('gulp-mocha'),
    env = require('gulp-env'),
    bower = require('gulp-bower'),
    rimraf = require('rimraf');


gulp.task('default',['copy'], function () {
    nodemon({
        script: 'src/server.js',
        ext: 'js',
        env: {
            PORT: 3000
        },
        ignore: ['./node_modules/**']
    })
        .on('restart', function () {
            console.log('Restarting');
        });
});

gulp.task('test', function () {
    env({ vars: { ENV: 'Test' } });
    gulp.src('tests/*.js', { read: false })
        .pipe(gulpMocha({ reporter: 'nyan' }));
});

gulp.task('copy', function(){
    return gulp.src(['node_modules/angular2/bundles/**.js','node_modules/angular2-jwt/**'])
                .pipe(gulp.dest('src/public/libs/'));
});

gulp.task('bower', function() {
  return bower();
});

gulp.task('clean', function(cb) {
    rimraf('src/public/libs/',cb);
});