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
var Version_1 = require("./../../../../core/qrcode/decoder/Version");
var Mode_1 = require("./../../../../core/qrcode/decoder/Mode");
/**
 * @author Sean Owen
 */
describe('Mode', function () {
    it('testForBits', function () {
        assert.strictEqual(Mode_1.default.TERMINATOR.equals(Mode_1.default.forBits(0x00)), true);
        assert.strictEqual(Mode_1.default.NUMERIC.equals(Mode_1.default.forBits(0x01)), true);
        assert.strictEqual(Mode_1.default.ALPHANUMERIC.equals(Mode_1.default.forBits(0x02)), true);
        assert.strictEqual(Mode_1.default.BYTE.equals(Mode_1.default.forBits(0x04)), true);
        assert.strictEqual(Mode_1.default.KANJI.equals(Mode_1.default.forBits(0x08)), true);
        try {
            Mode_1.default.forBits(0x10);
            assert.ok(false, 'Should have thrown an exception');
        }
        catch (iae /*IllegalArgumentException*/) {
            // good
        }
    });
    it('testCharacterCount', function () {
        // Spot check a few values
        assert.strictEqual(Mode_1.default.NUMERIC.getCharacterCountBits(Version_1.default.getVersionForNumber(5)), 10);
        assert.strictEqual(Mode_1.default.NUMERIC.getCharacterCountBits(Version_1.default.getVersionForNumber(26)), 12);
        assert.strictEqual(Mode_1.default.NUMERIC.getCharacterCountBits(Version_1.default.getVersionForNumber(40)), 14);
        assert.strictEqual(Mode_1.default.ALPHANUMERIC.getCharacterCountBits(Version_1.default.getVersionForNumber(6)), 9);
        assert.strictEqual(Mode_1.default.BYTE.getCharacterCountBits(Version_1.default.getVersionForNumber(7)), 8);
        assert.strictEqual(Mode_1.default.KANJI.getCharacterCountBits(Version_1.default.getVersionForNumber(8)), 8);
    });
});
//# sourceMappingURL=Mode.spec.js.map