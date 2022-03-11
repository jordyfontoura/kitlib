import capitalize from './capitalize';
import count from './count';
import { MaskOptions, mask } from './mask';
import reverse from './reverse';

declare global {
  interface String {
    capitalize(str: string): string;
    count(text: string, pattern: string | RegExp): number;
    /**
     * Mask a string with a mask.
     * @param text Text to be masked
     * @param mask Mask to be applied
     * @param options Options
     * @example
     * mask('1234567890', '####-####-####') // '1234-5678-90'
     * mask('0123456789', '####-####', { direction: 'left' })) // '012345-6789'
     * @throws {TypeError} If the text is not a string
     * @returns Masked string
     *
     * @author Jordy Fontoura Ramos Nascimento
     * @email jordyfontoura@outlook.com
     * @copyright MIT
     */
    mask(
      this: string,
      mask: string | string[],
      options?: Partial<MaskOptions>
    ): string;
    reverse(text: string): string;
  }
}

export default function () {
  String.prototype.mask = function (
    this: string,
    maskInput: string | string[],
    options: Partial<MaskOptions> = {}
  ): string {
    return mask(this, maskInput, options);
  };
  String.prototype.count = function (
    this: string,
    pattern: string | RegExp
  ): number {
    return count(this, pattern);
  };
  String.prototype.capitalize = function (this: string): string {
    return capitalize(this);
  };
  String.prototype.reverse = function (this: string): string {
    return reverse(this);
  };
}
