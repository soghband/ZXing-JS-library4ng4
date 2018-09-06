import BarcodeFormat from './../../../core/BarcodeFormat';
import './../../../core/InvertedLuminanceSource';
import Reader from './../../../core/Reader';
/**
 * @author Sean Owen
 * @author dswitkin@google.com (Daniel Switkin)
 */
declare abstract class AbstractBlackBoxSpec {
    private barcodeReader;
    private expectedFormat;
    private testBase;
    private testResults;
    static buildTestBase(testBasePathSuffix: string): string;
    protected constructor(testBasePathSuffix: string, barcodeReader: Reader, expectedFormat: BarcodeFormat);
    protected getTestBase(): string;
    protected addTest(mustPassCount: number, tryHarderCount: number, rotation: number): void;
    /**
     * Adds a new test for the current directory of images.
     *
     * @param mustPassCount The number of images which must decode for the test to pass.
     * @param tryHarderCount The number of images which must pass using the try harder flag.
     * @param maxMisreads Maximum number of images which can fail due to successfully reading the wrong contents
     * @param maxTryHarderMisreads Maximum number of images which can fail due to successfully
     *                             reading the wrong contents using the try harder flag
     * @param rotation The rotation in degrees clockwise to use for this test.
     */
    protected addTestWithMax(mustPassCount: number, tryHarderCount: number, maxMisreads: number, maxTryHarderMisreads: number, rotation: number): void;
    private walkDirectory(dirPath);
    protected getImageFiles(): Array<string>;
    protected getReader(): Reader;
    testBlackBox(done: () => any): void;
    /**
     * @throws IOException
     */
    private testBlackBoxCountingResults(assertOnFailure, done);
    /**
     * @throws ReaderException
     */
    private decode(source, rotation, expectedText, expectedMetadata, tryHarder);
    private static toDebugHexStringCodes(text);
    private static valueOfResultMetadataTypeFromString(value);
    /**
     * @throws IOException
     */
    protected static readTextFileAsString(file: string): string;
    /**
     * @throws IOException
     */
    protected static readBinFileAsString(file: string): string;
    /**
     * @throws IOException
     */
    protected static readTextFileAsMetadata(file: string): Map<string, string>;
}
export default AbstractBlackBoxSpec;
