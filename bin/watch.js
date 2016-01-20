var fs = require('fs');
var browserify = require('browserify');
var watchify = require('watchify');
var babelify = require('babelify');

var b = browserify({
  entries: ['src/js/main.js'],
  transform: ["babelify"],
  cache: {},
  packageCache: {},
  plugin: [watchify],
  debug: true
});

function bundle() {
  var t = Date.now();
  var stream = fs.createWriteStream('public/js/bundle.js');

  stream.on('finish', function () {
    console.log('bundle updated ', ((Date.now() - t) / 1000));
  });
  b.bundle().pipe(stream);
}

b.on('update', bundle);
bundle();
