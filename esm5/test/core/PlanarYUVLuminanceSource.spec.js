"use strict";
/*
 * Copyright 2014 ZXing authors
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
/*package com.google.zxing;*/
require("mocha");
var assert = require("assert");
var AssertUtils_1 = require("./util/AssertUtils");
var PlanarYUVLuminanceSource_1 = require("./../../core/PlanarYUVLuminanceSource");
var System_1 = require("./../../core/util/System");
describe('PlanarYUVLuminanceSource', function () {
    var YUV = Uint8ClampedArray.from([
        0, 1, 1, 2, 3, 5,
        8, 13, 21, 34, 55, 89,
        0, -1, -1, -2, -3, -5,
        -8, -13, -21, -34, -55, -89,
        127, 127, 127, 127, 127, 127,
        127, 127, 127, 127, 127, 127,
    ]);
    var COLS = 6;
    var ROWS = 4;
    var Y = new Uint8ClampedArray(COLS * ROWS);
    System_1.default.arraycopy(YUV, 0, Y, 0, Y.length);
    it('testNoCrop', function () {
        var source = new PlanarYUVLuminanceSource_1.default(YUV, COLS, ROWS, 0, 0, COLS, ROWS, false);
        assertTypedArrayEquals(Y, 0, source.getMatrix(), 0, Y.length);
        for (var r = 0; r < ROWS; r++) {
            assertTypedArrayEquals(Y, r * COLS, source.getRow(r, null), 0, COLS);
        }
    });
    it('testCrop', function () {
        var source = new PlanarYUVLuminanceSource_1.default(YUV, COLS, ROWS, 1, 1, COLS - 2, ROWS - 2, false);
        assert.strictEqual(source.isCropSupported(), true);
        var cropMatrix = source.getMatrix();
        for (var r = 0; r < ROWS - 2; r++) {
            assertTypedArrayEquals(Y, (r + 1) * COLS + 1, cropMatrix, r * (COLS - 2), COLS - 2);
        }
        for (var r = 0; r < ROWS - 2; r++) {
            assertTypedArrayEquals(Y, (r + 1) * COLS + 1, source.getRow(r, null), 0, COLS - 2);
        }
    });
    it('testThumbnail', function () {
        var source = new PlanarYUVLuminanceSource_1.default(YUV, COLS, ROWS, 0, 0, COLS, ROWS, false);
        AssertUtils_1.default.typedArraysAreEqual(Int32Array.from([0xFF000000, 0xFF010101, 0xFF030303, 0xFF000000, 0xFFFFFFFF, 0xFFFDFDFD]), source.renderThumbnail());
    });
    function assertTypedArrayEquals(expected, expectedFrom /*int*/, actual, actualFrom /*int*/, length /*int*/) {
        for (var i = 0; i < length; i++) {
            assert.strictEqual(actual[actualFrom + i], expected[expectedFrom + i]);
        }
    }
});
//# sourceMappingURL=PlanarYUVLuminanceSource.spec.js.map