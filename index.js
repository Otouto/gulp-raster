var through = require('through2'),
    gutil = require('gulp-util'),
    rasterize = require('./lib/converter'),
    PluginError = gutil.PluginError,
    phridge = require('phridge');

const PLUGIN_NAME = 'gulp-raster';

module.exports = function (opt) {
    'use strict';

    opt = opt || {};
    opt.scale = opt.scale || 1;
    opt.format = opt.format || 'png';

    var phantomProcess = phridge.spawn();

    return through.obj(function (file, enc, cb) {
        var that = this;

        // Do nothing if no contents
        if (file.isNull()) { return cb(); }

        if (file.isBuffer()) {
            rasterize(phantomProcess, file.contents.toString(), opt.format, opt.scale, function (err, data) {
                if (err) { that.emit('error', new PluginError(PLUGIN_NAME, err)); }

                file.contents = data;
                that.push(file);
                return cb();
            });
        }
    }).on('end', function () {
        phantomProcess
			.then(phridge.disposeAll)
			.catch(function (err) {
				phridge.disposeAll();
				throw err;
			});
    });
};
