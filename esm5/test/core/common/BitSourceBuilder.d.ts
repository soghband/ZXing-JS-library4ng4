/**
 * Class that lets one easily build an array of bytes by appending bits at a time.
 *
 * @author Sean Owen
 */
export default class BitSourceBuilder {
    private output;
    private nextByte;
    private bitsLeftInNextByte;
    constructor();
    write(value: number, numBits: number): void;
    toByteArray(): Uint8Array;
}
