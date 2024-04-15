export default class Either {
  protected _value: any;
  constructor(value) {
    this._value = value;
  }
  get value() { return this._value; }
  static left(a) { return new Left(a); }
  static right(a) { return new Right(a); }
  static fromNullabel(val) {
    return val !== null && val !== undefined ? Either.right(val) : Either.left(val);
  }
  static of(a) { return Either.right(a); }
}

class Left extends Either {
  map(_) { return this; }
  get value() { throw new TypeError('Cannot extract the value of a Left(a).'); }
  getOrElse(other: any) { return other; }
  orElse(_f: any) { return _f(this._value); }
  chain(_f: any) { return this; }
  getOrElseThrow(a: any) { throw new Error(a); }
  filter(_f: any) { return this; }
  toString() { return `Either.Left(${this._value})`; }
}

class Right extends Either {
  map(f: any) { return Either.of(f(this._value)); }
  getOrElse(_other: any) { return this._value; }
  orElse() { return this; }
  chain(f: any) { return f(this._value); }
  getOrElseThrow(_) { return this._value; }
  filter(f: any) { return Either.fromNullabel(f(this._value)) ? this._value : null; }
  toString() { return `Either.Right(${this._value})`; }
}
