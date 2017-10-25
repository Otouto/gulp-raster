/*global webpage*/
'use strict';

module.exports = function rasterize(phantomProcess, svgContent, format, scale, styles, cb) {
    phantomProcess
           .then(function (phantom) {
                return phantom.run(svgContent, format, scale, styles,
                    function (svg, format, scale, styles, resolve) {
                        var box,
                            page = webpage.create(),
                            content;

                        if (styles.length) {
                            content = '<style>' + styles.replace(/<\/?style>/g, '') + '</style>';
                            content += svg;
                        } else  {
                            content = svg;
                        }

                        page.content = content;
                        box = page.evaluate(function () {
                            return document.querySelector('svg').getBoundingClientRect();
                        });

                        Object.keys(box).forEach(function (key) {
                            box[key] *= scale;
                        });

                        page.clipRect = box;
                        page.zoomFactor = scale;

                        page.onLoadFinished = function() {
                            resolve(page.renderBase64(format));
                        };
                    });
            })
            .then(function (img) {
                return cb(null, new Buffer(img.toString(), 'base64'));
            })
			.catch(function (err) {
                return cb(err);
            });
};
