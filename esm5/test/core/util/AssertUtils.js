"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AssertUtils = /** @class */ (function () {
    function AssertUtils() {
    }
    AssertUtils.typedArraysAreEqual = function (left, right, size) {
        if (undefined === size) {
            size = Math.max(left.length, right.length);
        }
        for (var i = 0; i < size; i++) {
            if (left[i] !== right[i]) {
                return false;
            }
        }
        return true;
    };
    return AssertUtils;
}());
exports.default = AssertUtils;
//# sourceMappingURL=AssertUtils.js.map