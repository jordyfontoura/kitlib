import Clock from './clock';
export default class Cooldown extends Clock {
    time: number;
    constructor(time: number);
    get ready(): boolean;
    reset: () => void;
    active(): boolean;
}
//# sourceMappingURL=cooldown.d.ts.map