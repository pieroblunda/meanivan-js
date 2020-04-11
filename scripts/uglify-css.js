var fs = require('fs');
var uglifycss = require('uglifycss');

console.log('Uglify');
console.log('=============================');

// Vendor CSS
var uglified = uglifycss.processFiles([
    //'node_modules/animate.css/source/_base.css',
    // 'client/vendor/file-vider.css'
  ],{
    uglyComments: true
  }
);
fs.writeFile('public/css/vendor.min.css', uglified, function (err) {
  if (err) return console.log(err);
  console.log('Done!  public/css/vendor.min.css');
});
