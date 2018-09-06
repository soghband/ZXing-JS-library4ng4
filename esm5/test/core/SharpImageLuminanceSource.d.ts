import SharpImage from './util/SharpImage';
import LuminanceSource from './../../core/LuminanceSource';
/**
 * This LuminanceSource implementation is meant for J2SE clients and our blackbox unit tests.
 *
 * @author dswitkin@google.com (Daniel Switkin)
 * @author Sean Owen
 * @author code@elektrowolle.de (Wolfgang Jung)
 */
export default class SharpImageLuminanceSource extends LuminanceSource {
    private image;
    constructor(image: SharpImage);
    getRow(y: number, row: Uint8ClampedArray): Uint8ClampedArray;
    getMatrix(): Uint8ClampedArray;
    isCropSupported(): boolean;
    crop(left: number, top: number, width: number, height: number): LuminanceSource;
    /**
     * This is always true, since the image is a gray-scale image.
     *
     * @return true
     */
    isRotateSupported(): boolean;
    rotateCounterClockwise(): LuminanceSource;
    rotateCounterClockwise45(): LuminanceSource;
    invert(): LuminanceSource;
}
