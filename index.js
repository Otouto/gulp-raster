var through = require('through2'),
    gutil = require('gulp-util'),
    rasterize = require('./lib/converter'),
    PluginError = gutil.PluginError,
    phridge = require('phridge');

const PLUGIN_NAME = 'gulp-raster';

module.exports = function (opt) {
    'use strict';

    var phantomProcess = phridge.spawn();

    opt = opt || {};
    opt.scale = opt.scale || 1;
    opt.format = opt.format || 'png';

    return through.obj(function (file, enc, cb) {
        var that = this;

        // Do nothing if no contents
        if (file.isNull()) { return cb(); }

        if (file.isBuffer()) {
            rasterize(phantomProcess, file.path, opt.scale, opt.format, function (err, data) {
                if (err) { throw new PluginError(PLUGIN_NAME, err); }

                file.contents = data;
                that.push(file);
                return cb();
            });
        }
    }).on('end', function () {
        phantomProcess.finally(phridge.disposeAll);
    });
};
