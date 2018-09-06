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
/*package com.google.zxing.common;*/
var assert = require("assert");
var async = require("async");
var SharpImage_1 = require("./../util/SharpImage");
var SharpImageLuminanceSource_1 = require("./../SharpImageLuminanceSource");
var BinaryBitmap_1 = require("./../../../core/BinaryBitmap");
require("./../../../core/InvertedLuminanceSource");
var ResultMetadataType_1 = require("./../../../core/ResultMetadataType");
var TestResult_1 = require("./../common/TestResult");
var HybridBinarizer_1 = require("./../../../core/common/HybridBinarizer");
var StringEncoding_1 = require("./../../../core/util/StringEncoding");
var fs = require('fs');
var path = require('path');
/*import javax.imageio.ImageIO;*/
/*import java.awt.Graphics;*/
/*import java.awt.geom.AffineTransform;*/
/*import java.awt.geom.RectangularShape;*/
/*import java.awt.image.AffineTransformOp;*/
/*import java.awt.image.BufferedImage;*/
/*import java.awt.image.BufferedImageOp;*/
/*import java.io.BufferedReader;*/
/*import java.io.IOException;*/
/*import java.nio.charset.Charset;*/
/*import java.nio.charset.StandardCharsets;*/
/*import java.nio.file.DirectoryStream;*/
/*import java.nio.file.Files;*/
/*import java.nio.file.Path;*/
/*import java.nio.file.Paths;*/
/*import java.util.ArrayList;*/
/*import java.util.EnumMap;*/
/*import java.util.List;*/
/*import java.util.Map;*/
/*import java.util.Properties;*/
/*import java.util.logging.Logger;*/
/**
 * @author Sean Owen
 * @author dswitkin@google.com (Daniel Switkin)
 */
