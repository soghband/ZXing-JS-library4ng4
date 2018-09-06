"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var seedrandom = require("seedrandom");
var Random = /** @class */ (function () {
    function Random(seed) {
        this.r = seedrandom(seed);
    }
    Random.prototype.next = function (max) {
        return Math.floor(this.r() * max);
    };
    return Random;
}());
exports.default = Random;
//# sourceMappingURL=Random.js.map