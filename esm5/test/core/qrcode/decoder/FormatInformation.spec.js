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
var ErrorCorrectionLevel_1 = require("./../../../../core/qrcode/decoder/ErrorCorrectionLevel");
var FormatInformation_1 = require("./../../../../core/qrcode/decoder/FormatInformation");
/**
 * @author Sean Owen
 */
describe('FormatInformation', function () {
    var MASKED_TEST_FORMAT_INFO = 0x2BED;
    var UNMASKED_TEST_FORMAT_INFO = MASKED_TEST_FORMAT_INFO ^ 0x5412;
    it('testBitsDiffering', function () {
        assert.strictEqual(FormatInformation_1.default.numBitsDiffering(1, 1), 0);
        assert.strictEqual(FormatInformation_1.default.numBitsDiffering(0, 2), 1);
        assert.strictEqual(FormatInformation_1.default.numBitsDiffering(1, 2), 2);
        assert.strictEqual(FormatInformation_1.default.numBitsDiffering(-1, 0), 32);
    });
    it('testDecode', function () {
        // Normal case
        var expected = FormatInformation_1.default.decodeFormatInformation(MASKED_TEST_FORMAT_INFO, MASKED_TEST_FORMAT_INFO);
        assert.strictEqual(null !== expected, true);
        assert.strictEqual(expected.getDataMask(), /*(byte)*/ 0x07);
        assert.strictEqual(ErrorCorrectionLevel_1.default.Q.equals(expected.getErrorCorrectionLevel()), true);
        // where the code forgot the mask!
        assert.strictEqual(FormatInformation_1.default.decodeFormatInformation(UNMASKED_TEST_FORMAT_INFO, MASKED_TEST_FORMAT_INFO).equals(expected), true);
    });
    it('testDecodeWithBitDifference', function () {
        var expected = FormatInformation_1.default.decodeFormatInformation(MASKED_TEST_FORMAT_INFO, MASKED_TEST_FORMAT_INFO);
        // 1,2,3,4 bits difference
        assert.strictEqual(FormatInformation_1.default.decodeFormatInformation(MASKED_TEST_FORMAT_INFO ^ 0x01, MASKED_TEST_FORMAT_INFO ^ 0x01).equals(expected), true);
        assert.strictEqual(FormatInformation_1.default.decodeFormatInformation(MASKED_TEST_FORMAT_INFO ^ 0x03, MASKED_TEST_FORMAT_INFO ^ 0x03).equals(expected), true);
        assert.strictEqual(FormatInformation_1.default.decodeFormatInformation(MASKED_TEST_FORMAT_INFO ^ 0x07, MASKED_TEST_FORMAT_INFO ^ 0x07).equals(expected), true);
        assert.strictEqual(null === FormatInformation_1.default.decodeFormatInformation(MASKED_TEST_FORMAT_INFO ^ 0x0F, MASKED_TEST_FORMAT_INFO ^ 0x0F), true);
    });
    it('testDecodeWithMisread', function () {
        var expected = FormatInformation_1.default.decodeFormatInformation(MASKED_TEST_FORMAT_INFO, MASKED_TEST_FORMAT_INFO);
        assert.strictEqual(FormatInformation_1.default.decodeFormatInformation(MASKED_TEST_FORMAT_INFO ^ 0x03, MASKED_TEST_FORMAT_INFO ^ 0x0F).equals(expected), true);
    });
});
//# sourceMappingURL=FormatInformation.spec.js.map