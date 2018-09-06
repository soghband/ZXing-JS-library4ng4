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
var BitArray_1 = require("./../../../../core/common/BitArray");
var ByteMatrix_1 = require("./../../../../core/qrcode/encoder/ByteMatrix");
var MatrixUtil_1 = require("./../../../../core/qrcode/encoder/MatrixUtil");
var ErrorCorrectionLevel_1 = require("./../../../../core/qrcode/decoder/ErrorCorrectionLevel");
var Version_1 = require("./../../../../core/qrcode/decoder/Version");
/**
 * @author satorux@google.com (Satoru Takabayashi) - creator
 * @author mysen@google.com (Chris Mysen) - ported from C++
 */
describe('MatrixUtil', function () {
    it('testToString', function () {
        var array = new ByteMatrix_1.default(3, 3);
        array.setNumber(0, 0, 0);
        array.setNumber(1, 0, 1);
        array.setNumber(2, 0, 0);
        array.setNumber(0, 1, 1);
        array.setNumber(1, 1, 0);
        array.setNumber(2, 1, 1);
        array.setNumber(0, 2, -1);
        array.setNumber(1, 2, -1);
        array.setNumber(2, 2, -1);
        var expected = ' 0 1 0\n' + ' 1 0 1\n' + '      \n';
        assert.strictEqual(array.toString(), expected);
    });
    it('testClearMatrix', function () {
        var matrix = new ByteMatrix_1.default(2, 2);
        MatrixUtil_1.default.clearMatrix(matrix);
        // TYPESCRIPTPORT: we use UintArray se changed here from -1 to 255
        assert.strictEqual(matrix.get(0, 0), 255);
        assert.strictEqual(matrix.get(1, 0), 255);
        assert.strictEqual(matrix.get(0, 1), 255);
        assert.strictEqual(matrix.get(1, 1), 255);
    });
    it('testEmbedBasicPatterns1', function () {
        // Version 1.
        var matrix = new ByteMatrix_1.default(21, 21);
        MatrixUtil_1.default.clearMatrix(matrix);
        MatrixUtil_1.default.embedBasicPatterns(Version_1.default.getVersionForNumber(1), matrix);
        var expected = ' 1 1 1 1 1 1 1 0           0 1 1 1 1 1 1 1\n' +
            ' 1 0 0 0 0 0 1 0           0 1 0 0 0 0 0 1\n' +
            ' 1 0 1 1 1 0 1 0           0 1 0 1 1 1 0 1\n' +
            ' 1 0 1 1 1 0 1 0           0 1 0 1 1 1 0 1\n' +
            ' 1 0 1 1 1 0 1 0           0 1 0 1 1 1 0 1\n' +
            ' 1 0 0 0 0 0 1 0           0 1 0 0 0 0 0 1\n' +
            ' 1 1 1 1 1 1 1 0 1 0 1 0 1 0 1 1 1 1 1 1 1\n' +
            ' 0 0 0 0 0 0 0 0           0 0 0 0 0 0 0 0\n' +
            '             1                            \n' +
            '             0                            \n' +
            '             1                            \n' +
            '             0                            \n' +
            '             1                            \n' +
            ' 0 0 0 0 0 0 0 0 1                        \n' +
            ' 1 1 1 1 1 1 1 0                          \n' +
            ' 1 0 0 0 0 0 1 0                          \n' +
            ' 1 0 1 1 1 0 1 0                          \n' +
            ' 1 0 1 1 1 0 1 0                          \n' +
            ' 1 0 1 1 1 0 1 0                          \n' +
            ' 1 0 0 0 0 0 1 0                          \n' +
            ' 1 1 1 1 1 1 1 0                          \n';
        assert.strictEqual(matrix.toString(), expected);
    });
    it('testEmbedBasicPatterns2', function () {
        // Version 2.  Position adjustment pattern should apppear at right
        // bottom corner.
        var matrix = new ByteMatrix_1.default(25, 25);
        MatrixUtil_1.default.clearMatrix(matrix);
        MatrixUtil_1.default.embedBasicPatterns(Version_1.default.getVersionForNumber(2), matrix);
        var expected = ' 1 1 1 1 1 1 1 0                   0 1 1 1 1 1 1 1\n' +
            ' 1 0 0 0 0 0 1 0                   0 1 0 0 0 0 0 1\n' +
            ' 1 0 1 1 1 0 1 0                   0 1 0 1 1 1 0 1\n' +
            ' 1 0 1 1 1 0 1 0                   0 1 0 1 1 1 0 1\n' +
            ' 1 0 1 1 1 0 1 0                   0 1 0 1 1 1 0 1\n' +
            ' 1 0 0 0 0 0 1 0                   0 1 0 0 0 0 0 1\n' +
            ' 1 1 1 1 1 1 1 0 1 0 1 0 1 0 1 0 1 0 1 1 1 1 1 1 1\n' +
            ' 0 0 0 0 0 0 0 0                   0 0 0 0 0 0 0 0\n' +
            '             1                                    \n' +
            '             0                                    \n' +
            '             1                                    \n' +
            '             0                                    \n' +
            '             1                                    \n' +
            '             0                                    \n' +
            '             1                                    \n' +
            '             0                                    \n' +
            '             1                   1 1 1 1 1        \n' +
            ' 0 0 0 0 0 0 0 0 1               1 0 0 0 1        \n' +
            ' 1 1 1 1 1 1 1 0                 1 0 1 0 1        \n' +
            ' 1 0 0 0 0 0 1 0                 1 0 0 0 1        \n' +
            ' 1 0 1 1 1 0 1 0                 1 1 1 1 1        \n' +
            ' 1 0 1 1 1 0 1 0                                  \n' +
            ' 1 0 1 1 1 0 1 0                                  \n' +
            ' 1 0 0 0 0 0 1 0                                  \n' +
            ' 1 1 1 1 1 1 1 0                                  \n';
        assert.strictEqual(matrix.toString(), expected);
    });
    it('testEmbedTypeInfo', function () {
        // Type info bits = 100000011001110.
        var matrix = new ByteMatrix_1.default(21, 21);
        MatrixUtil_1.default.clearMatrix(matrix);
        MatrixUtil_1.default.embedTypeInfo(ErrorCorrectionLevel_1.default.M, 5, matrix);
        var expected = '                 0                        \n' +
            '                 1                        \n' +
            '                 1                        \n' +
            '                 1                        \n' +
            '                 0                        \n' +
            '                 0                        \n' +
            '                                          \n' +
            '                 1                        \n' +
            ' 1 0 0 0 0 0   0 1         1 1 0 0 1 1 1 0\n' +
            '                                          \n' +
            '                                          \n' +
            '                                          \n' +
            '                                          \n' +
            '                                          \n' +
            '                 0                        \n' +
            '                 0                        \n' +
            '                 0                        \n' +
            '                 0                        \n' +
            '                 0                        \n' +
            '                 0                        \n' +
            '                 1                        \n';
        assert.strictEqual(matrix.toString(), expected);
    });
    it('testEmbedVersionInfo', function () {
        // Version info bits = 000111 110010 010100
        // Actually, version 7 QR Code has 45x45 matrix but we use 21x21 here
        // since 45x45 matrix is too big to depict.
        var matrix = new ByteMatrix_1.default(21, 21);
        MatrixUtil_1.default.clearMatrix(matrix);
        MatrixUtil_1.default.maybeEmbedVersionInfo(Version_1.default.getVersionForNumber(7), matrix);
        var expected = '                     0 0 1                \n' +
            '                     0 1 0                \n' +
            '                     0 1 0                \n' +
            '                     0 1 1                \n' +
            '                     1 1 1                \n' +
            '                     0 0 0                \n' +
            '                                          \n' +
            '                                          \n' +
            '                                          \n' +
            '                                          \n' +
            ' 0 0 0 0 1 0                              \n' +
            ' 0 1 1 1 1 0                              \n' +
            ' 1 0 0 1 1 0                              \n' +
            '                                          \n' +
            '                                          \n' +
            '                                          \n' +
            '                                          \n' +
            '                                          \n' +
            '                                          \n' +
            '                                          \n' +
            '                                          \n';
        assert.strictEqual(matrix.toString(), expected);
    });
    it('testEmbedDataBits', function () {
        // Cells other than basic patterns should be filled with zero.
        var matrix = new ByteMatrix_1.default(21, 21);
        MatrixUtil_1.default.clearMatrix(matrix);
        MatrixUtil_1.default.embedBasicPatterns(Version_1.default.getVersionForNumber(1), matrix);
        var bits = new BitArray_1.default();
        MatrixUtil_1.default.embedDataBits(bits, 255, matrix);
        var expected = ' 1 1 1 1 1 1 1 0 0 0 0 0 0 0 1 1 1 1 1 1 1\n' +
            ' 1 0 0 0 0 0 1 0 0 0 0 0 0 0 1 0 0 0 0 0 1\n' +
            ' 1 0 1 1 1 0 1 0 0 0 0 0 0 0 1 0 1 1 1 0 1\n' +
            ' 1 0 1 1 1 0 1 0 0 0 0 0 0 0 1 0 1 1 1 0 1\n' +
            ' 1 0 1 1 1 0 1 0 0 0 0 0 0 0 1 0 1 1 1 0 1\n' +
            ' 1 0 0 0 0 0 1 0 0 0 0 0 0 0 1 0 0 0 0 0 1\n' +
            ' 1 1 1 1 1 1 1 0 1 0 1 0 1 0 1 1 1 1 1 1 1\n' +
            ' 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0\n' +
            ' 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0\n' +
            ' 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0\n' +
            ' 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0\n' +
            ' 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0\n' +
            ' 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0\n' +
            ' 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0\n' +
            ' 1 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0\n' +
            ' 1 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0\n' +
            ' 1 0 1 1 1 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0\n' +
            ' 1 0 1 1 1 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0\n' +
            ' 1 0 1 1 1 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0\n' +
            ' 1 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0\n' +
            ' 1 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0\n';
        assert.strictEqual(matrix.toString(), expected);
    });
    it('testBuildMatrix', function () {
        // From http://www.swetake.com/qr/qr7.html
        var bytes = Uint16Array.from([32, 65, 205, 69, 41, 220, 46, 128, 236,
            42, 159, 74, 221, 244, 169, 239, 150, 138,
            70, 237, 85, 224, 96, 74, 219, 61]);
        var bits = new BitArray_1.default();
        for (var i = 0, length_1 = bytes.length; i !== length_1; i++) {
            var c = bytes[i];
            bits.appendBits(c, 8);
        }
        var matrix = new ByteMatrix_1.default(21, 21);
        MatrixUtil_1.default.buildMatrix(bits, ErrorCorrectionLevel_1.default.H, Version_1.default.getVersionForNumber(1), // Version 1
        3, // Mask pattern 3
        matrix);
        var expected = ' 1 1 1 1 1 1 1 0 0 1 1 0 0 0 1 1 1 1 1 1 1\n' +
            ' 1 0 0 0 0 0 1 0 0 0 0 0 0 0 1 0 0 0 0 0 1\n' +
            ' 1 0 1 1 1 0 1 0 0 0 0 1 0 0 1 0 1 1 1 0 1\n' +
            ' 1 0 1 1 1 0 1 0 0 1 1 0 0 0 1 0 1 1 1 0 1\n' +
            ' 1 0 1 1 1 0 1 0 1 1 0 0 1 0 1 0 1 1 1 0 1\n' +
            ' 1 0 0 0 0 0 1 0 0 0 1 1 1 0 1 0 0 0 0 0 1\n' +
            ' 1 1 1 1 1 1 1 0 1 0 1 0 1 0 1 1 1 1 1 1 1\n' +
            ' 0 0 0 0 0 0 0 0 1 1 0 1 1 0 0 0 0 0 0 0 0\n' +
            ' 0 0 1 1 0 0 1 1 1 0 0 1 1 1 1 0 1 0 0 0 0\n' +
            ' 1 0 1 0 1 0 0 0 0 0 1 1 1 0 0 1 0 1 1 1 0\n' +
            ' 1 1 1 1 0 1 1 0 1 0 1 1 1 0 0 1 1 1 0 1 0\n' +
            ' 1 0 1 0 1 1 0 1 1 1 0 0 1 1 1 0 0 1 0 1 0\n' +
            ' 0 0 1 0 0 1 1 1 0 0 0 0 0 0 1 0 1 1 1 1 1\n' +
            ' 0 0 0 0 0 0 0 0 1 1 0 1 0 0 0 0 0 1 0 1 1\n' +
            ' 1 1 1 1 1 1 1 0 1 1 1 1 0 0 0 0 1 0 1 1 0\n' +
            ' 1 0 0 0 0 0 1 0 0 0 0 1 0 1 1 1 0 0 0 0 0\n' +
            ' 1 0 1 1 1 0 1 0 0 1 0 0 1 1 0 0 1 0 0 1 1\n' +
            ' 1 0 1 1 1 0 1 0 1 1 0 1 0 0 0 0 0 1 1 1 0\n' +
            ' 1 0 1 1 1 0 1 0 1 1 1 1 0 0 0 0 1 1 1 0 0\n' +
            ' 1 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 1 0 1 0 0\n' +
            ' 1 1 1 1 1 1 1 0 0 0 1 1 1 1 1 0 1 0 0 1 0\n';
        assert.strictEqual(matrix.toString(), expected);
    });
    it('testFindMSBSet', function () {
        assert.strictEqual(MatrixUtil_1.default.findMSBSet(0), 0);
        assert.strictEqual(MatrixUtil_1.default.findMSBSet(1), 1);
        assert.strictEqual(MatrixUtil_1.default.findMSBSet(0x80), 8);
        assert.strictEqual(MatrixUtil_1.default.findMSBSet(0x80000000), 32);
    });
    it('testCalculateBCHCode', function () {
        // Encoding of type information.
        // From Appendix C in JISX0510:2004 (p 65)
        assert.strictEqual(MatrixUtil_1.default.calculateBCHCode(5, 0x537), 0xdc);
        // From http://www.swetake.com/qr/qr6.html
        assert.strictEqual(MatrixUtil_1.default.calculateBCHCode(0x13, 0x537), 0x1c2);
        // From http://www.swetake.com/qr/qr11.html
        assert.strictEqual(MatrixUtil_1.default.calculateBCHCode(0x1b, 0x537), 0x214);
        // Encoding of version information.
        // From Appendix D in JISX0510:2004 (p 68)
        assert.strictEqual(MatrixUtil_1.default.calculateBCHCode(7, 0x1f25), 0xc94);
        assert.strictEqual(MatrixUtil_1.default.calculateBCHCode(8, 0x1f25), 0x5bc);
        assert.strictEqual(MatrixUtil_1.default.calculateBCHCode(9, 0x1f25), 0xa99);
        assert.strictEqual(MatrixUtil_1.default.calculateBCHCode(10, 0x1f25), 0x4d3);
        assert.strictEqual(MatrixUtil_1.default.calculateBCHCode(20, 0x1f25), 0x9a6);
        assert.strictEqual(MatrixUtil_1.default.calculateBCHCode(30, 0x1f25), 0xd75);
        assert.strictEqual(MatrixUtil_1.default.calculateBCHCode(40, 0x1f25), 0xc69);
    });
    // We don't test a lot of cases in this function since we've already
    // tested them in TEST(calculateBCHCode).
    it('testMakeVersionInfoBits', function () {
        // From Appendix D in JISX0510:2004 (p 68)
        var bits = new BitArray_1.default();
        MatrixUtil_1.default.makeVersionInfoBits(Version_1.default.getVersionForNumber(7), bits);
        assert.strictEqual(bits.toString(), ' ...XXXXX ..X..X.X ..');
    });
    // We don't test a lot of cases in this function since we've already
    // tested them in TEST(calculateBCHCode).
    it('testMakeTypeInfoInfoBits', function () {
        // From Appendix C in JISX0510:2004 (p 65)
        var bits = new BitArray_1.default();
        MatrixUtil_1.default.makeTypeInfoBits(ErrorCorrectionLevel_1.default.M, 5, bits);
        assert.strictEqual(bits.toString(), ' X......X X..XXX.');
    });
});
//# sourceMappingURL=MatrixUtil.spec.js.map