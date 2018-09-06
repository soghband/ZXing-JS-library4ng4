"use strict";
/*
 * Copyright 2014 ZXing authors
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
/*package com.google.zxing.common.detector;*/
require("mocha");
var assert = require("assert");
var MathUtils_1 = require("./../../../../core/common/detector/MathUtils");
describe('MathUtils', function () {
    var EPSILON = 1.0E-8;
    it('testRound', function () {
        assert.strictEqual(MathUtils_1.default.round(-1.0), -1);
        assert.strictEqual(MathUtils_1.default.round(0.0), 0);
        assert.strictEqual(MathUtils_1.default.round(1.0), 1);
        assert.strictEqual(MathUtils_1.default.round(1.9), 2);
        assert.strictEqual(MathUtils_1.default.round(2.1), 2);
        assert.strictEqual(MathUtils_1.default.round(2.5), 3);
        assert.strictEqual(MathUtils_1.default.round(-1.9), -2);
        assert.strictEqual(MathUtils_1.default.round(-2.1), -2);
        assert.strictEqual(MathUtils_1.default.round(-2.5), -3); // This differs from Math.round()
        assert.strictEqual(MathUtils_1.default.round(Number.MAX_SAFE_INTEGER), Number.MAX_SAFE_INTEGER);
        assert.strictEqual(MathUtils_1.default.round(Number.MIN_SAFE_INTEGER), Number.MIN_SAFE_INTEGER);
        assert.strictEqual(MathUtils_1.default.round(Number.POSITIVE_INFINITY), Number.MAX_SAFE_INTEGER);
        assert.strictEqual(MathUtils_1.default.round(Number.NEGATIVE_INFINITY), Number.MIN_SAFE_INTEGER);
        assert.strictEqual(MathUtils_1.default.round(NaN), 0);
    });
    it('testDistance', function () {
        assert.strictEqual(Math.abs(MathUtils_1.default.distance(1.0, 2.0, 3.0, 4.0) - /*(float) */ Math.sqrt(8.0)) < EPSILON, true);
        assert.strictEqual(Math.abs(MathUtils_1.default.distance(1.0, 2.0, 1.0, 2.0) - 0.0) < EPSILON, true);
        assert.strictEqual(Math.abs(MathUtils_1.default.distance(1, 2, 3, 4) - /*(float) */ Math.sqrt(8.0)) < EPSILON, true);
        assert.strictEqual(Math.abs(MathUtils_1.default.distance(1, 2, 1, 2) - 0.0) < EPSILON, true);
    });
    it('testSum', function () {
        assert.strictEqual(MathUtils_1.default.sum(Int32Array.from([])), 0);
        assert.strictEqual(MathUtils_1.default.sum(Int32Array.from([1])), 1);
        assert.strictEqual(MathUtils_1.default.sum(Int32Array.from([1, 3])), 4);
        assert.strictEqual(MathUtils_1.default.sum(Int32Array.from([-1, 1])), 0);
    });
});
//# sourceMappingURL=MathUtils.spec.js.map