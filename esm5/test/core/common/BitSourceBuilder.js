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
/*import java.io.ByteArrayOutputStream;*/
/**
 * Class that lets one easily build an array of bytes by appending bits at a time.
 *
 * @author Sean Owen
 */
var BitSourceBuilder = /** @class */ (function () {
    function BitSourceBuilder() {
        this.output = new Array();
        this.nextByte = 0;
        this.bitsLeftInNextByte = 8;
    }
    BitSourceBuilder.prototype.write = function (value /*int*/, numBits /*int*/) {
        if (numBits <= this.bitsLeftInNextByte) {
            var nb = (this.nextByte << numBits) & 0xFFFFFFFF;
            this.nextByte = nb | value;
            this.bitsLeftInNextByte -= numBits;
            if (this.bitsLeftInNextByte === 0) {
                var byte = this.nextByte & 0xFF;
                this.output.push(byte);
                this.nextByte = 0;
                this.bitsLeftInNextByte = 8;
            }
        }
        else {
            var bitsToWriteNow = this.bitsLeftInNextByte;
            var numRestOfBits = numBits - bitsToWriteNow;
            var mask = 0xFF >> (8 - bitsToWriteNow);
            var valueToWriteNow = (value >>> numRestOfBits) & mask;
            this.write(valueToWriteNow, bitsToWriteNow);
            this.write(value, numRestOfBits);
        }
    };
    BitSourceBuilder.prototype.toByteArray = function () {
        if (this.bitsLeftInNextByte < 8) {
            this.write(0, this.bitsLeftInNextByte);
        }
        return Uint8Array.from(this.output);
    };
    return BitSourceBuilder;
}());
exports.default = BitSourceBuilder;
//# sourceMappingURL=BitSourceBuilder.js.map