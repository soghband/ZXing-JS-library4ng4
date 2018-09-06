"use strict";
/*
 * Copyright 2007 ZXing authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License")
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
/*package com.google.zxing.qrcode.decoder;*/
require("mocha");
var assert = require("assert");
var BitMatrix_1 = require("./../../../../core/common/BitMatrix");
var DataMask_1 = require("./../../../../core/qrcode/decoder/DataMask");
/**
 * @author Sean Owen
 */
describe('DataMask', function () {
    it('testMask0', function () {
        testMaskAcrossDimensions(0, {
            isMasked: function (i /*int*/, j /*int*/) {
                return (i + j) % 2 === 0;
            }
        });
    });
    it('testMask1', function () {
        testMaskAcrossDimensions(1, {
            isMasked: function (i /*int*/, j /*int*/) {
                return i % 2 === 0;
            }
        });
    });
    it('testMask2', function () {
        testMaskAcrossDimensions(2, {
            isMasked: function (i /*int*/, j /*int*/) {
                return j % 3 === 0;
            }
        });
    });
    it('testMask3', function () {
        testMaskAcrossDimensions(3, {
            isMasked: function (i /*int*/, j /*int*/) {
                return (i + j) % 3 === 0;
            }
        });
    });
    it('testMask4', function () {
        testMaskAcrossDimensions(4, {
            isMasked: function (i /*int*/, j /*int*/) {
                return (Math.floor(i / 2) + Math.floor(j / 3)) % 2 === 0;
            }
        });
    });
    it('testMask5', function () {
        testMaskAcrossDimensions(5, {
            isMasked: function (i /*int*/, j /*int*/) {
                return (i * j) % 2 + (i * j) % 3 === 0;
            }
        });
    });
    it('testMask6', function () {
        testMaskAcrossDimensions(6, {
            isMasked: function (i /*int*/, j /*int*/) {
                return ((i * j) % 2 + (i * j) % 3) % 2 === 0;
            }
        });
    });
    it('testMask7', function () {
        testMaskAcrossDimensions(7, {
            isMasked: function (i /*int*/, j /*int*/) {
                return ((i + j) % 2 + (i * j) % 3) % 2 === 0;
            }
        });
    });
    function testMaskAcrossDimensions(reference /*int*/, condition) {
        var mask = DataMask_1.default.values.get(reference);
        for (var version = 1; version <= 40; version++) {
            var dimension = 17 + 4 * version;
            testMask(mask, dimension, condition);
        }
    }
    function testMask(mask, dimension /*int*/, condition) {
        var bits = new BitMatrix_1.default(dimension);
        mask.unmaskBitMatrix(bits, dimension);
        for (var i = 0; i < dimension; i++) {
            for (var j = 0; j < dimension; j++) {
                assert.strictEqual(bits.get(j, i), condition.isMasked(i, j), '(' + i + ',' + j + ')');
            }
        }
    }
});
//# sourceMappingURL=DataMask.spec.js.map