const gulp = require('gulp');
const browserify = require('browserify');
const nodemon = require('nodemon');
const source = require('vinyl-source-stream');

gulp.task('default', ['compile-clientjs', 'test-react', 'nodemon', 'watch']);

gulp.task('nodemon', function(){
  return nodemon({
    script: './server/server.js',
    ext: 'js jsx',
    exec: 'babel-node',
    watch: ['./server/', './views/']
  }).on('start', function(){
    console.log('server started');
  }).on('restart', function(){
    console.log('server restarted');
  });
});

gulp.task('compile-clientjs', function(){
  return browserify({
    entries: './clientjs/main.js',
    extensions: ['.js', '.jsx'],
    debug: true
  }).transform('babelify', {
    presets: ['es2015', 'react']
  }).bundle()
  .pipe(source('bundle.js'))
  .pipe(gulp.dest('./public'));
});

gulp.task('test-react', function(){
  return browserify({
    entries: './react-compile-test/app.jsx',
    extensions: 'js jsx',
    transform: [['babelify', {presets: ['react', 'es2015']}]],
    debug: true
  });
});

gulp.task('watch', function(){
  return gulp.watch(['./views/**/*', './clientjs/*'], ['compile-clientjs', 'test-react']);
});
