"use strict";
/*
 * Copyright 2009 ZXing authors
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
Object.defineProperty(exports, "__esModule", { value: true });
var BarcodeFormat_1 = require("./BarcodeFormat");
var QRCodeReader_1 = require("./qrcode/QRCodeReader");
var Exception_1 = require("./Exception");
var MultiFormatOneDReader_1 = require("./oned/MultiFormatOneDReader");
/*namespace com.google.zxing {*/
/**
 * MultiFormatReader is a convenience class and the main entry point into the library for most uses.
 * By default it attempts to decode all barcode formats that the library supports. Optionally, you
 * can provide a hints object to request different behavior, for example only decoding QR codes.
 *
 * @author Sean Owen
 * @author dswitkin@google.com (Daniel Switkin)
 */
var MultiFormatReader = /** @class */ (function () {
    function MultiFormatReader() {
    }
    /**
     * This version of decode honors the intent of Reader.decode(BinaryBitmap) in that it
     * passes null as a hint to the decoders. However, that makes it inefficient to call repeatedly.
     * Use setHints() followed by decodeWithState() for continuous scan applications.
     *
     * @param image The pixel data to decode
     * @return The contents of the image
     * @throws NotFoundException Any errors which occurred
     */
    /*@Override*/
    // public decode(image: BinaryBitmap): Result /*throws NotFoundException */ {
    //   setHints(null)
    //   return decodeInternal(image)
    // }
    /**
     * Decode an image using the hints provided. Does not honor existing state.
     *
     * @param image The pixel data to decode
     * @param hints The hints to use, clearing the previous state.
     * @return The contents of the image
     * @throws NotFoundException Any errors which occurred
     */
    /*@Override*/
    MultiFormatReader.prototype.decode = function (image, hints) {
        this.setHints(hints);
        return this.decodeInternal(image);
    };
    /**
     * Decode an image using the state set up by calling setHints() previously. Continuous scan
     * clients will get a <b>large</b> speed increase by using this instead of decode().
     *
     * @param image The pixel data to decode
     * @return The contents of the image
     * @throws NotFoundException Any errors which occurred
     */
    MultiFormatReader.prototype.decodeWithState = function (image) {
        // Make sure to set up the default state so we don't crash
        if (this.readers === null || this.readers === undefined) {
            this.setHints(null);
        }
        return this.decodeInternal(image);
    };
    /**
     * This method adds state to the MultiFormatReader. By setting the hints once, subsequent calls
     * to decodeWithState(image) can reuse the same set of readers without reallocating memory. This
     * is important for performance in continuous scan clients.
     *
     * @param hints The set of hints to use for subsequent calls to decode(image)
     */
    MultiFormatReader.prototype.setHints = function (hints) {
        this.hints = hints;
        var tryHarder = hints !== null && hints !== undefined && undefined !== hints.get(3 /* TRY_HARDER */);
        /*@SuppressWarnings("unchecked")*/
        var formats = hints === null || hints === undefined ? null : hints.get(2 /* POSSIBLE_FORMATS */);
        var readers = new Array();
        if (formats !== null && formats !== undefined) {
            var addOneDReader = formats.contains(BarcodeFormat_1.default.UPC_A) ||
                formats.contains(BarcodeFormat_1.default.UPC_E) ||
                formats.contains(BarcodeFormat_1.default.EAN_13) ||
                formats.contains(BarcodeFormat_1.default.EAN_8) ||
                formats.contains(BarcodeFormat_1.default.CODABAR) ||
                formats.contains(BarcodeFormat_1.default.CODE_39) ||
                formats.contains(BarcodeFormat_1.default.CODE_93) ||
                formats.contains(BarcodeFormat_1.default.CODE_128) ||
                formats.contains(BarcodeFormat_1.default.ITF) ||
                formats.contains(BarcodeFormat_1.default.RSS_14) ||
                formats.contains(BarcodeFormat_1.default.RSS_EXPANDED);
            // Put 1D readers upfront in "normal" mode
            // TYPESCRIPTPORT: TODO: uncomment below as they are ported
            if (addOneDReader && !tryHarder) {
                readers.push(new MultiFormatOneDReader_1.default(hints));
            }
            if (formats.contains(BarcodeFormat_1.default.QR_CODE)) {
                readers.push(new QRCodeReader_1.default());
            }
            // if (formats.contains(BarcodeFormat.DATA_MATRIX)) {
            //   readers.push(new DataMatrixReader())
            // }
            // if (formats.contains(BarcodeFormat.AZTEC)) {
            //   readers.push(new AztecReader())
            // }
            // if (formats.contains(BarcodeFormat.PDF_417)) {
            //    readers.push(new PDF417Reader())
            // }
            // if (formats.contains(BarcodeFormat.MAXICODE)) {
            //    readers.push(new MaxiCodeReader())
            // }
            // At end in "try harder" mode
            if (addOneDReader && tryHarder) {
                readers.push(new MultiFormatOneDReader_1.default(hints));
            }
        }
        if (readers.length === 0) {
            if (!tryHarder) {
                readers.push(new MultiFormatOneDReader_1.default(hints));
            }
            readers.push(new QRCodeReader_1.default());
            // readers.push(new DataMatrixReader())
            // readers.push(new AztecReader())
            // readers.push(new PDF417Reader())
            // readers.push(new MaxiCodeReader())
            if (tryHarder) {
                readers.push(new MultiFormatOneDReader_1.default(hints));
            }
        }
        this.readers = readers; // .toArray(new Reader[readers.size()])
    };
    /*@Override*/
    MultiFormatReader.prototype.reset = function () {
        if (this.readers !== null) {
            for (var i = 0, length_1 = this.readers.length; i !== length_1; i++) {
                var reader = this.readers[i];
                reader.reset();
            }
        }
    };
    MultiFormatReader.prototype.decodeInternal = function (image) {
        if (this.readers !== null) {
            for (var i = 0, length_2 = this.readers.length; i !== length_2; i++) {
                var reader = this.readers[i];
                try {
                    return reader.decode(image, this.hints);
                }
                catch (re /*ReaderException*/) {
                    // console.log(`Exception ${re.type} ${re.message}`)
                    if (re.type === 'ReaderException') {
                        continue;
                    }
                }
            }
        }
        throw new Exception_1.default(Exception_1.default.NotFoundException);
    };
    return MultiFormatReader;
}());
exports.default = MultiFormatReader;
//# sourceMappingURL=MultiFormatReader.js.map