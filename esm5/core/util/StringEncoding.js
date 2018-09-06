"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CharacterSetECI_1 = require("./../common/CharacterSetECI");
var Exception_1 = require("./../Exception");
var StringEncoding = /** @class */ (function () {
    function StringEncoding() {
    }
    StringEncoding.decode = function (bytes, encoding) {
        var encodingString;
        if (typeof encoding === 'string') {
            encodingString = encoding;
        }
        else {
            encodingString = encoding.getName();
        }
        if (StringEncoding.isBrowser()) {
            // tslint:disable-next-line:no-string-literal
            var TextDecoderBrowser = window['TextDecoder'];
            // use TextEncoder if is available (should be in newer browsers)
            if (undefined !== TextDecoderBrowser) {
                // console.log(TextDecoderBrowser)
                return new TextDecoderBrowser(encoding).decode(bytes);
            }
            else {
                // fall back to minimal decoding
                return StringEncoding.decodeFallBack(bytes, encodingString);
            }
        }
        else {
            var TextDecoderFromTEClass = require('text-encoding').TextDecoder;
            return new TextDecoderFromTEClass(encodingString).decode(bytes);
        }
    };
    StringEncoding.encode = function (s, encoding) {
        var encodingString;
        if (typeof encoding === 'string') {
            encodingString = encoding;
        }
        else {
            encodingString = encoding.getName();
        }
        if (StringEncoding.isBrowser()) {
            // tslint:disable-next-line:no-string-literal
            var TextEncoderBrowser = window['TextEncoder'];
            // use TextEncoder if is available (should be in newer browsers)
            var ec = CharacterSetECI_1.default.getCharacterSetECIByName(encodingString);
            if (undefined !== TextEncoderBrowser) {
                // TODO: TextEncoder only supports utf-8 encoding as per specs
                return new TextEncoderBrowser(encoding).encode(s);
            }
            else {
                // fall back to minimal decoding
                return StringEncoding.encodeFallBack(s, encodingString);
            }
        }
        else {
            // Note: NONSTANDARD_allowLegacyEncoding is required for other encodings than UTF8
            // TextEncoder only encodes to UTF8 by default as specified by encoding.spec.whatwg.org
            var TextEncoderFromTEClass = require('text-encoding').TextEncoder;
            return new TextEncoderFromTEClass(encodingString, { NONSTANDARD_allowLegacyEncoding: true }).encode(s);
        }
    };
    StringEncoding.isBrowser = function () {
        return typeof window !== 'undefined' && ({}).toString.call(window) === '[object Window]';
    };
    StringEncoding.decodeFallBack = function (bytes, encoding) {
        var ec = CharacterSetECI_1.default.getCharacterSetECIByName(encoding);
        if (ec.equals(CharacterSetECI_1.default.UTF8) ||
            ec.equals(CharacterSetECI_1.default.ISO8859_1) ||
            ec.equals(CharacterSetECI_1.default.ASCII)) {
            var s = '';
            for (var i = 0, length_1 = bytes.length; i < length_1; i++) {
                var h = bytes[i].toString(16);
                if (h.length < 2) {
                    h = '0' + h;
                }
                s += '%' + h;
            }
            return decodeURIComponent(s);
        }
        else if (ec.equals(CharacterSetECI_1.default.UnicodeBigUnmarked)) {
            return String.fromCharCode.apply(null, new Uint16Array(bytes.buffer));
        }
        else {
            throw new Exception_1.default(Exception_1.default.UnsupportedOperationException, "encoding " + encoding + " not supported");
        }
    };
    StringEncoding.encodeFallBack = function (s, encoding) {
        // TODO: encode
        return null;
    };
    return StringEncoding;
}());
exports.default = StringEncoding;
//# sourceMappingURL=StringEncoding.js.map