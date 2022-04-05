import { lazy } from "./lazy";
let contador = 1;
function generateId(){
  return contador++;
}
class E {
  @lazy
  get id(): number {
    return generateId();
  }
}

describe("Lazy", () => {
  test("Lazy", ()=>{
    const a = new E();
    const b = new E();
    expect(a.id).toBe(1)
    expect(a.id).toBe(1)
    expect(b.id).toBe(2)
    expect(b.id).toBe(2)
    expect(contador).toBe(3)
  })
  test("Lazy", ()=>{
    contador = 1;
    const a = new E();
    const b = new E();
    expect(b.id).toBe(1)
    expect(b.id).toBe(1)
    expect(a.id).toBe(2)
    expect(a.id).toBe(2)
    expect(contador).toBe(3)
  })
  test("Lazy", ()=>{
    contador = 1;
    const a = {
      get id(): number{
        return generateId();
      }
    }
    const b = {
      get id(): number{
        return generateId();
      }
    }
    lazy(a, 'id', Object.getOwnPropertyDescriptor(a, 'id') || {});
    lazy(b, 'id', Object.getOwnPropertyDescriptor(b, 'id') || {});
    expect(a.id).toBe(1)
    expect(a.id).toBe(1)
    expect(b.id).toBe(2)
    expect(b.id).toBe(2)
    expect(contador).toBe(3)
  })
});