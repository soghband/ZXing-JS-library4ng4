"use strict";
/*
 * Copyright 2009 ZXing authors
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
/*package com.google.zxing.qrcode;*/
require("mocha");
var BarcodeFormat_1 = require("./../../../core/BarcodeFormat");
var MultiFormatReader_1 = require("./../../../core/MultiFormatReader");
var AbstractBlackBox_1 = require("./../common/AbstractBlackBox");
/**
 * These tests are supplied by Tim Gernat and test finder pattern detection at small size and under
 * rotation, which was a weak spot.
 */
var QRCodeBlackBox7Spec = /** @class */ (function (_super) {
    __extends(QRCodeBlackBox7Spec, _super);
    function QRCodeBlackBox7Spec() {
        var _this = _super.call(this, 'src/test/core/resources/blackbox/qrcode-7', new MultiFormatReader_1.default(), BarcodeFormat_1.default.QR_CODE) || this;
        _this.addTest(4, 4, 0.0);
        _this.addTest(4, 4, 90.0);
        _this.addTest(4, 4, 180.0);
        _this.addTest(4, 4, 270.0);
        return _this;
    }
    return QRCodeBlackBox7Spec;
}(AbstractBlackBox_1.default));
exports.default = QRCodeBlackBox7Spec;
describe('QRCodeBlackBox.7', function () {
    it('testBlackBox', function (done) {
        var test = new QRCodeBlackBox7Spec();
        return test.testBlackBox(function () {
            done();
        });
    });
});
//# sourceMappingURL=QRCodeBlackBox.7.spec.js.map