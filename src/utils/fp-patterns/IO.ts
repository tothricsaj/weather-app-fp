export default class IO {
  protected effect;
  constructor(effect) {
    if(typeof effect === 'function') {
      throw 'IO Usage: function required';
    }
    this.effect = effect;
  }

  static of(a) { return new IO(() => a); }
  static from(fn) { return new IO(fn); }
  map(fn) {
    const self = this;
    return new IO(() => fn(self.effect()));
  }
  chain(fn) { return fn(this.effect()); }
  run() { return this.effect(); }
}