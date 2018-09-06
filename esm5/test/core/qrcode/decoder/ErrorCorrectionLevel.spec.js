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
/**
 * @author Sean Owen
 */
describe('ErrorCorrectionLevel', function () {
    it('testForBits', function () {
        assert.strictEqual(ErrorCorrectionLevel_1.default.M.equals(ErrorCorrectionLevel_1.default.forBits(0)), true);
        assert.strictEqual(ErrorCorrectionLevel_1.default.L.equals(ErrorCorrectionLevel_1.default.forBits(1)), true);
        assert.strictEqual(ErrorCorrectionLevel_1.default.H.equals(ErrorCorrectionLevel_1.default.forBits(2)), true);
        assert.strictEqual(ErrorCorrectionLevel_1.default.Q.equals(ErrorCorrectionLevel_1.default.forBits(3)), true);
        try {
            ErrorCorrectionLevel_1.default.forBits(4);
            assert.ok(false, 'Should have thrown an exception');
        }
        catch (iae /*IllegalArgumentException */) {
            // good
        }
    });
});
//# sourceMappingURL=ErrorCorrectionLevel.spec.js.map