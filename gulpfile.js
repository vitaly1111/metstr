const { pipe }=require('stdout-stream')

const { src,dest,watch,parallel,series }=require('gulp'),

	scss=require('gulp-sass')(require('sass')),

	concat=require('gulp-concat'),
	browserSync=require('browser-sync').create(),
	uglify=require('gulp-uglify-es').default,
	imagemin=require('gulp-imagemin'),
	del=require('del'),
	autoprefixer=require('gulp-autoprefixer')

function css() {
	return src([
		'app/css/vendor/reset.css',
		'node_modules/swiper/swiper-bundle.min.css',
	])
		.pipe(concat('_libs.scss'))
		.pipe(dest('app/scss'))
		.pipe(browserSync.reload({ stream: true }))
}

function styles() {
	return src('app/scss/style.scss')
		.pipe(scss({ outputStyle: 'compressed' }))
		.pipe(concat("style.min.css"))
		.pipe(autoprefixer({
			overrideBrowserslist: ['last 10 version'],
			grid: true
		}))
		.pipe(dest('app/css'))
		.pipe(browserSync.stream())
}

//

function js() {
	return src([
		
		'node_modules/swiper/swiper-bundle.min.js'
	])
		.pipe(concat('lib.min.js'))
		.pipe(uglify())
		.pipe(dest('app/js'))
		.pipe(browserSync.stream())
}
function scripts() {
	return src([
		
		'app/js/main.js'
	])
		.pipe(concat('main.min.js'))
		.pipe(uglify())
		.pipe(dest('app/js'))
		.pipe(browserSync.stream())
}

function images() {
	return src('app/images/**/*')
		.pipe(imagemin(
			[
				imagemin.gifsicle({ interlaced: true }),
				imagemin.mozjpeg({ quality: 75,progressive: true }),
				imagemin.optipng({ optimizationLevel: 5 }),
				imagemin.svgo({
					plugins: [
						{ removeViewBox: true },
						{ cleanupIDs: false }
					]
				})
			]
		)
		)
		.pipe(dest(('dist/images')))
}

function build() {
	return src([
		'app/css/style.min.css',
		'app/fonts/**/*',
		'app/js/main.min.js',
		'app/js/lib.min.js',
		'app/*.html'
	],{ base: 'app' })
		.pipe(dest('dist'))
}

function watching() {
	watch(['app/scss/**/*.scss'],styles);
	watch(['app/js/**/*.js','!app/js/main.min.js'],scripts);
	watch(['app/*.html']).on('change',browserSync.reload)
}

function browsersync() {

	browserSync.init({
		server: {
			baseDir: "app/"
		}

	})
}

function cleanDist() {
	return del('dist')
}

exports.styles=styles;
exports.watching=watching;
exports.browsersync=browsersync;
exports.scripts=scripts;
exports.css=css;
exports.images=images;
exports.js=js;



exports.build=series(cleanDist,images,build);
exports.default=parallel(css,styles,js,scripts,browsersync,watching)