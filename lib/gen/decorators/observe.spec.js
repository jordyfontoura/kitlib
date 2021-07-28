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
var observe_1 = require("./observe");
var contador = 1;
function generateId() {
    return contador++;
}
var E = /** @class */ (function () {
    function E() {
        this.id = -17;
    }
    __decorate([
        observe_1.observe(generateId),
        __metadata("design:type", Number)
    ], E.prototype, "id", void 0);
    return E;
}());
describe('Observe', function () {
    test('Observe', function () {
        contador = 1;
        expect(contador).toBe(1);
        var a = new E();
        expect(contador).toBe(1);
        expect(a.id).toBe(-17);
        expect(contador).toBe(1);
        a.id = 4;
        expect(contador).toBe(2);
        a.id = 4;
        expect(contador).toBe(3);
    });
});
//# sourceMappingURL=observe.spec.js.map