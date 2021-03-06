import CharacterSetECI from './../common/CharacterSetECI';
export default class StringEncoding {
    static decode(bytes: Uint8Array, encoding: string | CharacterSetECI): string;
    static encode(s: string, encoding: string | CharacterSetECI): Uint8Array;
    private static isBrowser();
    private static decodeFallBack(bytes, encoding);
    private static encodeFallBack(s, encoding);
}
