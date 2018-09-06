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
/*package com.google.zxing.qrcode;*/
require("mocha");
var assert = require("assert");
var BarcodeFormat_1 = require("./../../../core/BarcodeFormat");
var EncodeHintType_1 = require("./../../../core/EncodeHintType");
var ErrorCorrectionLevel_1 = require("./../../../core/qrcode/decoder/ErrorCorrectionLevel");
var SharpImage_1 = require("./../util/SharpImage");
var QRCodeWriter_1 = require("./../../../core/qrcode/QRCodeWriter");
var path = require('path');
/*import javax.imageio.ImageIO;*/
/*import java.awt.image.BufferedImage;*/
/*import java.io.IOException;*/
/*import java.nio.file.Files;*/
/*import java.nio.file.Path;*/
/*import java.nio.file.Paths;*/
/*import java.util.EnumMap;*/
/*import java.util.Map;*/
/**
 * @author satorux@google.com (Satoru Takabayashi) - creator
 * @author dswitkin@google.com (Daniel Switkin) - ported and expanded from C++
 */
describe('QRCodeWriter', function () {
    var BASE_IMAGE_PATH = 'src/test/core/resources/golden/qrcode/';
    it('testQRCodeWriter', function () {
        // The QR should be multiplied up to fit, with extra padding if necessary
        var bigEnough = 256;
        var writer = new QRCodeWriter_1.default();
        var matrix = writer.encode('http://www.google.com/', BarcodeFormat_1.default.QR_CODE, bigEnough, bigEnough, null);
        assert.strictEqual(matrix !== null, true);
        assert.strictEqual(matrix.getWidth(), bigEnough);
        assert.strictEqual(matrix.getHeight(), bigEnough);
        // The QR will not fit in this size, so the matrix should come back bigger
        var tooSmall = 20;
        matrix = writer.encode('http://www.google.com/', BarcodeFormat_1.default.QR_CODE, tooSmall, tooSmall, null);
        assert.strictEqual(matrix !== null, true);
        assert.strictEqual(tooSmall < matrix.getWidth(), true);
        assert.strictEqual(tooSmall < matrix.getHeight(), true);
        // We should also be able to handle non-square requests by padding them
        var strangeWidth = 500;
        var strangeHeight = 100;
        matrix = writer.encode('http://www.google.com/', BarcodeFormat_1.default.QR_CODE, strangeWidth, strangeHeight, null);
        assert.strictEqual(matrix !== null, true);
        assert.strictEqual(matrix.getWidth(), strangeWidth);
        assert.strictEqual(matrix.getHeight(), strangeHeight);
    });
    function compareToGoldenFile(contents, ecLevel, resolution /*int*/, fileName) {
        var filePath = path.resolve(BASE_IMAGE_PATH, fileName);
        SharpImage_1.default.loadAsBitMatrix(filePath, function (err, goldenResult) {
            if (err) {
                assert.ok(false, err);
            }
            else {
                var hints = new Map();
                hints.set(EncodeHintType_1.default.ERROR_CORRECTION, ecLevel);
                var writer = new QRCodeWriter_1.default();
                var generatedResult = writer.encode(contents, BarcodeFormat_1.default.QR_CODE, resolution, resolution, hints);
                assert.strictEqual(generatedResult.getWidth(), resolution);
                assert.strictEqual(generatedResult.getHeight(), resolution);
                assert.strictEqual(generatedResult.equals(goldenResult), true);
            }
        });
    }
    // Golden images are generated with "qrcode_sample.cc". The images are checked with both eye balls
    // and cell phones. We expect pixel-perfect results, because the error correction level is known,
    // and the pixel dimensions matches exactly.
    it('testRegressionTest', function () {
        compareToGoldenFile('http://www.google.com/', ErrorCorrectionLevel_1.default.M, 99, 'renderer-test-01.png');
    });
});
//# sourceMappingURL=QRCodeWriter.spec.js.map