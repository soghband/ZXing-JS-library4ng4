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
var TestResult = /** @class */ (function () {
    function TestResult(mustPassCount /*int*/, tryHarderCount /*int*/, maxMisreads /*int*/, maxTryHarderMisreads /*int*/, rotation /*float*/) {
        this.mustPassCount = mustPassCount; /*int*/
        this.tryHarderCount = tryHarderCount; /*int*/
        this.maxMisreads = maxMisreads; /*int*/
        this.maxTryHarderMisreads = maxTryHarderMisreads; /*int*/
        this.rotation = rotation; /*float*/
    }
    TestResult.prototype.getMustPassCount = function () {
        return this.mustPassCount;
    };
    TestResult.prototype.getTryHarderCount = function () {
        return this.tryHarderCount;
    };
    TestResult.prototype.getMaxMisreads = function () {
        return this.maxMisreads;
    };
    TestResult.prototype.getMaxTryHarderMisreads = function () {
        return this.maxTryHarderMisreads;
    };
    TestResult.prototype.getRotation = function () {
        return this.rotation;
    };
    return TestResult;
}());
exports.default = TestResult;
//# sourceMappingURL=TestResult.js.map