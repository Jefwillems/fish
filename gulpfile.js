var gulp = require("gulp");
var useref = require("gulp-useref");
var gulpif = require("gulp-if");
var minifyCss = require("gulp-clean-css");
var replace = require("gulp-replace");

gulp.task("assets", function() {
  return gulp.src("./assets/**/*").pipe(gulp.dest("./docs/assets/"));
});

gulp.task("build", ["assets"], function() {
  return gulp
    .src("./index.html")
    .pipe(useref())
    .pipe(gulpif("*.css", minifyCss()))
    .pipe(gulp.dest("./docs/"));
});

gulp.task("prod-assets", function() {
  return gulp.src("./assets/**/*").pipe(gulp.dest("./dist/assets/"));
});

gulp.task("prod", ["prod-assets"], function() {
  return gulp
    .src("./index.html")
    .pipe(useref())
    .pipe(gulpif("*.css", minifyCss()))
    .pipe(replace("assets/", "/static/main/"))
    .pipe(replace("css/", "/static/main/css/"))
    .pipe(replace("scripts/", "/static/main/js/"))
    .pipe(gulp.dest("./dist/"));
});
