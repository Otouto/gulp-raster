'use strict';

var path = require('path'),
    concat = require('concat-stream'),
    spawn = require('child_process').spawn,

    phantomjsCmd = require('phantomjs').path,
    converterFileName = path.resolve(__dirname, './converter.js');

module.exports = function svgToPng(sourceFileName, format, scale, cb) {
    if (typeof scale === 'function') {
        cb = scale;
        scale = 1.0;
    }

    var args = [converterFileName, sourceFileName, format, scale],
        cl = spawn(phantomjsCmd, args);

    cl.stdout.pipe(concat(function (data) {
        return cb(null, new Buffer(data.toString(), 'base64'));
    }));

    cl.stderr.on('data', function (data) {
        return cb(data.toString());
    });
};
