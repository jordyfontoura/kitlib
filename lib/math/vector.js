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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vector3D = exports.Vector2DInt = exports.Vector2D = void 0;
var object_hash_1 = __importDefault(require("object-hash"));
var lazy_1 = require("../gen/decorators/lazy");
var clamp_1 = require("./clamp");
var random_1 = __importDefault(require("./random"));
var Vector2D = /** @class */ (function () {
    function Vector2D(x, y) {
        if (x === void 0) { x = 0; }
        this[0] = x;
        this[1] = y !== null && y !== void 0 ? y : x;
    }
    Object.defineProperty(Vector2D, "left", {
        get: function () {
            return new Vector2D(-1, 0);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Vector2D, "right", {
        get: function () {
            return new Vector2D(-1, 0);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Vector2D, "up", {
        get: function () {
            return new Vector2D(-1, 0);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Vector2D, "down", {
        get: function () {
            return new Vector2D(-1, 0);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Vector2D.prototype, "hash", {
        get: function () {
            return object_hash_1.default([this[0], this[1]], { algorithm: 'md5' });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Vector2D.prototype, "Vector3D", {
        get: function () {
            return new Vector3D(this[0], this[1], 0);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Vector2D.prototype, "Vector2DInt", {
        get: function () {
            return new Vector2DInt(this[0], this[1]);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Vector2D.prototype, "Array", {
        get: function () {
            return [this[0], this[1]];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Vector2D.prototype, "x", {
        get: function () {
            return this[0];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Vector2D.prototype, "y", {
        get: function () {
            return this[1];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Vector2D.prototype, "sqrMagnitude", {
        get: function () {
            return Math.pow(this.x, 2) + Math.pow(this.y, 2);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Vector2D.prototype, "magnitude", {
        get: function () {
            return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Vector2D.prototype, "normalized", {
        get: function () {
            var magnitude = this.magnitude;
            return new Vector2D(this[0] / magnitude, this[1] / magnitude);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Vector2D.prototype, "abs", {
        get: function () {
            return this.apply(Math.round);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Vector2D.prototype, "min", {
        get: function () {
            return Math.min(this[0], this[1]);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Vector2D.prototype, "max", {
        get: function () {
            return Math.max(this[0], this[1]);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Vector2D.prototype, "ceil", {
        get: function () {
            return this.apply(Math.ceil);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Vector2D.prototype, "round", {
        get: function () {
            return this.apply(Math.round);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Vector2D.prototype, "floor", {
        get: function () {
            return this.apply(Math.floor);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Vector2D.prototype, "random", {
        /** Retorna uma direção randomica com magnitude 1 */
        get: function () {
            return new Vector2D(0, 1).rotated(random_1.default.number() * Math.PI * 2);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Vector2D.prototype, "neg", {
        get: function () {
            return this.negative;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Vector2D.prototype, "negative", {
        get: function () {
            return this.apply(function (x) { return -x; });
        },
        enumerable: false,
        configurable: true
    });
    Vector2D.prototype.angle = function (other) {
        var angle = 0;
        if (other) {
            angle = Math.atan2(other[0], other[1]) - Math.atan2(this.y, this.x);
        }
        else {
            angle = Math.atan2(this.y, this.x);
        }
        if (angle > Math.PI) {
            angle -= 2 * Math.PI;
        }
        else if (angle <= -Math.PI) {
            angle += 2 * Math.PI;
        }
        return angle;
    };
    Vector2D.prototype.changed = function (props) {
        var _a, _b;
        return new Vector2D((_a = props.x) !== null && _a !== void 0 ? _a : this[0], (_b = props.y) !== null && _b !== void 0 ? _b : this[1]);
    };
    Vector2D.prototype.add = function (other, y) {
        if (typeof other === 'number') {
            if (y !== undefined) {
                return new Vector2D(this[0] + other, this[1] + y);
            }
            return new Vector2D(this[0] + other, this[1] + other);
        }
        return new Vector2D(this[0] + other[0], this[1] + other[1]);
    };
    Vector2D.prototype.sub = function (other, y) {
        if (typeof other === 'number') {
            if (y !== undefined) {
                return new Vector2D(this[0] - other, this[1] - y);
            }
            return new Vector2D(this[0] - other, this[1] - other);
        }
        return new Vector2D(this[0] - other[0], this[1] - other[1]);
    };
    Vector2D.prototype.isub = function (other, y) {
        if (typeof other === 'number') {
            if (y !== undefined) {
                return new Vector2D(other - this[0], y - this[1]);
            }
            return new Vector2D(other - this[0], other - this[1]);
        }
        return new Vector2D(other[0] - this[0], other[1] - this[1]);
    };
    Vector2D.prototype.mul = function (other, y) {
        if (typeof other === 'number') {
            if (y !== undefined) {
                return new Vector2D(this[0] * other, this[1] * y);
            }
            return new Vector2D(this[0] * other, this[1] * other);
        }
        return new Vector2D(this[0] * other[0], this[1] * other[1]);
    };
    Vector2D.prototype.div = function (other, y) {
        if (typeof other === 'number') {
            if (y !== undefined) {
                return new Vector2D(this[0] / other, this[1] / y);
            }
            return new Vector2D(this[0] / other, this[1] / other);
        }
        return new Vector2D(this[0] / other[0], this[1] / other[1]);
    };
    Vector2D.prototype.idiv = function (other, y) {
        if (typeof other === 'number') {
            if (y !== undefined) {
                return new Vector2D(other / this[0], y / this[1]);
            }
            return new Vector2D(other / this[0], other / this[1]);
        }
        return new Vector2D(other[0] / this[0], other[1] / this[1]);
    };
    Vector2D.prototype.scalar = function (other, y) {
        if (typeof other === 'number') {
            if (y !== undefined) {
                return this[0] * other + this[1] * y;
            }
            return new Vector2D(this[0] * other, this[1] * other);
        }
        return this[0] * other[0] + this[1] * other[1];
    };
    /**
     *
     * @param on
     * @param ortogonal
     * @copyright https://pt.wikipedia.org/wiki/Proje%C3%A7%C3%A3o_de_um_vetor
     * @returns
     */
    Vector2D.prototype.project = function (on, ortogonal) {
        if (ortogonal === void 0) { ortogonal = false; }
        if (ortogonal) {
            return this.sub(on.mul(this.scalar(on) / on.sqrMagnitude));
        }
        return on.mul(this.scalar(on) / on.sqrMagnitude);
    };
    Vector2D.prototype.distanceTo = function (other, y) {
        return this.sub(other, y).magnitude;
    };
    Vector2D.prototype.cross = function (other, y, z) {
        if (typeof other === 'number') {
            if (y !== undefined) {
                if (z !== undefined) {
                    return new Vector3D(this[1] * z, -this[0] * z, this[0] * y - this[1] * other);
                }
                return new Vector3D(0, 0, this[0] * y - this[1] * other);
            }
            return new Vector3D(this[1] * other, -this[0] * other, this[0] * other - this[1] * other);
        }
        if (other instanceof Vector2D) {
            return new Vector3D(0, 0, this[0] * other[1] - this[1] * other[0]);
        }
        return new Vector3D(this[1] * other[2], -this[0] * other[2], this[0] * other[1] - this[1] * other[0]);
    };
    Vector2D.prototype.scaled = function (size) {
        return this.normalized.mul(size);
    };
    Vector2D.prototype.rotated = function (value, theta) {
        if (theta === void 0) { theta = 0; }
        if (typeof value === 'number') {
            var sen = Math.sin(value);
            var cos = Math.cos(value);
            return new Vector2D(this[0] * cos + this[1] * sen, this[1] * cos - this[0] * sen);
        }
        if (theta === 0) {
            return this;
        }
        return this.sub(value).rotated(theta).add(value);
    };
    Vector2D.prototype.clamp = function (min, max) {
        return new Vector2D(clamp_1.clamp(min[0], max[0], this[0]), clamp_1.clamp(min[1], max[1], this[1]));
    };
    Vector2D.prototype.clampLength = function (min, max) {
        return this.magnitude < min
            ? this.normalized.mul(min)
            : this.magnitude < max
                ? this
                : this.normalized.mul(max);
    };
    Vector2D.prototype.clampAngle = function (min, max) {
        var angle = this.angle();
        return angle < min
            ? this.rotated(angle - min)
            : angle < max
                ? this
                : this.rotated(angle - max);
    };
    Vector2D.prototype.lerp = function (vector, to, alpha) {
        if (typeof to === 'number') {
            return new Vector2D(to * (vector[0] - this[0]) + this[0], to * (vector[1] - this[1]) + this[1]);
        }
        if (alpha === undefined) {
            alpha = 0;
        }
        return new Vector2D(alpha * (to[0] - vector[0]) + vector[0], alpha * (to[1] - vector[1]) + vector[1]);
    };
    Vector2D.prototype.apply = function (fn) {
        return new Vector2D(fn(this[0]), fn(this[1]));
    };
    Vector2D.prototype.equal = function (other, y) {
        if (typeof other === 'number') {
            if (y !== undefined) {
                return this[0] === other && this[1] === y;
            }
            return this[0] === other && this[1] === other;
        }
        return this[0] === other[0] && this[1] === other[1];
    };
    Vector2D.prototype.dif = function (other, y) {
        if (typeof other === 'number') {
            if (y !== undefined) {
                return this[0] !== other || this[1] !== y;
            }
            return this[0] !== other || this[1] !== other;
        }
        return this[0] !== other[0] || this[1] !== other[1];
    };
    Vector2D.prototype.les = function (other, y) {
        if (typeof other === 'number') {
            if (y !== undefined) {
                return this[0] < other && this[1] < y;
            }
            return this[0] < other && this[1] < other;
        }
        return this[0] < other[0] && this[1] < other[1];
    };
    Vector2D.prototype.lese = function (other, y) {
        if (typeof other === 'number') {
            if (y !== undefined) {
                return this[0] <= other && this[1] <= y;
            }
            return this[0] <= other && this[1] <= other;
        }
        return this[0] <= other[0] && this[1] <= other[1];
    };
    Vector2D.prototype.grt = function (other, y) {
        if (typeof other === 'number') {
            if (y !== undefined) {
                return this[0] > other && this[1] > y;
            }
            return this[0] > other && this[1] > other;
        }
        return this[0] > other[0] && this[1] > other[1];
    };
    Vector2D.prototype.grte = function (other, y) {
        if (typeof other === 'number') {
            if (y !== undefined) {
                return this[0] >= other && this[1] >= y;
            }
            return this[0] >= other && this[1] >= other;
        }
        return this[0] >= other[0] && this[1] >= other[1];
    };
    Object.defineProperty(Vector2D.prototype, "length", {
        get: function () {
            return 2;
        },
        enumerable: false,
        configurable: true
    });
    Vector2D.prototype.valueOf = function () {
        return this.hash;
    };
    Vector2D.prototype.toString = function () {
        return "(" + this[0] + ", " + this[1] + ")";
    };
    Vector2D.prototype.iterate = function () {
        var _this = this;
        return {
            value: this[0],
            next: function () { return ({
                value: _this[1],
                next: function () { return null; },
            }); },
        };
    };
    __decorate([
        lazy_1.lazy,
        __metadata("design:type", String),
        __metadata("design:paramtypes", [])
    ], Vector2D.prototype, "hash", null);
    __decorate([
        lazy_1.lazy,
        __metadata("design:type", Vector3D),
        __metadata("design:paramtypes", [])
    ], Vector2D.prototype, "Vector3D", null);
    __decorate([
        lazy_1.lazy,
        __metadata("design:type", Vector2DInt),
        __metadata("design:paramtypes", [])
    ], Vector2D.prototype, "Vector2DInt", null);
    __decorate([
        lazy_1.lazy,
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], Vector2D.prototype, "sqrMagnitude", null);
    __decorate([
        lazy_1.lazy,
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], Vector2D.prototype, "magnitude", null);
    __decorate([
        lazy_1.lazy,
        __metadata("design:type", Vector2D),
        __metadata("design:paramtypes", [])
    ], Vector2D.prototype, "normalized", null);
    __decorate([
        lazy_1.lazy,
        __metadata("design:type", Vector2D),
        __metadata("design:paramtypes", [])
    ], Vector2D.prototype, "abs", null);
    __decorate([
        lazy_1.lazy,
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [])
    ], Vector2D.prototype, "min", null);
    __decorate([
        lazy_1.lazy,
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [])
    ], Vector2D.prototype, "max", null);
    __decorate([
        lazy_1.lazy,
        __metadata("design:type", Vector2D),
        __metadata("design:paramtypes", [])
    ], Vector2D.prototype, "ceil", null);
    __decorate([
        lazy_1.lazy,
        __metadata("design:type", Vector2D),
        __metadata("design:paramtypes", [])
    ], Vector2D.prototype, "round", null);
    __decorate([
        lazy_1.lazy,
        __metadata("design:type", Vector2D),
        __metadata("design:paramtypes", [])
    ], Vector2D.prototype, "floor", null);
    __decorate([
        lazy_1.lazy,
        __metadata("design:type", Vector2D),
        __metadata("design:paramtypes", [])
    ], Vector2D.prototype, "negative", null);
    __decorate([
        lazy_1.lazy,
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [])
    ], Vector2D.prototype, "length", null);
    return Vector2D;
}());
exports.Vector2D = Vector2D;
var Vector2DInt = /** @class */ (function (_super) {
    __extends(Vector2DInt, _super);
    function Vector2DInt(x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        return _super.call(this, Vector2DInt.algorithm(x), Vector2DInt.algorithm(y)) || this;
    }
    Vector2DInt.prototype.manhattan = function (vector) {
        if (!vector) {
            return this[0] + this[1];
        }
        return vector[0] - this[0] + vector[1] - this[1];
    };
    Vector2DInt.algorithm = Math.round;
    return Vector2DInt;
}(Vector2D));
exports.Vector2DInt = Vector2DInt;
var Vector3D = /** @class */ (function (_super) {
    __extends(Vector3D, _super);
    function Vector3D(x, y, z) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (z === void 0) { z = 0; }
        return _super.call(this, x, y, z) || this;
    }
    Object.defineProperty(Vector3D.prototype, "hash", {
        get: function () {
            return object_hash_1.default([this[0], this[1]]);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Vector3D.prototype, "x", {
        get: function () {
            return this[0];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Vector3D.prototype, "y", {
        get: function () {
            return this[1];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Vector3D.prototype, "z", {
        get: function () {
            return this[2];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Vector3D.prototype, "sqrMagnitude", {
        get: function () {
            return Math.pow(this.x, 2) + Math.pow(this.y, 2) + Math.pow(this.z, 2);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Vector3D.prototype, "magnitude", {
        get: function () {
            return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2) + Math.pow(this.z, 2));
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Vector3D.prototype, "normalized", {
        get: function () {
            var magnitude = this.magnitude;
            return new Vector3D(this[0] / magnitude, this[1] / magnitude, this[2] / magnitude);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Vector3D.prototype, "ceil", {
        get: function () {
            return this.apply(Math.ceil);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Vector3D.prototype, "round", {
        get: function () {
            return this.apply(Math.round);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Vector3D.prototype, "floor", {
        get: function () {
            return this.apply(Math.floor);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Vector3D.prototype, "neg", {
        get: function () {
            return this.apply(function (x) { return -x; });
        },
        enumerable: false,
        configurable: true
    });
    Vector3D.prototype.add = function (other, y, z) {
        if (typeof other === 'number') {
            if (y !== undefined) {
                if (z !== undefined) {
                    return new Vector3D(this[0] + other, this[1] + y, this[2] + z);
                }
                return new Vector3D(this[0] + other, this[1] + y, this[2]);
            }
            return new Vector3D(this[0] + other, this[1] + other, this[2] + other);
        }
        return new Vector3D(this[0] + other[0], this[1] + other[1], this[2] + other[2]);
    };
    Vector3D.prototype.sub = function (other, y, z) {
        if (typeof other === 'number') {
            if (y !== undefined) {
                if (z !== undefined) {
                    return new Vector3D(this[0] - other, this[1] - y, this[2] - z);
                }
                return new Vector3D(this[0] - other, this[1] - y, this[2]);
            }
            return new Vector3D(this[0] - other, this[1] - other, this[2] - other);
        }
        return new Vector3D(this[0] - other[0], this[1] - other[1], this[2] - other[2]);
    };
    Vector3D.prototype.isub = function (other, y, z) {
        if (typeof other === 'number') {
            if (y !== undefined) {
                if (z !== undefined) {
                    return new Vector3D(other - this[0], y - this[1], z - this[2]);
                }
                return new Vector3D(other - this[0], y - this[1], this[2]);
            }
            return new Vector3D(other - this[0], other - this[1], other - this[2]);
        }
        return new Vector3D(other[0] - this[0], other[1] - this[1], other[2] - this[2]);
    };
    Vector3D.prototype.mul = function (other, y, z) {
        if (typeof other === 'number') {
            if (y !== undefined) {
                if (z !== undefined) {
                    return new Vector3D(this[0] * other, this[1] * y, this[2] * z);
                }
                return new Vector3D(this[0] * other, this[1] * y, this[2]);
            }
            return new Vector3D(this[0] * other, this[1] * other, this[2] * other);
        }
        return new Vector3D(this[0] * other[0], this[1] * other[1], this[2] * other[2]);
    };
    Vector3D.prototype.div = function (other, y, z) {
        if (typeof other === 'number') {
            if (y !== undefined) {
                if (z !== undefined) {
                    return new Vector3D(this[0] / other, this[1] / y, this[2] / z);
                }
                return new Vector3D(this[0] / other, this[1] / y, this[2]);
            }
            return new Vector3D(this[0] / other, this[1] / other, this[2] / other);
        }
        return new Vector3D(this[0] / other[0], this[1] / other[1], this[2] / other[2]);
    };
    Vector3D.prototype.idiv = function (other, y, z) {
        if (typeof other === 'number') {
            if (y !== undefined) {
                if (z !== undefined) {
                    return new Vector3D(other / this[0], y / this[1], z / this[2]);
                }
                return new Vector3D(other / this[0], y / this[1], this[2]);
            }
            return new Vector3D(other / this[0], other / this[1], other / this[2]);
        }
        return new Vector3D(other[0] / this[0], other[1] / this[1], other[2] / this[2]);
    };
    Vector3D.prototype.scalar = function (other, y, z) {
        if (typeof other === 'number') {
            if (y !== undefined) {
                if (z !== undefined) {
                    return this[0] * other + this[1] * y + this[2] * z;
                }
                return this[0] * other + this[1] * y + this[2];
            }
            return new Vector3D(this[0] * other, this[1] * other, this[2] * other);
        }
        return this[0] * other[0] + this[1] * other[1] + this[2] * other[2];
    };
    Vector3D.prototype.vetorial = function (other, y, z) {
        if (typeof other === 'number') {
            if (y !== undefined) {
                if (z !== undefined) {
                    return new Vector3D(this[1] * z - this[2] * y, this[2] * other - this[0] * z, this[0] * y - this[1] * other);
                }
                return new Vector3D(-this[2] * y, this[2] * other, this[0] * y - this[1] * other);
            }
            return new Vector3D(this[1] * other - this[2] * other, this[2] * other - this[0] * other, this[0] * other - this[1] * other);
        }
        if (other instanceof Vector2D) {
            return new Vector3D(-this[2] * other[1], this[2] * other[0], this[0] * other[1] - this[1] * other[0]);
        }
        return new Vector3D(this[1] * other[2] - this[2] * other[1], this[2] * other[0] - this[0] * other[2], this[0] * other[1] - this[1] * other[0]);
    };
    Vector3D.prototype.apply = function (fn) {
        return new Vector3D(fn(this[0]), fn(this[1]), fn(this[2]));
    };
    return Vector3D;
}(Array));
exports.Vector3D = Vector3D;
//# sourceMappingURL=vector.js.map