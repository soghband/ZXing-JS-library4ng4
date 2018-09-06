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
/*package com.google.zxing.qrcode.decoder;*/
require("mocha");
var assert = require("assert");
var ErrorCorrectionLevel_1 = require("./../../../../core/qrcode/decoder/ErrorCorrectionLevel");
var Version_1 = require("./../../../../core/qrcode/decoder/Version");
/**
 * @author Sean Owen
 */
describe('Version', function () {
    it('testVersionForNumber', function () {
        try {
            Version_1.default.getVersionForNumber(0);
            assert.ok(false, 'Should have thrown an exception');
        }
        catch (iae /*IllegalArgumentException */) {
            // good
        }
        for (var i = 1; i <= 40; i++) {
            checkVersion(Version_1.default.getVersionForNumber(i), i, 4 * i + 17);
        }
    });
    function checkVersion(version, versionNumber /*int*/, dimension /*int*/) {
        assert.strictEqual(null !== version, true);
        assert.strictEqual(version.getVersionNumber(), versionNumber);
        assert.strictEqual(null !== version.getAlignmentPatternCenters(), true);
        if (versionNumber > 1) {
            assert.strictEqual(version.getAlignmentPatternCenters().length > 0, true);
        }
        assert.strictEqual(version.getDimensionForVersion(), dimension);
        assert.strictEqual(null !== version.getECBlocksForLevel(ErrorCorrectionLevel_1.default.H), true);
        assert.strictEqual(null !== version.getECBlocksForLevel(ErrorCorrectionLevel_1.default.L), true);
        assert.strictEqual(null !== version.getECBlocksForLevel(ErrorCorrectionLevel_1.default.M), true);
        assert.strictEqual(null !== version.getECBlocksForLevel(ErrorCorrectionLevel_1.default.Q), true);
        assert.strictEqual(null !== version.buildFunctionPattern(), true);
    }
    it('testGetProvisionalVersionForDimension', function () {
        for (var i = 1; i <= 40; i++) {
            assert.strictEqual(Version_1.default.getProvisionalVersionForDimension(4 * i + 17).getVersionNumber(), i);
        }
    });
    it('testDecodeVersionInformation', function () {
        // Spot check
        doTestVersion(7, 0x07C94);
        doTestVersion(12, 0x0C762);
        doTestVersion(17, 0x1145D);
        doTestVersion(22, 0x168C9);
        doTestVersion(27, 0x1B08E);
        doTestVersion(32, 0x209D5);
    });
    function doTestVersion(expectedVersion /*int*/, mask /*int*/) {
        var version = Version_1.default.decodeVersionInformation(mask);
        assert.strictEqual(null !== version, true);
        assert.strictEqual(version.getVersionNumber(), expectedVersion);
    }
});
//# sourceMappingURL=Version.spec.js.map