var AbstractBlackBoxSpec = /** @class */ (function () {
    function AbstractBlackBoxSpec(testBasePathSuffix, barcodeReader, expectedFormat) {
        this.barcodeReader = barcodeReader;
        this.expectedFormat = expectedFormat;
        this.testBase = AbstractBlackBoxSpec.buildTestBase(testBasePathSuffix);
        this.testResults = new Array();
    }
    AbstractBlackBoxSpec.buildTestBase = function (testBasePathSuffix) {
        var testBase = path.resolve(testBasePathSuffix);
        // TYPESCRIPTPORT: not applicable
        // if (!fs.existsSync(testBase)) {
        //   // try starting with 'core' since the test base is often given as the project root
        //   testBase = path.resolve("core", testBasePathSuffix)
        // }
        return testBase;
    };
    AbstractBlackBoxSpec.prototype.getTestBase = function () {
        return this.testBase;
    };
    AbstractBlackBoxSpec.prototype.addTest = function (mustPassCount /* int */, tryHarderCount /* int */, rotation /* float */) {
        this.addTestWithMax(mustPassCount, tryHarderCount, 0, 0, rotation);
    };
    /**
     * Adds a new test for the current directory of images.
     *
     * @param mustPassCount The number of images which must decode for the test to pass.
     * @param tryHarderCount The number of images which must pass using the try harder flag.
     * @param maxMisreads Maximum number of images which can fail due to successfully reading the wrong contents
     * @param maxTryHarderMisreads Maximum number of images which can fail due to successfully
     *                             reading the wrong contents using the try harder flag
     * @param rotation The rotation in degrees clockwise to use for this test.
     */
    AbstractBlackBoxSpec.prototype.addTestWithMax = function (mustPassCount /* int */, tryHarderCount /* int */, maxMisreads, maxTryHarderMisreads, rotation /* float */) {
        if (maxMisreads === void 0) { maxMisreads = 0; }
        if (maxTryHarderMisreads === void 0) { maxTryHarderMisreads = 0; }
        this.testResults.push(new TestResult_1.default(mustPassCount, tryHarderCount, maxMisreads, maxTryHarderMisreads, rotation));
    };
    AbstractBlackBoxSpec.prototype.walkDirectory = function (dirPath) {
        var me = this;
        var results = new Array();
        var dir = path.resolve(this.testBase, dirPath);
        var list = fs.readdirSync(dir);
        list.forEach(function (file) {
            file = path.join(dir, file);
            var stat = fs.statSync(file);
            if (stat && stat.isDirectory()) {
                results = results.concat(me.walkDirectory(file));
            }
            else {
                if (['.jpg', '.jpeg', '.gif', '.png'].indexOf(path.extname(file)) !== -1) {
                    results.push(file);
                }
            }
        });
        if (results.length === 0) {
            console.log("No files in folder " + dir);
        }
        return results;
    };
    AbstractBlackBoxSpec.prototype.getImageFiles = function () {
        assert.strictEqual(fs.existsSync(this.testBase), true, 'Please download and install test images, and run from the \'core\' directory');
        var paths = this.walkDirectory(this.testBase);
        return paths;
    };
    AbstractBlackBoxSpec.prototype.getReader = function () {
        return this.barcodeReader;
    };
    // This workaround is used because AbstractNegativeBlackBoxTestCase overrides this method but does
    // not return SummaryResults.
    AbstractBlackBoxSpec.prototype.testBlackBox = function (done) {
        this.testBlackBoxCountingResults(true, done);
    };
    /**
     * @throws IOException
     */
    AbstractBlackBoxSpec.prototype.testBlackBoxCountingResults = function (assertOnFailure, done) {
        var _this = this;
        assert.strictEqual(this.testResults.length > 0, true);
        var imageFiles = this.getImageFiles();
        var testCount = this.testResults.length;
        var passedCounts = new Int32Array(testCount); /*Int32Array(testCount)*/
        var misreadCounts = new Int32Array(testCount); /*Int32Array(testCount)*/
        var tryHarderCounts = new Int32Array(testCount); /*Int32Array(testCount)*/
        var tryHarderMisreadCounts = new Int32Array(testCount); /*Int32Array(testCount)*/
        var me = this;
        async.eachSeries(imageFiles, function (testImage, callback) {
            var rotations = [0, 90, 180, 270]; // TODO: take rotations from testResults input
            SharpImage_1.default.loadWithRotations(testImage, rotations, function (err, images) {
                console.log("Starting " + testImage);
                if (err) {
                    callback(err);
                }
                else {
                    var fileBaseName = path.basename(testImage, path.extname(testImage));
                    var expectedTextFile = path.resolve(_this.testBase, fileBaseName + '.txt');
                    var expectedText = void 0;
                    if (fs.existsSync(expectedTextFile)) {
                        expectedText = AbstractBlackBoxSpec.readTextFileAsString(expectedTextFile);
                    }
                    else {
                        expectedTextFile = path.resolve(fileBaseName + '.bin');
                        assert.strictEqual(fs.existsSync(expectedTextFile), true, 'result bin/text file should exists');
                        expectedText = AbstractBlackBoxSpec.readBinFileAsString(expectedTextFile);
                    }
                    var expectedMetadataFile = path.resolve(fileBaseName + '.metadata.txt');
                    var expectedMetadata = null;
                    if (fs.existsSync(expectedMetadataFile)) {
                        expectedMetadata = AbstractBlackBoxSpec.readTextFileAsMetadata(expectedMetadataFile);
                    }
                    for (var x = 0; x < testCount; x++) {
                        var rotation = _this.testResults[x].getRotation();
                        var rotatedImage = images.get(rotation);
                        var source = new SharpImageLuminanceSource_1.default(rotatedImage);
                        var bitmap = new BinaryBitmap_1.default(new HybridBinarizer_1.default(source));
                        try {
                            if (me.decode(bitmap, rotation, expectedText, expectedMetadata, false)) {
                                passedCounts[x]++;
                            }
                            else {
                                misreadCounts[x]++;
                            }
                        }
                        catch (e /*ReaderException*/) {
                            console.log("could not read at rotation " + rotation + " failed with " + e.type);
                        }
                        try {
                            if (me.decode(bitmap, rotation, expectedText, expectedMetadata, true)) {
                                tryHarderCounts[x]++;
                            }
                            else {
                                tryHarderMisreadCounts[x]++;
                            }
                        }
                        catch (e /*ReaderException*/) {
                            console.log("could not read at rotation " + rotation + " w/TH failed with " + e.type);
                        }
                    }
                    callback();
                }
            });
        }, function (err) {
            if (err) {
                assert.ok(false, err.toString());
            }
            else {
                // Print the results of all tests first
                var totalFound = 0;
                var totalMustPass = 0;
                var totalMisread = 0;
                var totalMaxMisread = 0;
                for (var x = 0, length_1 = me.testResults.length; x < length_1; x++) {
                    var testResult = me.testResults[x];
                    console.log("Rotation " + testResult.getRotation() + " degrees:");
                    console.log(" " + passedCounts[x] + " of " + imageFiles.length + " images passed (" + testResult.getMustPassCount() + " required)");
                    var failed = imageFiles.length - passedCounts[x];
                    console.log(" " + misreadCounts[x] + " failed due to misreads, " + (failed - misreadCounts[x]) + " not detected");
                    console.log(" " + tryHarderCounts[x] + " of " + imageFiles.length + " images passed with try harder (" + testResult.getTryHarderCount() + " required)");
                    failed = imageFiles.length - tryHarderCounts[x];
                    console.log(" " + tryHarderMisreadCounts[x] + " failed due to misreads, " + (failed - tryHarderMisreadCounts[x]) + " not detected");
                    totalFound += passedCounts[x] + tryHarderCounts[x];
                    totalMustPass += testResult.getMustPassCount() + testResult.getTryHarderCount();
                    totalMisread += misreadCounts[x] + tryHarderMisreadCounts[x];
                    totalMaxMisread += testResult.getMaxMisreads() + testResult.getMaxTryHarderMisreads();
                }
                var totalTests = imageFiles.length * testCount * 2;
                console.log("Decoded " + totalFound + " images out of " + totalTests + " (" + totalFound * 100 / totalTests + "%, " + totalMustPass + " required)");
                if (totalFound > totalMustPass) {
                    console.warn("+++ Test too lax by " + (totalFound - totalMustPass) + " images");
                }
                else if (totalFound < totalMustPass) {
                    console.error("--- Test failed by " + (totalMustPass - totalFound) + " images");
                }
                if (totalMisread < totalMaxMisread) {
                    console.warn("+++ Test expects too many misreads by " + (totalMaxMisread - totalMisread) + " images");
                }
                else if (totalMisread > totalMaxMisread) {
                    console.error("--- Test had too many misreads by " + (totalMisread - totalMaxMisread) + " images");
                }
                // Then run through again and assert if any failed
                if (assertOnFailure) {
                    for (var x = 0; x < testCount; x++) {
                        var testResult = me.testResults[x];
                        var label = 'Rotation ' + testResult.getRotation() + ' degrees: Too many images failed';
                        assert.strictEqual(passedCounts[x] >= testResult.getMustPassCount(), true, label);
                        assert.strictEqual(tryHarderCounts[x] >= testResult.getTryHarderCount(), true, 'Try harder, ' + label);
                        label = 'Rotation ' + testResult.getRotation() + ' degrees: Too many images misread';
                        assert.strictEqual(misreadCounts[x] <= testResult.getMaxMisreads(), true, label);
                        assert.strictEqual(tryHarderMisreadCounts[x] <= testResult.getMaxTryHarderMisreads(), true, 'Try harder, ' + label);
                    }
                }
            }
            done();
        });
    };
    /**
     * @throws ReaderException
     */
    AbstractBlackBoxSpec.prototype.decode = function (source, rotation /*float*/, expectedText, expectedMetadata, tryHarder) {
        var suffix = " (" + (tryHarder ? 'try harder, ' : '') + "rotation: " + rotation + ")";
        var hints = new Map();
        if (tryHarder) {
            hints.set(3 /* TRY_HARDER */, true);
        }
        // Try in 'pure' mode mostly to exercise PURE_BARCODE code paths for exceptions;
        // not expected to pass, generally
        var result = null;
        try {
            var pureHints = new Map(hints);
            pureHints.set(1 /* PURE_BARCODE */, true);
            result = this.barcodeReader.decode(source, pureHints);
        }
        catch (re /*ReaderException*/) {
            // continue
        }
        if (result === null) {
            result = this.barcodeReader.decode(source, hints);
        }
        if (this.expectedFormat !== result.getBarcodeFormat()) {
            console.warn("Format mismatch: expected '" + this.expectedFormat + "' but got '" + result.getBarcodeFormat() + "'" + suffix);
            return false;
        }
        var resultText = result.getText();
        // WORKAROUND: ignore new line diferences between systems
        // TODO: check if a real problem or only because test result is stored in a file with modified new line chars
        var expectedTextR = expectedText.replace(/\r\n/g, '\n');
        var resultTextR = resultText.replace(/\r\n/g, '\n');
        if (expectedTextR !== resultTextR) {
            var expectedTextHexCodes = AbstractBlackBoxSpec.toDebugHexStringCodes(expectedTextR);
            var resultTextHexCodes = AbstractBlackBoxSpec.toDebugHexStringCodes(resultTextR);
            console.warn("Content mismatch: expected '" + expectedTextR + "' (" + expectedTextHexCodes + ") but got '" + resultTextR + "'" + suffix + " (" + resultTextHexCodes + ")");
            return false;
        }
        var resultMetadata = result.getResultMetadata();
        if (null !== expectedMetadata && undefined !== expectedMetadata) {
            for (var key in expectedMetadata.keys()) {
                // const key: ResultMetadataType = ResultMetadataType.valueOf(metadatum.)
                var expectedValue = expectedMetadata.get(key);
                var keyType = AbstractBlackBoxSpec.valueOfResultMetadataTypeFromString(key);
                var actualValue = resultMetadata === null ? undefined : resultMetadata.get(keyType);
                if (expectedValue !== actualValue) {
                    console.warn("Metadata mismatch for key '" + key + "': expected '" + expectedValue + "' but got '" + actualValue + "'");
                    return false;
                }
            }
        }
        return true;
    };
    AbstractBlackBoxSpec.toDebugHexStringCodes = function (text) {
        var r = '';
        for (var i = 0, length_2 = text.length; i !== length_2; i++) {
            if (i > 0)
                r += ', ';
            r += '0x' + text.charCodeAt(i).toString(16).toUpperCase();
        }
        return r;
    };
    AbstractBlackBoxSpec.valueOfResultMetadataTypeFromString = function (value) {
        switch (value) {
            case 'OTHER': return ResultMetadataType_1.default.OTHER;
            case 'ORIENTATION': return ResultMetadataType_1.default.ORIENTATION;
            case 'BYTE_SEGMENTS': return ResultMetadataType_1.default.BYTE_SEGMENTS;
            case 'ERROR_CORRECTION_LEVEL': return ResultMetadataType_1.default.ERROR_CORRECTION_LEVEL;
            case 'ISSUE_NUMBER': return ResultMetadataType_1.default.ISSUE_NUMBER;
            case 'SUGGESTED_PRICE': return ResultMetadataType_1.default.SUGGESTED_PRICE;
            case 'POSSIBLE_COUNTRY': return ResultMetadataType_1.default.POSSIBLE_COUNTRY;
            case 'UPC_EAN_EXTENSION': return ResultMetadataType_1.default.UPC_EAN_EXTENSION;
            case 'PDF417_EXTRA_METADATA': return ResultMetadataType_1.default.PDF417_EXTRA_METADATA;
            case 'STRUCTURED_APPEND_SEQUENCE': return ResultMetadataType_1.default.STRUCTURED_APPEND_SEQUENCE;
            case 'STRUCTURED_APPEND_PARITY': return ResultMetadataType_1.default.STRUCTURED_APPEND_PARITY;
            default: throw value + ' not a ResultMetadataType';
        }
    };
    /**
     * @throws IOException
     */
    AbstractBlackBoxSpec.readTextFileAsString = function (file) {
        var stringContents = fs.readFileSync(file, { encoding: 'utf8' });
        if (stringContents.endsWith('\n')) {
            console.warn('contents: string of file ' + file + ' end with a newline. ' +
                'This may not be intended and cause a test failure');
        }
        return stringContents;
    };
    /**
     * @throws IOException
     */
    AbstractBlackBoxSpec.readBinFileAsString = function (file) {
        var bufferContents = fs.readFileSync(file);
        var stringContents = StringEncoding_1.default.decode(new Uint8Array(bufferContents), 'iso-8859-1');
        if (stringContents.endsWith('\n')) {
            console.warn('contents: string of file ' + file + ' end with a newline. ' +
                'This may not be intended and cause a test failure');
        }
        return stringContents;
    };
    /**
     * @throws IOException
     */
    AbstractBlackBoxSpec.readTextFileAsMetadata = function (file) {
        // TODO:
        return null;
    };
    return AbstractBlackBoxSpec;
}());
exports.default = AbstractBlackBoxSpec;
//# sourceMappingURL=AbstractBlackBox.js.map