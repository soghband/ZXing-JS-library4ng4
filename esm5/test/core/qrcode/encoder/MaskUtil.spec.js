"use strict";
/*
 * Copyright 2008 ZXing authors
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
/*package com.google.zxing.qrcode.encoder;*/
require("mocha");
var assert = require("assert");
var ByteMatrix_1 = require("./../../../../core/qrcode/encoder/ByteMatrix");
var MaskUtil_1 = require("./../../../../core/qrcode/encoder/MaskUtil");
/**
 * @author satorux@google.com (Satoru Takabayashi) - creator
 * @author mysen@google.com (Chris Mysen) - ported from C++
 */
describe('MaskUtil', function () {
    it('testApplyMaskPenaltyRule1', function () {
        var matrix = new ByteMatrix_1.default(4, 1);
        matrix.setNumber(0, 0, 0);
        matrix.setNumber(1, 0, 0);
        matrix.setNumber(2, 0, 0);
        matrix.setNumber(3, 0, 0);
        assert.strictEqual(MaskUtil_1.default.applyMaskPenaltyRule1(matrix), 0);
        // Horizontal.
        matrix = new ByteMatrix_1.default(6, 1);
        matrix.setNumber(0, 0, 0);
        matrix.setNumber(1, 0, 0);
        matrix.setNumber(2, 0, 0);
        matrix.setNumber(3, 0, 0);
        matrix.setNumber(4, 0, 0);
        matrix.setNumber(5, 0, 1);
        assert.strictEqual(MaskUtil_1.default.applyMaskPenaltyRule1(matrix), 3);
        matrix.setNumber(5, 0, 0);
        assert.strictEqual(MaskUtil_1.default.applyMaskPenaltyRule1(matrix), 4);
        // Vertical.
        matrix = new ByteMatrix_1.default(1, 6);
        matrix.setNumber(0, 0, 0);
        matrix.setNumber(0, 1, 0);
        matrix.setNumber(0, 2, 0);
        matrix.setNumber(0, 3, 0);
        matrix.setNumber(0, 4, 0);
        matrix.setNumber(0, 5, 1);
        assert.strictEqual(MaskUtil_1.default.applyMaskPenaltyRule1(matrix), 3);
        matrix.setNumber(0, 5, 0);
        assert.strictEqual(MaskUtil_1.default.applyMaskPenaltyRule1(matrix), 4);
    });
    it('testApplyMaskPenaltyRule2', function () {
        var matrix = new ByteMatrix_1.default(1, 1);
        matrix.setNumber(0, 0, 0);
        assert.strictEqual(MaskUtil_1.default.applyMaskPenaltyRule2(matrix), 0);
        matrix = new ByteMatrix_1.default(2, 2);
        matrix.setNumber(0, 0, 0);
        matrix.setNumber(1, 0, 0);
        matrix.setNumber(0, 1, 0);
        matrix.setNumber(1, 1, 1);
        assert.strictEqual(MaskUtil_1.default.applyMaskPenaltyRule2(matrix), 0);
        matrix = new ByteMatrix_1.default(2, 2);
        matrix.setNumber(0, 0, 0);
        matrix.setNumber(1, 0, 0);
        matrix.setNumber(0, 1, 0);
        matrix.setNumber(1, 1, 0);
        assert.strictEqual(MaskUtil_1.default.applyMaskPenaltyRule2(matrix), 3);
        matrix = new ByteMatrix_1.default(3, 3);
        matrix.setNumber(0, 0, 0);
        matrix.setNumber(1, 0, 0);
        matrix.setNumber(2, 0, 0);
        matrix.setNumber(0, 1, 0);
        matrix.setNumber(1, 1, 0);
        matrix.setNumber(2, 1, 0);
        matrix.setNumber(0, 2, 0);
        matrix.setNumber(1, 2, 0);
        matrix.setNumber(2, 2, 0);
        // Four instances of 2x2 blocks.
        assert.strictEqual(MaskUtil_1.default.applyMaskPenaltyRule2(matrix), 3 * 4);
    });
    it('testApplyMaskPenaltyRule3', function () {
        // Horizontal 00001011101.
        var matrix = new ByteMatrix_1.default(11, 1);
        matrix.setNumber(0, 0, 0);
        matrix.setNumber(1, 0, 0);
        matrix.setNumber(2, 0, 0);
        matrix.setNumber(3, 0, 0);
        matrix.setNumber(4, 0, 1);
        matrix.setNumber(5, 0, 0);
        matrix.setNumber(6, 0, 1);
        matrix.setNumber(7, 0, 1);
        matrix.setNumber(8, 0, 1);
        matrix.setNumber(9, 0, 0);
        matrix.setNumber(10, 0, 1);
        assert.strictEqual(MaskUtil_1.default.applyMaskPenaltyRule3(matrix), 40);
        // Horizontal 10111010000.
        matrix = new ByteMatrix_1.default(11, 1);
        matrix.setNumber(0, 0, 1);
        matrix.setNumber(1, 0, 0);
        matrix.setNumber(2, 0, 1);
        matrix.setNumber(3, 0, 1);
        matrix.setNumber(4, 0, 1);
        matrix.setNumber(5, 0, 0);
        matrix.setNumber(6, 0, 1);
        matrix.setNumber(7, 0, 0);
        matrix.setNumber(8, 0, 0);
        matrix.setNumber(9, 0, 0);
        matrix.setNumber(10, 0, 0);
        assert.strictEqual(MaskUtil_1.default.applyMaskPenaltyRule3(matrix), 40);
        // Vertical 00001011101.
        matrix = new ByteMatrix_1.default(1, 11);
        matrix.setNumber(0, 0, 0);
        matrix.setNumber(0, 1, 0);
        matrix.setNumber(0, 2, 0);
        matrix.setNumber(0, 3, 0);
        matrix.setNumber(0, 4, 1);
        matrix.setNumber(0, 5, 0);
        matrix.setNumber(0, 6, 1);
        matrix.setNumber(0, 7, 1);
        matrix.setNumber(0, 8, 1);
        matrix.setNumber(0, 9, 0);
        matrix.setNumber(0, 10, 1);
        assert.strictEqual(MaskUtil_1.default.applyMaskPenaltyRule3(matrix), 40);
        // Vertical 10111010000.
        matrix = new ByteMatrix_1.default(1, 11);
        matrix.setNumber(0, 0, 1);
        matrix.setNumber(0, 1, 0);
        matrix.setNumber(0, 2, 1);
        matrix.setNumber(0, 3, 1);
        matrix.setNumber(0, 4, 1);
        matrix.setNumber(0, 5, 0);
        matrix.setNumber(0, 6, 1);
        matrix.setNumber(0, 7, 0);
        matrix.setNumber(0, 8, 0);
        matrix.setNumber(0, 9, 0);
        matrix.setNumber(0, 10, 0);
        assert.strictEqual(MaskUtil_1.default.applyMaskPenaltyRule3(matrix), 40);
    });
    it('testApplyMaskPenaltyRule4', function () {
        // Dark cell ratio = 0%
        var matrix = new ByteMatrix_1.default(1, 1);
        matrix.setNumber(0, 0, 0);
        assert.strictEqual(MaskUtil_1.default.applyMaskPenaltyRule4(matrix), 100);
        // Dark cell ratio = 5%
        matrix = new ByteMatrix_1.default(2, 1);
        matrix.setNumber(0, 0, 0);
        matrix.setNumber(0, 0, 1);
        assert.strictEqual(MaskUtil_1.default.applyMaskPenaltyRule4(matrix), 0);
        // Dark cell ratio = 66.67%
        matrix = new ByteMatrix_1.default(6, 1);
        matrix.setNumber(0, 0, 0);
        matrix.setNumber(1, 0, 1);
        matrix.setNumber(2, 0, 1);
        matrix.setNumber(3, 0, 1);
        matrix.setNumber(4, 0, 1);
        matrix.setNumber(5, 0, 0);
        assert.strictEqual(MaskUtil_1.default.applyMaskPenaltyRule4(matrix), 30);
    });
    function TestGetDataMaskBitInternal(maskPattern /*int*/, expected) {
        for (var x = 0; x < 6; ++x) {
            for (var y = 0; y < 6; ++y) {
                if ((expected[y][x] === 1) !== MaskUtil_1.default.getDataMaskBit(maskPattern, x, y)) {
                    return false;
                }
            }
        }
        return true;
    }
    // See mask patterns on the page 43 of JISX0510:2004.
    it('testGetDataMaskBit', function () {
        var mask0 = [
            Int32Array.from([1, 0, 1, 0, 1, 0]),
            Int32Array.from([0, 1, 0, 1, 0, 1]),
            Int32Array.from([1, 0, 1, 0, 1, 0]),
            Int32Array.from([0, 1, 0, 1, 0, 1]),
            Int32Array.from([1, 0, 1, 0, 1, 0]),
            Int32Array.from([0, 1, 0, 1, 0, 1])
        ];
        assert.strictEqual(TestGetDataMaskBitInternal(0, mask0), true);
        var mask1 = [
            Int32Array.from([1, 1, 1, 1, 1, 1]),
            Int32Array.from([0, 0, 0, 0, 0, 0]),
            Int32Array.from([1, 1, 1, 1, 1, 1]),
            Int32Array.from([0, 0, 0, 0, 0, 0]),
            Int32Array.from([1, 1, 1, 1, 1, 1]),
            Int32Array.from([0, 0, 0, 0, 0, 0]),
        ];
        assert.strictEqual(TestGetDataMaskBitInternal(1, mask1), true);
        var mask2 = [
            Int32Array.from([1, 0, 0, 1, 0, 0]),
            Int32Array.from([1, 0, 0, 1, 0, 0]),
            Int32Array.from([1, 0, 0, 1, 0, 0]),
            Int32Array.from([1, 0, 0, 1, 0, 0]),
            Int32Array.from([1, 0, 0, 1, 0, 0]),
            Int32Array.from([1, 0, 0, 1, 0, 0]),
        ];
        assert.strictEqual(TestGetDataMaskBitInternal(2, mask2), true);
        var mask3 = [
            Int32Array.from([1, 0, 0, 1, 0, 0]),
            Int32Array.from([0, 0, 1, 0, 0, 1]),
            Int32Array.from([0, 1, 0, 0, 1, 0]),
            Int32Array.from([1, 0, 0, 1, 0, 0]),
            Int32Array.from([0, 0, 1, 0, 0, 1]),
            Int32Array.from([0, 1, 0, 0, 1, 0]),
        ];
        assert.strictEqual(TestGetDataMaskBitInternal(3, mask3), true);
        var mask4 = [
            Int32Array.from([1, 1, 1, 0, 0, 0]),
            Int32Array.from([1, 1, 1, 0, 0, 0]),
            Int32Array.from([0, 0, 0, 1, 1, 1]),
            Int32Array.from([0, 0, 0, 1, 1, 1]),
            Int32Array.from([1, 1, 1, 0, 0, 0]),
            Int32Array.from([1, 1, 1, 0, 0, 0]),
        ];
        assert.strictEqual(TestGetDataMaskBitInternal(4, mask4), true);
        var mask5 = [
            Int32Array.from([1, 1, 1, 1, 1, 1]),
            Int32Array.from([1, 0, 0, 0, 0, 0]),
            Int32Array.from([1, 0, 0, 1, 0, 0]),
            Int32Array.from([1, 0, 1, 0, 1, 0]),
            Int32Array.from([1, 0, 0, 1, 0, 0]),
            Int32Array.from([1, 0, 0, 0, 0, 0]),
        ];
        assert.strictEqual(TestGetDataMaskBitInternal(5, mask5), true);
        var mask6 = [
            Int32Array.from([1, 1, 1, 1, 1, 1]),
            Int32Array.from([1, 1, 1, 0, 0, 0]),
            Int32Array.from([1, 1, 0, 1, 1, 0]),
            Int32Array.from([1, 0, 1, 0, 1, 0]),
            Int32Array.from([1, 0, 1, 1, 0, 1]),
            Int32Array.from([1, 0, 0, 0, 1, 1]),
        ];
        assert.strictEqual(TestGetDataMaskBitInternal(6, mask6), true);
        var mask7 = [
            Int32Array.from([1, 0, 1, 0, 1, 0]),
            Int32Array.from([0, 0, 0, 1, 1, 1]),
            Int32Array.from([1, 0, 0, 0, 1, 1]),
            Int32Array.from([0, 1, 0, 1, 0, 1]),
            Int32Array.from([1, 1, 1, 0, 0, 0]),
            Int32Array.from([0, 1, 1, 1, 0, 0]),
        ];
        assert.strictEqual(TestGetDataMaskBitInternal(7, mask7), true);
    });
});
//# sourceMappingURL=MaskUtil.spec.js.map