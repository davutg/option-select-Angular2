var gulp = require('gulp'),
    webserver = require('gulp-webserver'),
    typescript = require('gulp-typescript'),
    sourcemaps = require('gulp-sourcemaps'),
    minify = require('gulp-minify'),
    del = require('del'),
    tscConfig = require('./tsconfig.json');

var concat = require('gulp-concat');  
var rename = require('gulp-rename');  
var uglify = require('gulp-uglify'); 
    
var appSrc = 'builds/dev/',
    tsSrc = 'process/typescript/',
    deployRoot="builds/deploy/";

gulp.task('clean', function() {
 del([appSrc + 'js/*']);
});

gulp.task('cleanDeploy', function() {
 del([deployRoot]);
});

gulp.task('html', function() {
  gulp.src(appSrc + '**/*.html');
});

gulp.task('css', function() {
  gulp.src(appSrc + '**/*.css');
});

gulp.task('copylibs', function() {
  return gulp
    .src([
      'node_modules/es6-shim/es6-shim.min.js',
      'node_modules/systemjs/dist/system-polyfills.js',
      'node_modules/angular2/bundles/angular2-polyfills.js',
      'node_modules/systemjs/dist/system.src.js',
      'node_modules/rxjs/bundles/Rx.js',
      'node_modules/angular2/bundles/angular2.dev.js',
      'node_modules/angular2/bundles/http.js',
      'node_modules/jquery/dist/jquery.min.js'
    ])
    .pipe(gulp.dest(appSrc + 'js/lib/angular2'));
});
/** Deployment START **/
gulp.task('copyLibsToDeployment', function() {
  return gulp
    .src([
      'node_modules/es6-shim/es6-shim.min.js',
      'node_modules/systemjs/dist/system-polyfills.js',
      'node_modules/angular2/bundles/angular2-polyfills.js',
      'node_modules/systemjs/dist/system.src.js',
      'node_modules/rxjs/bundles/Rx.js',
      'node_modules/angular2/bundles/angular2.dev.js',
      'node_modules/angular2/bundles/http.js',
      'node_modules/jquery/dist/jquery.min.js'
    ])
    .pipe(gulp.dest(deployRoot + 'js/lib/angular2'));
});

gulp.task('tsDeployment', function () {
  return gulp
    .src(appSrc + 'js/whole.js')
    .pipe(uglify({mangle: false}))//mangle keep comp.names. uglify do min without x-min.js production
    //.pipe(concat('scripts.js')) 
    //.pipe(rename('scripts.min.js'))
    //.pipe(minify())
    .pipe(gulp.dest(deployRoot + 'js/'));
});

gulp.task('htmlDeployment', function () {
  return gulp
    .src(
      [
          appSrc + 'css**/*',
          appSrc + 'partials**/*',
          appSrc + 'images**/*',
          appSrc + 'data**/*',
          appSrc + 'index.html'
      ])    
    .pipe(gulp.dest(deployRoot));
});

/** DEPLOYMENT END **/

gulp.task('compress', function() {
  gulp.src(appSrc + 'js/lib/angular2/*.js')
    .pipe(minify({
        ext:{
            src:'-debug.js',
            min:'.js'
        },
        exclude: ['tasks'],
        ignoreFiles: ['.combo.js', '-min.js']
    }))
    .pipe(gulp.dest(appSrc+'js/lib/angular2/'))
});

gulp.task('typescript', function () {
  return gulp
    .src(tsSrc + '**/*.ts')
    .pipe(sourcemaps.init())
    .pipe(typescript(tscConfig.compilerOptions))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(appSrc + 'js/'));
});

gulp.task('watch', function() {
  gulp.watch(tsSrc + '**/*.ts', ['typescript']);
  gulp.watch(appSrc + 'css/*.css', ['css']);
  gulp.watch(appSrc + '**/*.html', ['html']);
});

gulp.task('webserver', function() {
  gulp.src(appSrc)
    .pipe(webserver({
      livereload: true,
      open: true
    }));
});
gulp.task('deploy', ['copyLibsToDeployment','htmlDeployment','tsDeployment']);

gulp.task('installDev', ['copylibs', 'typescript', 'watch']);

gulp.task('default', ['copylibs', 'typescript', 'watch', 'webserver']);
