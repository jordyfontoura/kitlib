"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var lazy_1 = require("./lazy");
var contador = 1;
function generateId() {
    return contador++;
}
var E = /** @class */ (function () {
    function E() {
    }
    Object.defineProperty(E.prototype, "id", {
        get: function () {
            return generateId();
        },
        enumerable: false,
        configurable: true
    });
    __decorate([
        lazy_1.lazy,
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [])
    ], E.prototype, "id", null);
    return E;
}());
describe("Lazy", function () {
    test("Lazy", function () {
        var a = new E();
        var b = new E();
        expect(a.id).toBe(1);
        expect(a.id).toBe(1);
        expect(b.id).toBe(2);
        expect(b.id).toBe(2);
        expect(contador).toBe(3);
    });
    test("Lazy", function () {
        contador = 1;
        var a = new E();
        var b = new E();
        expect(b.id).toBe(1);
        expect(b.id).toBe(1);
        expect(a.id).toBe(2);
        expect(a.id).toBe(2);
        expect(contador).toBe(3);
    });
    test("Lazy", function () {
        contador = 1;
        var a = {
            get id() {
                return generateId();
            }
        };
        var b = {
            get id() {
                return generateId();
            }
        };
        lazy_1.lazy(a, 'id', Object.getOwnPropertyDescriptor(a, 'id') || {});
        lazy_1.lazy(b, 'id', Object.getOwnPropertyDescriptor(b, 'id') || {});
        expect(a.id).toBe(1);
        expect(a.id).toBe(1);
        expect(b.id).toBe(2);
        expect(b.id).toBe(2);
        expect(contador).toBe(3);
    });
});
//# sourceMappingURL=lazy.spec.js.map