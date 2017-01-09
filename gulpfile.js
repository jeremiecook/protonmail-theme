/**
 * Gulpfile.js
 *
 * Author : Jérémie Cook (hello@jeremiecook.com)
 */

gulp = require('gulp');

/**
 * Libraries autoload
 */
pkg = require('./package.json');

for (k in pkg.devDependencies) {
  v = pkg.devDependencies[k];
  a = k.indexOf('gulp-') > -1 ? k.split('gulp-')[1] : k;
  a = a.replace('-', '');
  global[a] = require(k);
}


/**
 * CSS, Sass & PostCSS
 */
gulp.task('styles', function() {

    var processors = [
        autoprefixer({browsers: ['last 2 versions']})
    ];

    return gulp.src('src/scss/*.scss')
        //.pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(postcss(processors))
        //.pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/css/'));
        //.pipe(livereload()));
});


/**
 * Tache Watch
 */
gulp.task('watch',function() {

    //livereload.listen();
    gulp.watch('src/scss/**/*.scss', ['styles']);
    //gulp.watch(paths['styles']).on('change', livereload.changed);

});


/**
 * Tache par défaut
 */
gulp.task('default', ['watch']);


