const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const concat = require('gulp-concat');

/*
    -- TOP LEVEL FUNCTIONS --
    gul.task - Define tasks
    gulp.src - Point to files to use
    gulp.dest - Points to folder to output
    gulp.watch - Watch files and folders for changes
*/

// Logs Message - runs with "gulp message" in cli
gulp.task('message', () => {
    return console.log('Gulp is running');
});

// Copy all html files
gulp.task('copyHtml', () => {
    gulp.src('src/*.html')
        .pipe(gulp.dest('dist'));
});

// Optimize images
gulp.task('imageMin', () => {
	gulp.src('src/images/*')
		.pipe(imagemin())
        .pipe(gulp.dest('dist/images'));
});

// Minify JS
gulp.task('minify', () => {
    gulp.src('src/js/*.js')
        // .pipe(uglify()) bruges istedet i function scripts
        .pipe(gulp.dest('dist/js'));
});

// Gulp sass
gulp.task('sass', () => {
    gulp.src('src/sass/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('dist/css'));
});

// Scripts
gulp.task('scripts', () => {
    gulp.src('src/js/*.js')
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
})

// default runs with only "gulp" in cli
gulp.task('default', gulp.parallel('message', 'copyHtml', 'imageMin', 'sass', 'scripts'));

// cli "gulp watch" watch all the files and runs the functions on changes in files
gulp.task('watch', () => {
    gulp.watch('src/*.html', gulp.parallel('copyHtml'));
    gulp.watch('src/images/*', gulp.parallel('imageMin'));
    gulp.watch('src/sass/*.sass', gulp.parallel('sass'));
    gulp.watch('src/js/*.js', gulp.parallel('scripts'));
});
