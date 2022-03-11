import Clock from './clock';
export default class Cooldown extends Clock {
    constructor(time) {
        super();
        this.reset = this.track;
        this.time = time;
    }
    get ready() {
        return this.elapsed >= this.time;
    }
    active() {
        if (this.ready) {
            this.reset();
            return true;
        }
        return false;
    }
}
//# sourceMappingURL=cooldown.js.map