import { performance } from 'perf_hooks';
export default class Clock {
    constructor() {
        this.startedAt = performance.now();
    }
    track() {
        this.startedAt = performance.now();
    }
    get elapsed() {
        return performance.now() - this.startedAt;
    }
}
//# sourceMappingURL=clock.js.map