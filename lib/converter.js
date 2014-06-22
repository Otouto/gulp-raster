'use strict';
/*global phantom: false*/

var webpage = require('webpage');

convert(phantom.args[0], phantom.args[1], Number(phantom.args[2]));

function convert(svg, format, scale) {
    var page = webpage.create();
    //render svg
    page.content = '<html><body>' + svg + '</body></html>';
    
    //adjust page size
    page.viewportSize = {
        width: 1,
        height: 1
    };
    page.zoomFactor = scale;

    //take a screenshot of rendered svg
    setTimeout(function () {
        console.log(page.renderBase64(format));
        phantom.exit();
    }, 0);
}