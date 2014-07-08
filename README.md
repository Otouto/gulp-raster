# gulp-raster
[![NPM version][npm-image]][npm-url] [![Dependency Status][depstat-image]][depstat-url]

> Rasterization plugin for [gulp](https://github.com/wearefractal/gulp). It`s build on phantomjs, but, in contrast to svg2png, does not deal with fs(creating or reading tmp files).

## Usage

First, install `gulp-raster` as a development dependency:

```shell
npm i -S gulp-raster
```

Then, add it to your `gulpfile.js`:

```javascript
var raster = require('gulp-raster');
var rename = require('gulp-rename');

gulp.src('./src/**/svg/*.svg')
    .pipe(raster())
    .pipe(rename({extname: '.png'}))
    .pipe(gulp.dest('./dist')),
```

You also can specify scale and file format. Let`s say you want get icon set for retina:

```javascript
var raster = require('gulp-raster');
var rename = require('gulp-rename');

gulp.src('./src/**/svg/*.svg')
    .pipe(raster({format: 'jpg', scale: 2}))
    .pipe(rename({extname: '.jpg', suffix: '-2x'})
    .pipe(gulp.dest('./dist')),
```

## API

### raster(options)

#### options.scale
Type: `Number`
Default: `1`

Set scale rate of output image.

#### options.format
Type: `String`
Default: `png`

Set output file format, png/jpg are available.

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)

[npm-url]: https://npmjs.org/package/gulp-raster
[npm-image]: https://badge.fury.io/js/gulp-raster.png

[depstat-url]: https://david-dm.org/otouto/gulp-raster
[depstat-image]: https://david-dm.org/otouto/gulp-raster.png
