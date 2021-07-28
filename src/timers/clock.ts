export default class Clock {
  private startedAt: number;
  constructor() {
    this.startedAt=performance.now();
  }
  track(){
    this.startedAt=performance.now();
  }
  get elapsed(){
    return performance.now()-this.startedAt;
  }
}