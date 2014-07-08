/*global webpage*/
'use strict';

module.exports = function rasterize(phantomProcess, svgPath, scale, format, cb) {
    phantomProcess
           .then(function (phantom) {
                return phantom.run(svgPath, scale, format,
                    function (svg, scale, format, resolve) {
                        var box,
                            page = webpage.create();

                        page.open(svg, function () {
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
                    });
            })
            .done(function (img) {
                return cb(null, new Buffer(img.toString(), 'base64'));
            }, function (err) {
                return cb(err);
            });
};
