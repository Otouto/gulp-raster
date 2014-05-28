'use strict';

var chai = require('chai');
chai.expect();
chai.should();

var raster = require('../index.js'),
    helper  = require('./helper');

describe('The "gulp-raster" plugin', function (done) {
    it('should convert a SVG to a PNG', function (done) {
        var stream   = raster(),
            image    = helper.createTestFile();

        stream.on('data', function (png) {
            helper.isPNG(png.contents).should.eql(true);

            done();
        });

        stream.write(image);
        stream.end();
    });
});
