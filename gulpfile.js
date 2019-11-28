var gulp = require('gulp'),
		// kompiler scss > css
		sass = require('gulp-sass'),
		// autoprefixer css
		autoprefixer = require('gulp-autoprefixer'),
		// wstrzykiwanie css, js do html
		inject = require('gulp-inject'),
		// wyrzuca pliki i foldery
		clean = require('gulp-clean'),
		// minifikacja grafiki
		imagemin = require('gulp-imagemin'),
		pngquant = require('imagemin-pngquant'),
		mozjpeg = require('imagemin-mozjpeg'),
		// minifikacja HTML
		htmlclean = require('gulp-htmlclean'),
		// minifikacja CSS
		cleanCSS = require('gulp-clean-css'),
		// minifikacja JS
		uglify = require('gulp-uglify');

// npm install gulp-concat --save-dev

var paths = {
  src: 'src/**/*',
  srcHTML: 'src/**/*.html',
  srcCSS: 'src/**/*.css',
  srcJS: 'src/**/*.js',
  //
  tmp: 'tmp',
  //tmpIndex: 'tmp/index.html',
  tmpHTML: 'tmp/**/*.html',
  tmpCSS: 'tmp/**/*.css',
  tmpJS: 'tmp/**/*.js',
  //
  dest: 'dest',
  destIndex: 'dest/index.html',
  destCSS: 'dest/**/*.css',
  destJS: 'dest/**/*.js'
};

gulp.task('sass', function() {
	return gulp.src('src/assets/scss/**/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer({
			browserlist: ['last 3 versions']
		}))
		.pipe(gulp.dest('src/assets/css'))
});

gulp.task('html', function () {
  return gulp.src(paths.srcHTML).pipe(gulp.dest(paths.tmp));
});

gulp.task('dest:html', function () {
  return gulp.src(paths.tmpHTML)
  	.pipe(htmlclean())
  	.pipe(gulp.dest(paths.dest));
});

gulp.task('css', function () {
  return gulp.src(paths.srcCSS).pipe(gulp.dest(paths.tmp));
});

gulp.task('js', function () {
  return gulp.src(paths.srcJS).pipe(gulp.dest(paths.tmp));
});

gulp.task('copy', gulp.parallel('html', 'css', 'js'));

gulp.task('inject', gulp.series('copy', function () {
  var css = gulp.src(paths.tmpCSS);
  var js = gulp.src(paths.tmpJS);
  return gulp.src(paths.tmpHTML)
    .pipe(inject( css, {
    	relative:true
    }))
    .pipe(inject( js, {
    	relative:true
    }))
    .pipe(gulp.dest(paths.tmp));
}));

gulp.task('img', function(){
	return gulp.src('src/assets/img/*')
		.pipe(imagemin([
			pngquant({
				quality: [0.7, 0.9],
				strip: true
			}),
			mozjpeg({quality: 70})
			]))
		.pipe(gulp.dest('tmp/assets/img'))
});

// śledzenie zmian w plikach .scss i html, kompilacja scss i kopiowanie na bieżąco do tmp
gulp.task('watch', (function() {
	gulp.watch(['src/assets/scss/**/*.scss', 'src/*.html'], gulp.series('sass', 'inject'))
}));




// gulp.task('default', gulp.series('copy', 'inject'));

// hehe XD 
gulp.task('clean', function() {
	return gulp.src('dist').pipe(clean())
});