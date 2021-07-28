"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vector_1 = require("./vector");
describe("Vector2D", function () {
    test("Deve criar um vetor", function () {
        var vector = new vector_1.Vector2D(0);
        expect(vector.x).toBe(0);
        expect(vector.y).toBe(0);
        vector = new vector_1.Vector2D(1);
        expect(vector.x).toBe(1);
        expect(vector.y).toBe(1);
        var _a = [Math.random() * 10, Math.random() * 10], a = _a[0], b = _a[1];
        vector = new vector_1.Vector2D(a, b);
        expect(vector.x).toBe(a);
        expect(vector.y).toBe(b);
    });
    test("Deve retornar a magnitude", function () {
        var vector = new vector_1.Vector2D(0);
        expect(vector.magnitude).toBe(0);
        expect(vector.magnitude).toBe(0);
        expect(vector.magnitude).toBe(0);
        vector = new vector_1.Vector2D(1);
        expect(vector.magnitude).toBe(Math.sqrt(2));
        vector = new vector_1.Vector2D(-1);
        expect(vector.magnitude).toBe(Math.sqrt(2));
    });
    test("Deve retornar um vetor inteiro", function () {
        var _a = [Math.random() * 10, Math.random() * 10], a = _a[0], b = _a[1];
        var vector = new vector_1.Vector2DInt(a, b);
        expect(vector.Vector2DInt.x).toBe(Math.round(a));
        expect(vector.Vector2DInt.y).toBe(Math.round(b));
    });
});
describe("Vector2DInt", function () {
    test("Deve criar um vetor", function () {
        var vector = new vector_1.Vector2DInt(0);
        expect(vector.x).toBe(0);
        expect(vector.y).toBe(0);
        var _a = [Math.random() * 10, Math.random() * 10], a = _a[0], b = _a[1];
        vector = new vector_1.Vector2DInt(a, b);
        expect(vector.x).toBe(Math.round(a));
        expect(vector.y).toBe(Math.round(b));
    });
});
//# sourceMappingURL=vector.spec.js.map