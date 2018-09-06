export default class TestResult {
    private mustPassCount;
    private tryHarderCount;
    private maxMisreads;
    private maxTryHarderMisreads;
    private rotation;
    constructor(mustPassCount: number, tryHarderCount: number, maxMisreads: number, maxTryHarderMisreads: number, rotation: number);
    getMustPassCount(): number;
    getTryHarderCount(): number;
    getMaxMisreads(): number;
    getMaxTryHarderMisreads(): number;
    getRotation(): number;
}
