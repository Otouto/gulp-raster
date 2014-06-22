var through = require('through2'),
    gutil = require('gulp-util'),
    rasterize = require('./lib'),
    PluginError = gutil.PluginError;

const PLUGIN_NAME = 'gulp-raster';

module.exports = function (opt) {
    'use strict';

    opt = opt || {};
    opt.scale = opt.scale || 1;
    opt.format = opt.format || 'png';

    function raster(file, enc, callback) {
        var that = this;

        // Do nothing if no contents
        if (file.isNull()) { return callback(); }

        if (file.isBuffer()) {
            rasterize(file.contents, opt.format, opt.scale, function (err, data) {
                if (err) { throw new PluginError(PLUGIN_NAME, err); }

                file.contents = data;
                that.push(file);
                return callback();
            });
        }
    }

    return through.obj(raster);
};
