var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssvariables = require('postcss-css-variables');
var calc = require('postcss-calc');
var nodemon = require('gulp-nodemon');

function reload(done) {
	browserSync.reload();
	done();
}

gulp.task('sass', function () {
	return gulp
		.src('private/assets/css/**/*.scss')
		.pipe(sass({
			outputStyle: 'expanded'
		}).on('error', sass.logError))
		.pipe(postcss([autoprefixer(), cssvariables({
			preserve: true
		}), calc()]))
		.pipe(gulp.dest('private/assets/css'))
		.pipe(
			browserSync.reload({
				stream: true
			})
		);
});

gulp.task('nodemon', function (cb) {
	var called = false;
	return nodemon({
			script: 'index.js',
			ignore: ['gulpfile.js', 'node_modules/']
		})
		.on('start', function () {
			if (!called) {
				called = true;
				cb();
			}
		})
		.on('restart', function () {
			setTimeout(function () {
				browserSync.reload({
					stream: false
				});
			}, 1000);
		});
});

gulp.task(
	'browserSync',
	gulp.series('nodemon', function (done) {
		browserSync.init({
			proxy: 'localhost:8000',
			port: 3000
		});
		done();
	})
);

gulp.task(
	'watch',
	gulp.series(['browserSync', 'sass'], function () {
		gulp.watch('private/assets/css/**/*.scss', gulp.series(['sass']));
		gulp.watch('private/*.html', gulp.series(reload));
		gulp.watch('private/assets/js/**/*.js', gulp.series(reload));
	})
);