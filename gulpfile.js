var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    prefix = require('gulp-autoprefixer'),
    imagemin = require('gulp-imagemin'),
    jade = require('gulp-jade'),
    livereload = require('gulp-livereload'),
    cleanCSS = require('gulp-clean-css'),
    sourcemaps = require('gulp-sourcemaps');



    gulp.task('build', function() {  
       gulp.src('jade/index.jade')
         .pipe(jade({
           pretty: true   
         }))
         .on('error', errorLog)
         .pipe(gulp.dest(''))  
         .pipe(livereload());         
     });
     

function errorLog(error) {
  console.error.bind(error);
  this.emit('end');
}


//Sass Compilation 
gulp.task('styles', function() {   
    return sass('sass/styles.scss', {
     style: 'expanded'
    })    
    .pipe(sourcemaps.init())
    .pipe(cleanCSS())    
    .on('error', errorLog)
    .pipe(prefix('last 2 versions'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(''))
    .pipe(livereload());    
   });

   //Image Task
//Compress images
gulp.task('image', function(){
  gulp.src('img/*.*')
   .pipe(imagemin())
   .pipe(gulp.dest('compr_img'))
   .pipe(livereload());    
});


//Watch task
//Watch JS
gulp.task('watch', function() {
    livereload.listen();  
    gulp.watch('sass/*.scss', ['styles']);
    gulp.watch('jade/*.jade', ['build']);
    gulp.watch('img/*', ['image']);    
    }); 




gulp.task('default', ['build', 'styles', 'image', 'watch']);  
