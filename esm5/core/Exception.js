"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Exception = /** @class */ (function () {
    function Exception(type, message) {
        if (type === void 0) { type = null; }
        this.type = type;
        this.message = message;
    }
    Exception.prototype.getType = function () {
        return this.type;
    };
    Exception.prototype.getMessage = function () {
        return this.message;
    };
    Exception.isOfType = function (ex, type) {
        return ex.type === type;
    };
    Exception.IllegalArgumentException = 'IllegalArgumentException';
    Exception.NotFoundException = 'NotFoundException';
    Exception.ArithmeticException = 'ArithmeticException';
    Exception.FormatException = 'FormatException';
    Exception.ChecksumException = 'ChecksumException';
    Exception.WriterException = 'WriterException';
    Exception.IllegalStateException = 'IllegalStateException';
    Exception.UnsupportedOperationException = 'UnsupportedOperationException';
    Exception.ReedSolomonException = 'ReedSolomonException';
    Exception.ArgumentException = 'ArgumentException';
    Exception.ReaderException = 'ReaderException';
    return Exception;
}());
exports.default = Exception;
//# sourceMappingURL=Exception.js.map