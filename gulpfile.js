var gulp = require("gulp");
var useref = require("gulp-useref");
var gulpif = require("gulp-if");
var minifyCss = require("gulp-clean-css");

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
