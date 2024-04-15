export default class Maybe {
  protected _value: any;
  static just(a: any) {
    return new Just(a);
  }

  static nothing() {
    return new Nothing();
  }

  static fromNullable(a: any) {
    return a !== null ? Maybe.just(a) : Maybe.nothing();
  }

  static of(a: any) {
    return this.just(a);
  }

  get isNothing() {
    return false;
  }

  get isJust() {
    return false;
  }
}

export class Just extends Maybe {
  constructor(value: any) {
    super();
    this._value = value;
  }

  get value() {
    return this._value;
  }

  map(f: Function) {
    return Maybe.fromNullable(f(this._value));
  }

  getOrElse() {
    return this._value;
  }

  filter(f: Function) {
    Maybe.fromNullable(f(this._value)) ? this._value : null;
  }

  chain(f: Function) {
    return f(this._value);
  }

  toString() {
    return `Maybe.Just(${this._value})`;
  }
}

export class Nothing extends Maybe {
  map(_f: Function) {
    return this;
  }

  get value() {
    throw new TypeError('Cannot extract the value of a Nothing');
  }

  getOrElse(other: any) {
    return other;
  }
  
  filter(_f: any) {
    return this._value;
  }

  chain(_f: any) {
    return this;
  }

  toString() {
    return 'Maybe.Nothing';
  }
}