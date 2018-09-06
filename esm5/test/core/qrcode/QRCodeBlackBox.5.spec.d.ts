import 'mocha';
import AbstractBlackBoxSpec from './../common/AbstractBlackBox';
/**
 * Some very difficult exposure conditions including self-shadowing, which happens a lot when
 * pointing down at a barcode (i.e. the phone's shadow falls across part of the image).
 * The global histogram gets about 5/15, where the local one gets 15/15.
 *
 * @author dswitkin@google.com (Daniel Switkin)
 */
export default class QRCodeBlackBox5Spec extends AbstractBlackBoxSpec {
    constructor();
}
