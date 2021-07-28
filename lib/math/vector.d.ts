declare type Iter<T> = {
    value: T;
    next: () => Iter<T> | null;
};
export declare class Vector2D {
    static get left(): Vector2D;
    static get right(): Vector2D;
    static get up(): Vector2D;
    static get down(): Vector2D;
    readonly 0: number;
    readonly 1: number;
    constructor(x?: number, y?: number);
    get hash(): string;
    get Vector3D(): Vector3D;
    get Vector2DInt(): Vector2DInt;
    get Array(): Array<number>;
    get x(): number;
    get y(): number;
    get sqrMagnitude(): number;
    get magnitude(): number;
    get normalized(): Vector2D;
    get abs(): Vector2D;
    get min(): number;
    get max(): number;
    get ceil(): Vector2D;
    get round(): Vector2D;
    get floor(): Vector2D;
    /** Retorna uma direção randomica com magnitude 1 */
    get random(): Vector2D;
    get neg(): Vector2D;
    get negative(): Vector2D;
    angle(): number;
    angle(vector: Vector2D): number;
    changed(props: {
        x?: number;
        y?: number;
    }): Vector2D;
    add(n: number): Vector2D;
    add(x: number, y?: number): Vector2D;
    add(vector: Vector2D): Vector2D;
    sub(n: number): Vector2D;
    sub(x: number, y?: number): Vector2D;
    sub(vector: Vector2D): Vector2D;
    sub(other: Vector2D | number[] | number, y?: number): Vector2D;
    isub(n: number): Vector2D;
    isub(x: number, y?: number): Vector2D;
    isub(vector: Vector2D): Vector2D;
    mul(n: number): Vector2D;
    mul(x: number, y?: number): Vector2D;
    mul(vector: Vector2D): Vector2D;
    div(n: number): Vector2D;
    div(x: number, y?: number): Vector2D;
    div(vector: Vector2D): Vector2D;
    idiv(n: number): Vector2D;
    idiv(x: number, y?: number): Vector2D;
    idiv(vector: Vector2D): Vector2D;
    scalar(n: number): Vector2D;
    scalar(x: number, y: number): number;
    scalar(vector: Vector2D): number;
    /**
     *
     * @param on
     * @param ortogonal
     * @copyright https://pt.wikipedia.org/wiki/Proje%C3%A7%C3%A3o_de_um_vetor
     * @returns
     */
    project(on: Vector2D, ortogonal?: boolean): Vector2D;
    distanceTo(n: number): number;
    distanceTo(x: number, y: number): number;
    distanceTo(vector: Vector2D): number;
    cross(x: number, y: number, z: number): Vector3D;
    cross(vector: Vector2D): Vector3D;
    cross(vector: Vector3D): Vector3D;
    scaled(size: number): Vector2D;
    /**
     * Rotaciona o vetor `theta` graus
     * @param theta Ângulo em radianos
     * @returns
     */
    rotated(center: Vector2D, theta: number): Vector2D;
    rotated(theta: number): Vector2D;
    clamp(min: Vector2D, max: Vector2D): Vector2D;
    clamp(min: number[], max: number[]): Vector2D;
    clampLength(min: number, max: number): Vector2D;
    clampAngle(min: number, max: number): Vector2D;
    lerp(from: Vector2D, alpha: number): Vector2D;
    lerp(from: Vector2D, to: Vector2D, alpha: number): Vector2D;
    apply(fn: (n: number) => number): Vector2D;
    equal(n: number): boolean;
    equal(x: number, y: number): boolean;
    equal(vector: Vector2D): boolean;
    equal(vector: number[]): boolean;
    dif(n: number): boolean;
    dif(x: number, y: number): boolean;
    dif(vector: Vector2D): boolean;
    dif(vector: number[]): boolean;
    les(n: number): boolean;
    les(x: number, y: number): boolean;
    les(vector: Vector2D): boolean;
    les(vector: number[]): boolean;
    lese(n: number): boolean;
    lese(x: number, y: number): boolean;
    lese(vector: Vector2D): boolean;
    lese(vector: number[]): boolean;
    grt(n: number): boolean;
    grt(x: number, y: number): boolean;
    grt(vector: Vector2D): boolean;
    grt(vector: number[]): boolean;
    grte(n: number): boolean;
    grte(x: number, y: number): boolean;
    grte(vector: Vector2D): boolean;
    grte(vector: number[]): boolean;
    get length(): number;
    valueOf(): string;
    toString(): string;
    iterate(): Iter<number>;
}
export declare class Vector2DInt extends Vector2D {
    static algorithm: (x: number) => number;
    constructor(x?: number, y?: number);
    manhattan(vector?: Vector2DInt): number;
}
export declare class Vector3D extends Array<number> {
    constructor(x?: number, y?: number, z?: number);
    get hash(): string;
    get x(): number;
    get y(): number;
    get z(): number;
    get sqrMagnitude(): number;
    get magnitude(): number;
    get normalized(): Vector3D;
    get ceil(): Vector3D;
    get round(): Vector3D;
    get floor(): Vector3D;
    get neg(): Vector3D;
    add(n: number): Vector3D;
    add(x: number, y: number, z?: number): Vector3D;
    add(vector: Vector3D): Vector3D;
    sub(n: number): Vector3D;
    sub(x: number, y: number, z?: number): Vector3D;
    sub(vector: Vector3D): Vector3D;
    isub(n: number): Vector3D;
    isub(x: number, y: number, z?: number): Vector3D;
    isub(vector: Vector3D): Vector3D;
    mul(n: number): Vector3D;
    mul(x: number, y: number, z?: number): Vector3D;
    mul(vector: Vector3D): Vector3D;
    div(n: number): Vector3D;
    div(x: number, y: number, z?: number): Vector3D;
    div(vector: Vector3D): Vector3D;
    idiv(n: number): Vector3D;
    idiv(x: number, y: number, z?: number): Vector3D;
    idiv(vector: Vector3D): Vector3D;
    scalar(n: number): Vector3D;
    scalar(x: number, y: number, z?: number): number;
    scalar(vector: Vector3D): number;
    vetorial(x: number, y: number, z: number): Vector3D;
    vetorial(vector: Vector3D): Vector3D;
    vetorial(vector: Vector2D): Vector3D;
    apply(fn: (n: number) => number): Vector3D;
}
export {};
//# sourceMappingURL=vector.d.ts.map