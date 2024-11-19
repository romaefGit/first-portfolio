const gulp = require("gulp");
const uglify = require("gulp-uglify");
const cleanCSS = require("gulp-clean-css");
const htmlmin = require("gulp-htmlmin");
const concat = require("gulp-concat");
const del = require("del");

// Clean the /dist folder
gulp.task("clean", () => {
  return del(["dist"]);
});

// Minify and copy JavaScript
gulp.task("scripts", () => {
  return gulp
    .src("client/landing/**/*.js") // Adjust path to your JS files
    .pipe(uglify())
    .pipe(concat("app.min.js"))
    .pipe(gulp.dest("dist/js"));
});

// Minify and copy CSS
gulp.task("styles", () => {
  return gulp
    .src("public/landing/css-site/**/*.css") // Adjust path to your CSS files
    .pipe(cleanCSS())
    .pipe(concat("styles.min.css"))
    .pipe(gulp.dest("dist/css"));
});

// Minify and copy CSS
gulp.task("styles", () => {
  return gulp
    .src("public/landing/**/*.css") // Adjust path to your CSS files
    .pipe(cleanCSS())
    .pipe(concat("styles.min.css"))
    .pipe(gulp.dest("dist/css"));
});

// Minify and copy HTML
gulp.task("html", () => {
  return gulp
    .src("client/landing/views/**/*.html") // Adjust path to your HTML files
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("dist"));
});

// Copy static assets
gulp.task("assets", () => {
  return gulp
    .src("public/landing/img/**/*") // Adjust path to your static assets
    .pipe(gulp.dest("dist/assets"));
});
// Default task
gulp.task("build", gulp.series("clean", "scripts", "styles", "html", "assets"));
