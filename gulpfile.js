var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-ruby-sass'),
    prefix = require('gulp-autoprefixer'),
    imagemin = require('gulp-imagemin'),
    jade = require('gulp-jade'),
    server = require('gulp-server-livereload'),
    sourcemaps = require('gulp-sourcemaps');


    gulp.task('build', function() {  
       gulp.src('jade/index.jade')
         .pipe(jade({
           pretty: true   
         }))
         .pipe(uglify())
         .on('error', errorLog)
         .pipe(gulp.dest(''))  
     });
     

function errorLog(error) {
  console.error.bind(error);
  this.emit('end');
}


//Live Server
gulp.task('webserver', function() {
  gulp.src('')
    .pipe(server({
      livereload: true,
      defaultFile: 'index.html',
      directoryListing: false,
      open: false
    }));
});


//Sass Compilation 
gulp.task('styles', function() {   
    return sass('sass/styles.scss', {
     style: 'expanded'
    })    
    .pipe(sourcemaps.init())
    .on('error', errorLog)
    .pipe(prefix('last 2 versions'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(''))
   });

   //Image Task
//Compress images
gulp.task('image', function(){
  gulp.src('img/*.*')
   .pipe(imagemin())
   .pipe(gulp.dest('compr_img'));    
});


//Watch task
//Watch JS
gulp.task('watch', function() {
    gulp.watch('sass/*.scss', ['styles']);
    gulp.watch('*.jade', ['build']);
    gulp.watch('img/*', ['image']);    
    }); 


 gulp.task('default', ['build', 'styles', 'image', 'webserver', 'watch']);  
