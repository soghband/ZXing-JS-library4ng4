"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var assert = require("assert");
require("mocha");
var HybridBinarizer_1 = require("../../../core/common/HybridBinarizer");
var SharpImageLuminanceSource_1 = require("../SharpImageLuminanceSource");
var SharpImage_1 = require("../util/SharpImage");
var path = require('path');
describe('HybridBinarizer', function () {
    it('testHybridBinarizer', function (done) {
        SharpImage_1.default.loadWithRotations(path.resolve('src/test/core/resources/blackbox/common/simple.png'), [0], function (err, images) {
            if (err) {
                assert.ok(false, err);
                done(err);
                // console.error(err)
            }
            else {
                var image = images.get(0);
                var source = new SharpImageLuminanceSource_1.default(image);
                var test_1 = new HybridBinarizer_1.default(source);
                var matrix = test_1.getBlackMatrix();
                assert.equal(0, matrix.get(13, 12));
                assert.equal(1, matrix.get(13, 13));
                done();
            }
        });
    });
});
//# sourceMappingURL=HybridBinarizer.spec.js.map