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
var transform_1 = require("./transform");
var E = /** @class */ (function () {
    function E() {
        this.id = -17;
    }
    __decorate([
        transform_1.transform(Math.floor),
        __metadata("design:type", Number)
    ], E.prototype, "id", void 0);
    return E;
}());
describe('Transform', function () {
    test('Transform', function () {
        var a = new E();
        expect(a.id).toBe(-17);
        a.id = 0.8;
        expect(a.id).toBe(0);
        a.id = 53.253457;
        expect(a.id).toBe(53);
    });
});
//# sourceMappingURL=transform.spec.js.map