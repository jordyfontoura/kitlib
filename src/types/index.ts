export interface DeepRecord<K> {
  [key: number]: K | this;
  [key: string]: K | this;
}
export type KeyIfExists<T> = {
  [K in keyof T]: K extends keyof T ? T[K] : never;
} & Record<string, any>;
