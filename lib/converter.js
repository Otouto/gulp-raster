'use strict';
/*global phantom: false*/

var webpage = require('webpage');

convert(phantom.args[0], phantom.args[1], Number(phantom.args[2]));

function convert(svg, format, scale) {
    var page = webpage.create(), box;
    //render svg
    page.content = '<html><body>' + svg + '</body></html>';

    //get exact svg size and clip
    box = page.evaluate(function() {
        return document.querySelector('svg').getBoundingClientRect();
    });
    Object.keys(box).forEach(function (key) {
        box[key] *= scale;
    })

    page.clipRect = box;
    page.zoomFactor = scale;

    //take a screenshot of rendered svg
    setTimeout(function () {
        console.log(page.renderBase64(format));
        phantom.exit();
    }, 0);
}