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
/*package com.google.zxing.common;*/
require("mocha");
var assert = require("assert");
var AssertUtils_1 = require("./../util/AssertUtils");
var BitMatrix_1 = require("./../../../core/common/BitMatrix");
var BitArray_1 = require("./../../../core/common/BitArray");
var Exception_1 = require("./../../../core/Exception");
var StringBuilder_1 = require("./../../../core/util/StringBuilder");
/**
 * @author Sean Owen
 * @author dswitkin@google.com (Daniel Switkin)
 */
describe('BitMatrix', function () {
    var BIT_MATRIX_POINTS = [1, 2, 2, 0, 3, 1];
    it('testGetSet', function () {
        var matrix = new BitMatrix_1.default(33);
        assert.strictEqual(33, matrix.getHeight());
        for (var y = 0; y < 33; y++) {
            for (var x = 0; x < 33; x++) {
                if (y * x % 3 === 0) {
                    matrix.set(x, y);
                }
            }
        }
        for (var y = 0; y < 33; y++) {
            for (var x = 0; x < 33; x++) {
                var expected = y * x % 3 === 0;
                var value = matrix.get(x, y);
                assert.strictEqual(value, expected);
            }
        }
    });
    it('testSetRegion', function () {
        var matrix = new BitMatrix_1.default(5);
        matrix.setRegion(1, 1, 3, 3);
        for (var y = 0; y < 5; y++) {
            for (var x = 0; x < 5; x++) {
                assert.strictEqual(y >= 1 && y <= 3 && x >= 1 && x <= 3, matrix.get(x, y));
            }
        }
    });
    it('testEnclosing', function () {
        var matrix = new BitMatrix_1.default(5);
        assert.strictEqual(null === (matrix.getEnclosingRectangle()), true);
        matrix.setRegion(1, 1, 1, 1);
        assert.strictEqual(AssertUtils_1.default.typedArraysAreEqual(Int32Array.from([1, 1, 1, 1]), matrix.getEnclosingRectangle()), true);
        matrix.setRegion(1, 1, 3, 2);
        assert.strictEqual(AssertUtils_1.default.typedArraysAreEqual(Int32Array.from([1, 1, 3, 2]), matrix.getEnclosingRectangle()), true);
        matrix.setRegion(0, 0, 5, 5);
        assert.strictEqual(AssertUtils_1.default.typedArraysAreEqual(Int32Array.from([0, 0, 5, 5]), matrix.getEnclosingRectangle()), true);
    });
    it('testOnBit', function () {
        var matrix = new BitMatrix_1.default(5);
        assert.strictEqual(null === (matrix.getTopLeftOnBit()), true);
        assert.strictEqual(null === (matrix.getBottomRightOnBit()), true);
        matrix.setRegion(1, 1, 1, 1);
        assert.strictEqual(AssertUtils_1.default.typedArraysAreEqual(Int32Array.from([1, 1]), matrix.getTopLeftOnBit()), true);
        assert.strictEqual(AssertUtils_1.default.typedArraysAreEqual(Int32Array.from([1, 1]), matrix.getBottomRightOnBit()), true);
        matrix.setRegion(1, 1, 3, 2);
        assert.strictEqual(AssertUtils_1.default.typedArraysAreEqual(Int32Array.from([1, 1]), matrix.getTopLeftOnBit()), true);
        assert.strictEqual(AssertUtils_1.default.typedArraysAreEqual(Int32Array.from([3, 2]), matrix.getBottomRightOnBit()), true);
        matrix.setRegion(0, 0, 5, 5);
        assert.strictEqual(AssertUtils_1.default.typedArraysAreEqual(Int32Array.from([0, 0]), matrix.getTopLeftOnBit()), true);
        assert.strictEqual(AssertUtils_1.default.typedArraysAreEqual(Int32Array.from([4, 4]), matrix.getBottomRightOnBit()), true);
    });
    it('testRectangularMatrix', function () {
        var matrix = new BitMatrix_1.default(75, 20);
        assert.strictEqual(75, matrix.getWidth());
        assert.strictEqual(20, matrix.getHeight());
        matrix.set(10, 0);
        matrix.set(11, 1);
        matrix.set(50, 2);
        matrix.set(51, 3);
        matrix.flip(74, 4);
        matrix.flip(0, 5);
        // Should all be on
        assert.strictEqual((matrix.get(10, 0)), true);
        assert.strictEqual((matrix.get(11, 1)), true);
        assert.strictEqual((matrix.get(50, 2)), true);
        assert.strictEqual((matrix.get(51, 3)), true);
        assert.strictEqual((matrix.get(74, 4)), true);
        assert.strictEqual((matrix.get(0, 5)), true);
        // Flip a couple back off
        matrix.flip(50, 2);
        matrix.flip(51, 3);
        assert.strictEqual((matrix.get(50, 2)), false);
        assert.strictEqual((matrix.get(51, 3)), false);
    });
    it('testRectangularSetRegion', function () {
        var matrix = new BitMatrix_1.default(320, 240);
        assert.strictEqual(320, matrix.getWidth());
        assert.strictEqual(240, matrix.getHeight());
        matrix.setRegion(105, 22, 80, 12);
        // Only bits in the region should be on
        for (var y = 0; y < 240; y++) {
            for (var x = 0; x < 320; x++) {
                assert.strictEqual(y >= 22 && y < 34 && x >= 105 && x < 185, matrix.get(x, y));
            }
        }
    });
    it('testGetRow', function () {
        var matrix = new BitMatrix_1.default(102, 5);
        for (var x = 0; x < 102; x++) {
            if ((x & 0x03) === 0) {
                matrix.set(x, 2);
            }
        }
        // Should allocate
        var array = matrix.getRow(2, null);
        assert.strictEqual(array.getSize(), 102);
        // Should reallocate
        var array2 = new BitArray_1.default(60);
        array2 = matrix.getRow(2, array2);
        assert.strictEqual(array2.getSize(), 102);
        // Should use provided object, with original BitArray size
        var array3 = new BitArray_1.default(200);
        array3 = matrix.getRow(2, array3);
        assert.strictEqual(array3.getSize(), 200);
        for (var x = 0; x < 102; x++) {
            var on = (x & 0x03) === 0;
            assert.strictEqual(on, array.get(x));
            assert.strictEqual(on, array2.get(x));
            assert.strictEqual(on, array3.get(x));
        }
    });
    it('testSetRow', function () {
        var a = new BitMatrix_1.default(33);
        a.set(1, 0);
        a.set(2, 0);
        a.set(31, 32);
        a.set(32, 32);
        var b = new BitMatrix_1.default(33);
        b.setRow(0, a.getRow(0));
        b.setRow(1, a.getRow(0));
        b.setRow(31, a.getRow(32));
        b.setRow(32, a.getRow(32));
        assert.strictEqual(b.get(1, 0), true);
        assert.strictEqual(b.get(2, 0), true);
        assert.strictEqual(b.get(3, 0), false);
        assert.strictEqual(b.get(1, 1), true);
        assert.strictEqual(b.get(2, 1), true);
        assert.strictEqual(b.get(3, 1), false);
        assert.strictEqual(b.get(30, 31), false);
        assert.strictEqual(b.get(31, 31), true);
        assert.strictEqual(b.get(32, 31), true);
        assert.strictEqual(b.get(30, 32), false);
        assert.strictEqual(b.get(31, 32), true);
        assert.strictEqual(b.get(32, 32), true);
    });
    it('testRotate180Simple', function () {
        var matrix = new BitMatrix_1.default(3, 3);
        matrix.set(0, 0);
        matrix.set(0, 1);
        matrix.set(1, 2);
        matrix.set(2, 1);
        matrix.rotate180();
        assert.strictEqual((matrix.get(2, 2)), true);
        assert.strictEqual((matrix.get(2, 1)), true);
        assert.strictEqual((matrix.get(1, 0)), true);
        assert.strictEqual((matrix.get(0, 1)), true);
    });
    it('testRotate180', function () {
        testRotate180(7, 4);
        testRotate180(7, 5);
        testRotate180(8, 4);
        testRotate180(8, 5);
    });
    it('testParse', function () {
        var emptyMatrix = new BitMatrix_1.default(3, 3);
        var fullMatrix = new BitMatrix_1.default(3, 3);
        fullMatrix.setRegion(0, 0, 3, 3);
        var centerMatrix = new BitMatrix_1.default(3, 3);
        centerMatrix.setRegion(1, 1, 1, 1);
        var emptyMatrix24 = new BitMatrix_1.default(2, 4);
        assert.strictEqual(BitMatrix_1.default.parseFromString('   \n   \n   \n', 'x', ' ').equals(emptyMatrix), true);
        assert.strictEqual(BitMatrix_1.default.parseFromString('   \n   \r\r\n   \n\r', 'x', ' ').equals(emptyMatrix), true);
        assert.strictEqual(BitMatrix_1.default.parseFromString('   \n   \n   ', 'x', ' ').equals(emptyMatrix), true);
        assert.strictEqual(BitMatrix_1.default.parseFromString('xxx\nxxx\nxxx\n', 'x', ' ').equals(fullMatrix), true);
        assert.strictEqual(BitMatrix_1.default.parseFromString('   \n x \n   \n', 'x', ' ').equals(centerMatrix), true);
        assert.strictEqual(BitMatrix_1.default.parseFromString('      \n  x   \n      \n', 'x ', '  ').equals(centerMatrix), true);
        try {
            BitMatrix_1.default.parseFromString('   \n xy\n   \n', 'x', ' ');
            assert.ok(false);
        }
        catch (ex /*IllegalArgumentException ex*/) {
            if (Exception_1.default.isOfType(ex, Exception_1.default.IllegalArgumentException)) {
                // good
            }
            else {
                assert.ok(false);
            }
        }
        assert.strictEqual(BitMatrix_1.default.parseFromString('  \n  \n  \n  \n', 'x', ' ').equals(emptyMatrix24), true);
        assert.strictEqual(BitMatrix_1.default.parseFromString(centerMatrix.toString('x', '.'), 'x', '.').equals(centerMatrix), true);
    });
    it('testClone', function () {
        var matrix = new BitMatrix_1.default(33);
        matrix.set(0, 0);
        matrix.set(32, 32);
        var clone = matrix.clone();
        assert.strictEqual(clone.equals(matrix), true);
    });
    it('testUnset', function () {
        var emptyMatrix = new BitMatrix_1.default(3, 3);
        var matrix = emptyMatrix.clone();
        matrix.set(1, 1);
        assert.strictEqual(matrix.equals(emptyMatrix), false);
        matrix.unset(1, 1);
        assert.strictEqual(matrix.equals(emptyMatrix), true);
        matrix.unset(1, 1);
        assert.strictEqual(matrix.equals(emptyMatrix), true);
    });
    it('testXOR', function () {
        var emptyMatrix = new BitMatrix_1.default(3, 3);
        var fullMatrix = new BitMatrix_1.default(3, 3);
        fullMatrix.setRegion(0, 0, 3, 3);
        var centerMatrix = new BitMatrix_1.default(3, 3);
        centerMatrix.setRegion(1, 1, 1, 1);
        var invertedCenterMatrix = fullMatrix.clone();
        invertedCenterMatrix.unset(1, 1);
        var badMatrix = new BitMatrix_1.default(4, 4);
        testXOR(emptyMatrix, emptyMatrix, emptyMatrix);
        testXOR(emptyMatrix, centerMatrix, centerMatrix);
        testXOR(emptyMatrix, fullMatrix, fullMatrix);
        testXOR(centerMatrix, emptyMatrix, centerMatrix);
        testXOR(centerMatrix, centerMatrix, emptyMatrix);
        testXOR(centerMatrix, fullMatrix, invertedCenterMatrix);
        testXOR(invertedCenterMatrix, emptyMatrix, invertedCenterMatrix);
        testXOR(invertedCenterMatrix, centerMatrix, fullMatrix);
        testXOR(invertedCenterMatrix, fullMatrix, centerMatrix);
        testXOR(fullMatrix, emptyMatrix, fullMatrix);
        testXOR(fullMatrix, centerMatrix, invertedCenterMatrix);
        testXOR(fullMatrix, fullMatrix, emptyMatrix);
        try {
            emptyMatrix.clone().xor(badMatrix);
            assert.ok(false);
        }
        catch (ex /*IllegalArgumentException*/) {
            if (Exception_1.default.isOfType(ex, Exception_1.default.IllegalArgumentException)) {
                // good
            }
            else {
                assert.ok(false);
            }
        }
        try {
            badMatrix.clone().xor(emptyMatrix);
            assert.ok(false);
        }
        catch (ex /*IllegalArgumentException*/) {
            if (Exception_1.default.isOfType(ex, Exception_1.default.IllegalArgumentException)) {
                // good
            }
            else {
                assert.ok(false);
            }
        }
    });
    function matrixToString(result) {
        assert.strictEqual(1, result.getHeight());
        var builder = new StringBuilder_1.default(); // result.getWidth())
        for (var i = 0; i < result.getWidth(); i++) {
            builder.append(result.get(i, 0) ? '1' : '0');
        }
        return builder.toString();
    }
    function testXOR(dataMatrix, flipMatrix, expectedMatrix) {
        var matrix = dataMatrix.clone();
        matrix.xor(flipMatrix);
        assert.strictEqual(matrix.equals(expectedMatrix), true);
    }
    function testRotate180(width /*int*/, height /*int*/) {
        var input = getInput(width, height);
        input.rotate180();
        var expected = getExpected(width, height);
        for (var y = 0; y < height; y++) {
            for (var x = 0; x < width; x++) {
                assert.strictEqual(input.get(x, y), expected.get(x, y), '(' + x + ',' + y + ')');
            }
        }
    }
    function getExpected(width /*int*/, height /*int*/) {
        var result = new BitMatrix_1.default(width, height);
        for (var i = 0; i < BIT_MATRIX_POINTS.length; i += 2) {
            result.set(width - 1 - BIT_MATRIX_POINTS[i], height - 1 - BIT_MATRIX_POINTS[i + 1]);
        }
        return result;
    }
    function getInput(width /*int*/, height /*int*/) {
        var result = new BitMatrix_1.default(width, height);
        for (var i = 0; i < BIT_MATRIX_POINTS.length; i += 2) {
            result.set(BIT_MATRIX_POINTS[i], BIT_MATRIX_POINTS[i + 1]);
        }
        return result;
    }
});
//# sourceMappingURL=BitMatrix.spec.js.map