"use strict";
/*
 * Copyright 2008 ZXing authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
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
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
// package com.google.zxing.oned;
require("mocha");
var BarcodeFormat_1 = require("./../../../core/BarcodeFormat");
var MultiFormatReader_1 = require("./../../../core/MultiFormatReader");
var AbstractBlackBox_1 = require("./../common/AbstractBlackBox");
/**
 * @author Sean Owen
 */
var ITFBlackBoxSpec = /** @class */ (function (_super) {
    __extends(ITFBlackBoxSpec, _super);
    function ITFBlackBoxSpec() {
        var _this = _super.call(this, 'src/test/core/resources/blackbox/itf', new MultiFormatReader_1.default(), BarcodeFormat_1.default.ITF) || this;
        _this.addTest(1, 1, 0.0);
        _this.addTest(1, 1, 180.0);
        return _this;
    }
    return ITFBlackBoxSpec;
}(AbstractBlackBox_1.default));
describe('ITFBlackBox', function () {
    it('testBlackBox', function (done) {
        var test = new ITFBlackBoxSpec();
        return test.testBlackBox(function () { return done(); });
    });
});
//# sourceMappingURL=ITFBlackBox.spec.js.map