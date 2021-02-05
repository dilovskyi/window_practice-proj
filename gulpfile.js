"use strict";

const { src, dest, watch, parallel, series } = require("gulp");
// const gulp = require("gulp");
const webpack = require("webpack-stream");
const scss = require("gulp-sass");
const concat = require("gulp-concat");
const browserSync = require("browser-sync").create();
const autoprefixer = require("gulp-autoprefixer"); /* Совместимость со старыми браузерами дбля цсс */
const imagemin = require("gulp-imagemin");
const del = require("del");
const cleanCSS = require("gulp-clean-css");
const htmlmin = require("gulp-htmlmin");

function browsersync() {
	browserSync.init({
		server: {
			baseDir: "src/",
		},
	});
}

function cleanDist() {
	return del("dist");
}

function copyAssets() {
	return src("src/assets/**/*.*").pipe(dest("dist/assets"));
}

function html() {
	return src("src/*.html")
		.pipe(htmlmin({ collapseWhitespace: true }))
		.pipe(dest("dist"))
		.pipe(browserSync.stream());
}

function styles() {
	return src(["src/sass/*.+(scss|sass)"]) /* Где искать файл */
		.pipe(scss({ outputstile: "compressed" }).on("error", scss.logError)) /* Через что будем фильтровать */
		.pipe(concat("bundle.css")) /* Объединяет файлы в один с заданым названием */
		.pipe(autoprefixer()) /* { overrideBrowserslist: ["last 10 version"], grid: true } */
		.pipe(cleanCSS({ compatibility: "ie8" }))
		.pipe(dest("src/assets/css")) /* Куда будем выбрасывать файл*/
		.pipe(browserSync.stream()); /* Аналог лайв сервер */
}

function scripts() {
	return src(["src/js/**/*.js", "!src/js/bundle.js", "!src/js/bundle.js.map"])
		.pipe(
			webpack({
				mode: "development",
				output: {
					filename: "bundle.js",
				},
				watch: false,
				devtool: "source-map",
				module: {
					rules: [
						{
							test: /\.m?js$/,
							exclude: /(node_modules|bower_components)/,
							use: {
								loader: "babel-loader",
								options: {
									presets: [
										[
											"@babel/preset-env",
											{
												debug: true,
												corejs: 3,
												useBuiltIns: "usage",
											},
										],
									],
								},
							},
						},
					],
				},
			})
		)
		.pipe(dest("src/js")) /* Куда сохранить  */
		.pipe(browserSync.stream()); /* Аналог лайв сервер */
}

function images() {
	return src("src/assets/images/**/*")
		.pipe(
			imagemin([
				imagemin.gifsicle({ interlaced: true }),
				imagemin.mozjpeg({ quality: 75, progressive: true }),
				imagemin.optipng({ optimizationLevel: 5 }),
				imagemin.svgo({
					plugins: [{ removeViewBox: true }, { cleanupIDs: false }],
				}),
			]),
			{ base: "src" /* Что бы переносило с папками base: "src" */ }
		)
		.pipe(dest("dist/assets/images"));
}

function build() {
	/* Переносим все файлы в дист */
	return src(["src/assets/css/bundle.css", "src/assets/fonts/**/*", "src/js/bundle.js", "src/js/bundle.js.map"], {
		base: "src" /* Что бы переносило с папками base: "src" */,
	}).pipe(dest("dist"));
}

function watching() {
	/* Смотрим за всеми файлами в папке и используем к ним функицю "Styles" */
	watch(["src/sass/**/*.+(scss|sass)"], styles);
	/* Смотрим за всеми файлами в папке и используем к ним функицю "Styles" */
	watch(["src/js/**/*.js", "!src/js/bundle.js", "!src/js/bundle.js.map"], scripts);
	watch(["src/**/*.html"]).on("change", browserSync.reload);
}

exports.browsersync = browsersync;
exports.cleanDist = cleanDist;
exports.images = images;
exports.scripts = scripts;
exports.styles = styles; /*  Назначаем ключевое слово на данный таск */
exports.watching = watching;
exports.html = html;

exports.build = series(cleanDist, images, html, copyAssets, build);
exports.default = parallel(styles, scripts, browsersync, watching); /* Назначаем выполнение по умолчанию */
