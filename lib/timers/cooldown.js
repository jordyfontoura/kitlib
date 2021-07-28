"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var clock_1 = __importDefault(require("./clock"));
var Cooldown = /** @class */ (function (_super) {
    __extends(Cooldown, _super);
    function Cooldown(time) {
        var _this = _super.call(this) || this;
        _this.reset = _this.track;
        _this.time = time;
        return _this;
    }
    Object.defineProperty(Cooldown.prototype, "ready", {
        get: function () {
            return this.elapsed >= this.time;
        },
        enumerable: false,
        configurable: true
    });
    Cooldown.prototype.active = function () {
        if (this.ready) {
            this.reset();
            return true;
        }
        return false;
    };
    return Cooldown;
}(clock_1.default));
exports.default = Cooldown;
//# sourceMappingURL=cooldown.js.map