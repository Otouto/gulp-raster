/*global webpage*/
'use strict';

module.exports = function rasterize(phantomProcess, svgContent, format, scale, cb) {
    phantomProcess
           .then(function (phantom) {
                return phantom.run(svgContent, format, scale,
                    function (svg, format, scale, resolve) {
                        var box,
                            page = webpage.create();

                        page.content = svg;
                        box = page.evaluate(function () {
                            return document.querySelector('svg').getBoundingClientRect();
                        });

                        Object.keys(box).forEach(function (key) {
                            box[key] *= scale;
                        });

                        page.clipRect = box;
                        page.zoomFactor = scale;

                        resolve(page.renderBase64(format));
                    });
            })
            .then(function (img) {
                return cb(null, new Buffer(img.toString(), 'base64'));
            })
			.catch(function (err) {
                return cb(err);
            });
};
