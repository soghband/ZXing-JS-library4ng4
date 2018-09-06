/// <reference types="sharp" />
import * as sharp from 'sharp';
import BitMatrix from './../../../core/common/BitMatrix';
export default class SharpImage {
    private wrapper;
    private buffer;
    private width;
    private height;
    constructor(wrapper: sharp.SharpInstance, buffer: Uint8ClampedArray, width: number, height: number);
    static loadWithRotations(path: string, rotations: number[], done: (err: any, images?: Map<number, SharpImage>) => any): void;
    static loadAsBitMatrix(path: string, done: (err: any, bitMatrix?: BitMatrix) => any): void;
    private static toGrayscaleBuffer(imageBuffer, width, height, channels);
    save(path: string): void;
    getWidth(): number;
    getHeight(): number;
    getRow(y: number, row: Uint8ClampedArray): void;
    getMatrix(): Uint8ClampedArray;
    private static getPixelIndex(width, height, x, y);
}
