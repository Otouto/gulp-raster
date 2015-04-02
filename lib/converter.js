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
                            var boundingRect;

                            var svg = document.querySelector('svg');
                            if (svg.viewBox && svg.viewBox.baseVal) {
                                var vb = svg.viewBox.baseVal;
                                vb.x = vb.x || 0;
                                vb.y = vb.y || 0;
                                vb.width = vb.width || 0;
                                vb.height = vb.height || 0;
                                boundingRect = {
                                    left: vb.x,
                                    top: vb.y,
                                    width: vb.width,
                                    height: vb.height,
                                    right: vb.x + vb.width,
                                    bottom: vb.y + vb.height
                                };
                            } else {
                                boundingRect = svg.getBoundingClientRect();
                            }

                            return boundingRect;
                        });

                        Object.keys(box).forEach(function (key) {
                            box[key] *= scale;
                        });

                        page.clipRect = box;
                        page.zoomFactor = scale;

                        resolve(page.renderBase64(format));
                    });
            })
            .done(function (img) {
                return cb(null, new Buffer(img.toString(), 'base64'));
            }, function (err) {
                return cb(err);
            });
};
