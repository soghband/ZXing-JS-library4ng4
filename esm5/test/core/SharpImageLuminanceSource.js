"use strict";
/*
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
var LuminanceSource_1 = require("./../../core/LuminanceSource");
var InvertedLuminanceSource_1 = require("./../../core/InvertedLuminanceSource");
var Exception_1 = require("./../../core/Exception");
/**
 * This LuminanceSource implementation is meant for J2SE clients and our blackbox unit tests.
 *
 * @author dswitkin@google.com (Daniel Switkin)
 * @author Sean Owen
 * @author code@elektrowolle.de (Wolfgang Jung)
 */
var SharpImageLuminanceSource = /** @class */ (function (_super) {
    __extends(SharpImageLuminanceSource, _super);
    function SharpImageLuminanceSource(image) {
        var _this = _super.call(this, image.getWidth(), image.getHeight()) || this;
        _this.image = image;
        return _this;
        // if (undefined === width) {
        //   this.width = image.getWidth()
        // }
        // if (undefined === height) {
        //   this.height = image.getHeight()
        // }
        // const sourceWidth: number /*int*/ = image.getWidth()
        // const sourceHeight: number /*int*/ = image.getHeight()
        // if (left + width > sourceWidth || top + height > sourceHeight) {
        //   throw new Exception(Exception.IllegalArgumentException, "Crop rectangle does not fit within image data.")
        // }
        // if (left > 0 || width < sourceWidth || top > 0 || height < sourceHeight) {
        //   image.crop(left, top, width, height)
        // }
        // image.grayscale()
    }
    SharpImageLuminanceSource.prototype.getRow = function (y /*int*/, row) {
        if (y < 0 || y >= this.image.getHeight()) {
            throw new Exception_1.default(Exception_1.default.IllegalArgumentException, 'Requested row is outside the image: ' + y);
        }
        var width = this.image.getWidth();
        if (row === null || row.length < width) {
            row = new Uint8ClampedArray(width); /*Int8Array(width)*/
        }
        // The underlying raster of image consists of bytes with the luminance values
        this.image.getRow(y, row);
        return row;
    };
    SharpImageLuminanceSource.prototype.getMatrix = function () {
        return this.image.getMatrix();
    };
    SharpImageLuminanceSource.prototype.isCropSupported = function () {
        return true;
    };
    SharpImageLuminanceSource.prototype.crop = function (left /*int*/, top /*int*/, width /*int*/, height /*int*/) {
        this.crop(left, top, width, height);
        return this;
    };
    /**
     * This is always true, since the image is a gray-scale image.
     *
     * @return true
     */
    SharpImageLuminanceSource.prototype.isRotateSupported = function () {
        return true;
    };
    SharpImageLuminanceSource.prototype.rotateCounterClockwise = function () {
        // this.image.rotate(-90)
        // TYPESCRIPTPORT: not used for tests, see AbstractBlackBox.spec, SharpImage.loadWithRotations
        return this;
    };
    SharpImageLuminanceSource.prototype.rotateCounterClockwise45 = function () {
        // this.image.rotate(-45)
        // TYPESCRIPTPORT: not used for tests, see AbstractBlackBox.spec, SharpImage.loadWithRotations
        return this;
    };
    SharpImageLuminanceSource.prototype.invert = function () {
        return new InvertedLuminanceSource_1.default(this);
    };
    return SharpImageLuminanceSource;
}(LuminanceSource_1.default));
exports.default = SharpImageLuminanceSource;
//# sourceMappingURL=SharpImageLuminanceSource.js.map