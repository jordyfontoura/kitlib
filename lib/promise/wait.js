export default function wait(ms) {
    if (ms <= 0) {
        return;
    }
    return new Promise((resolve) => setTimeout(resolve, ms));
}
//# sourceMappingURL=wait.js.map