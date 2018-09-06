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
var ErrorCorrectionLevel_1 = require("./../../../../core/qrcode/decoder/ErrorCorrectionLevel");
var Mode_1 = require("./../../../../core/qrcode/decoder/Mode");
var Version_1 = require("./../../../../core/qrcode/decoder/Version");
var QRCode_1 = require("./../../../../core/qrcode/encoder/QRCode");
var ByteMatrix_1 = require("./../../../../core/qrcode/encoder/ByteMatrix");
/**
 * @author satorux@google.com (Satoru Takabayashi) - creator
 * @author mysen@google.com (Chris Mysen) - ported from C++
 */
describe('QRCode', function () {
    it('test', function () {
        var qrCode = new QRCode_1.default();
        // First, test simple setters and getters.
        // We use numbers of version 7-H.
        qrCode.setMode(Mode_1.default.BYTE);
        qrCode.setECLevel(ErrorCorrectionLevel_1.default.H);
        qrCode.setVersion(Version_1.default.getVersionForNumber(7));
        qrCode.setMaskPattern(3);
        assert.strictEqual(Mode_1.default.BYTE.equals(qrCode.getMode()), true);
        assert.strictEqual(ErrorCorrectionLevel_1.default.H.equals(qrCode.getECLevel()), true);
        assert.strictEqual(qrCode.getVersion().getVersionNumber(), 7);
        assert.strictEqual(qrCode.getMaskPattern(), 3);
        // Prepare the matrix.
        var matrix = new ByteMatrix_1.default(45, 45);
        // Just set bogus zero/one values.
        for (var y = 0; y < 45; ++y) {
            for (var x = 0; x < 45; ++x) {
                matrix.setNumber(x, y, (y + x) % 2);
            }
        }
        // Set the matrix.
        qrCode.setMatrix(matrix);
        assert.strictEqual(matrix.equals(qrCode.getMatrix()), true);
    });
    it('testToString1', function () {
        var qrCode = new QRCode_1.default();
        var expected = '<<\n' +
            ' mode: null\n' +
            ' ecLevel: null\n' +
            ' version: null\n' +
            ' maskPattern: -1\n' +
            ' matrix: null\n' +
            '>>\n';
        assert.strictEqual(qrCode.toString(), expected);
    });
    it('testToString2', function () {
        var qrCode = new QRCode_1.default();
        qrCode.setMode(Mode_1.default.BYTE);
        qrCode.setECLevel(ErrorCorrectionLevel_1.default.H);
        qrCode.setVersion(Version_1.default.getVersionForNumber(1));
        qrCode.setMaskPattern(3);
        var matrix = new ByteMatrix_1.default(21, 21);
        for (var y = 0; y < 21; ++y) {
            for (var x = 0; x < 21; ++x) {
                matrix.setNumber(x, y, (y + x) % 2);
            }
        }
        qrCode.setMatrix(matrix);
        var expected = '<<\n' +
            ' mode: BYTE\n' +
            ' ecLevel: H\n' +
            ' version: 1\n' +
            ' maskPattern: 3\n' +
            ' matrix:\n' +
            ' 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0\n' +
            ' 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1\n' +
            ' 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0\n' +
            ' 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1\n' +
            ' 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0\n' +
            ' 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1\n' +
            ' 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0\n' +
            ' 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1\n' +
            ' 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0\n' +
            ' 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1\n' +
            ' 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0\n' +
            ' 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1\n' +
            ' 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0\n' +
            ' 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1\n' +
            ' 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0\n' +
            ' 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1\n' +
            ' 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0\n' +
            ' 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1\n' +
            ' 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0\n' +
            ' 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1\n' +
            ' 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0\n' +
            '>>\n';
        assert.strictEqual(qrCode.toString(), expected);
    });
    it('testIsValidMaskPattern', function () {
        assert.strictEqual(QRCode_1.default.isValidMaskPattern(-1), false);
        assert.strictEqual(QRCode_1.default.isValidMaskPattern(0), true);
        assert.strictEqual(QRCode_1.default.isValidMaskPattern(7), true);
        assert.strictEqual(QRCode_1.default.isValidMaskPattern(8), false);
    });
});
//# sourceMappingURL=QRCode.spec.js.map