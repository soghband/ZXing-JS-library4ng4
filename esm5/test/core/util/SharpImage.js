"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sharp = require("sharp");
var async = require("async");
var BitMatrix_1 = require("./../../../core/common/BitMatrix");
var SharpImage = /** @class */ (function () {
    function SharpImage(wrapper, buffer, width, height) {
        this.wrapper = wrapper;
        this.buffer = buffer;
        this.width = width;
        this.height = height;
    }
    SharpImage.loadWithRotations = function (path, rotations, done) {
        var wrapper = sharp(path).raw();
        wrapper.metadata(function (err, metadata) {
            if (err) {
                done(err);
            }
            else {
                if (metadata.channels !== 3 && metadata.space !== 'srgb') {
                    // console.log(`Image ${path} has ${metadata.channels} channels and will be transformed to sRGB`)
                    wrapper.toColorspace('sRGB');
                }
                var images_1 = new Map();
                async.eachSeries(rotations, function (rotation, callback) {
                    var wrapperClone = wrapper.clone();
                    wrapperClone.rotate(rotation).toBuffer(function (err, data, info) {
                        if (err) {
                            callback(err);
                        }
                        else {
                            var channels = info.channels;
                            var width = info.width;
                            var height = info.height;
                            var grayscaleBuffer = SharpImage.toGrayscaleBuffer(new Uint8ClampedArray(data.buffer), width, height, channels);
                            var image = new SharpImage(wrapperClone, grayscaleBuffer, width, height);
                            images_1.set(rotation, image);
                            callback();
                        }
                    });
                }, function (err) {
                    if (err) {
                        done(err);
                    }
                    else {
                        done(null, images_1);
                    }
                });
            }
        });
    };
    SharpImage.loadAsBitMatrix = function (path, done) {
        var wrapper = sharp(path).raw();
        wrapper.metadata(function (err, metadata) {
            if (err) {
                done(err);
            }
            else {
                if (metadata.channels !== 3) {
                    // console.log(`Image ${path} has ${metadata.channels} channels and will be transformed to sRGB`)
                    wrapper.toColorspace('sRGB');
                }
                wrapper.toBuffer(function (err, data, info) {
                    if (err) {
                        done(err);
                    }
                    else {
                        var channels = info.channels;
                        var width = info.width;
                        var height = info.height;
                        var grayscaleBuffer = SharpImage.toGrayscaleBuffer(new Uint8ClampedArray(data.buffer), width, height, channels);
                        // const image = new SharpImage(wrapper, grayscaleBuffer, info.width, info.height)
                        var matrix = new BitMatrix_1.default(width, height);
                        for (var y = 0; y < height; y++) {
                            for (var x = 0; x < width; x++) {
                                var pixel = grayscaleBuffer[y * width + x];
                                if (pixel <= 0x7F) {
                                    matrix.set(x, y);
                                }
                            }
                        }
                        done(null, matrix);
                    }
                });
            }
        });
    };
    SharpImage.toGrayscaleBuffer = function (imageBuffer, width, height, channels) {
        var grayscaleBuffer = new Uint8ClampedArray(width * height);
        for (var i = 0, j = 0, length_1 = imageBuffer.length; i < length_1; i += channels, j++) {
            var gray = undefined;
            if (channels > 3) {
                var alpha = imageBuffer[i + 3];
                // The color of fully-transparent pixels is irrelevant. They are often, technically, fully-transparent
                // black (0 alpha, and then 0 RGB). They are often used, of course as the "white" area in a
                // barcode image. Force any such pixel to be white:
                if (alpha === 0) {
                    gray = 0xFF;
                }
            }
            if (gray === undefined) {
                var pixelR = imageBuffer[i];
                var pixelG = imageBuffer[i + 1];
                var pixelB = imageBuffer[i + 2];
                // .299R + 0.587G + 0.114B (YUV/YIQ for PAL and NTSC),
                // (306*R) >> 10 is approximately equal to R*0.299, and so on.
                // 0x200 >> 10 is 0.5, it implements rounding.
                gray = (306 * pixelR +
                    601 * pixelG +
                    117 * pixelB +
                    0x200) >> 10;
            }
            grayscaleBuffer[j] = gray;
        }
        return grayscaleBuffer;
    };
    SharpImage.prototype.save = function (path) {
        this.wrapper.toFile(path, function (err) {
            console.error(err);
        });
    };
    SharpImage.prototype.getWidth = function () {
        return this.width;
    };
    SharpImage.prototype.getHeight = function () {
        return this.height;
    };
    // public crop(x: number, y: number, width: number, height: number) {
    //     this.jimpImage.crop(x, y, width, height)
    // }
    SharpImage.prototype.getRow = function (y, row) {
        var j = 0;
        for (var i = y * this.width, end = (y + 1) * this.width; i !== end; i++) {
            row[j++] = this.buffer[i];
        }
    };
    SharpImage.prototype.getMatrix = function () {
        return this.buffer;
    };
    SharpImage.getPixelIndex = function (width, height, x, y) {
        // round input
        x = Math.round(x);
        y = Math.round(y);
        var i = (width * y + x) << 2;
        // if out of bounds index is -1
        if (x < 0 || x > width)
            i = -1;
        if (y < 0 || y > height)
            i = -1;
        return i;
    };
    return SharpImage;
}());
exports.default = SharpImage;
//# sourceMappingURL=SharpImage.js.map