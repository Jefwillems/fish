var gulp = require("gulp");
var deploy = require("gulp-gh-pages");
var useref = require("gulp-useref");
var gulpif = require("gulp-if");
var minifyCss = require("gulp-clean-css");

gulp.task("build", function() {
  return gulp
    .src("./index.html")
    .pipe(useref())
    .pipe(gulpif("*.css", minifyCss()))
    .pipe(gulp.dest("./dist/"));
});

/**
 * Push build to gh-pages
 */
gulp.task("deploy", ["build"], function() {
  return gulp.src("./dist/**/*").pipe(deploy());
});
