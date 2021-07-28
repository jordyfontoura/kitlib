import Clock from './clock';

export default class Cooldown extends Clock {
  time: number;
  constructor(time: number) {
    super();
    this.time = time;
  }
  get ready(): boolean {
    return this.elapsed >= this.time;
  }
  reset = this.track;
  active() {
    if (this.ready) {
      this.reset();
      return true;
    }
    return false;
  }
}
