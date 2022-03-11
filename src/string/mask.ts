import count from './count';
import reverse from './reverse';

export interface MaskOptions {
  /**
   * Direction of the mask.
   * @default 'right'
   */
  direction: 'left' | 'right';
  /**
   * Character to use for masking.
   * @default '#'
   * @example '*'
   */
  char: string;
}

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
export function mask(
  text: string,
  mask: string | string[],
  options: Partial<MaskOptions> = {}
): string {
  const opts: MaskOptions = {
    direction: 'right',
    char: '#',
    ...options,
  };
  let result = '';
  const Base = opts.direction === 'right' ? text : reverse(text);
  let fullMask = mask;
  if (Array.isArray(mask)) {
    fullMask = mask.reduce((pre, cur, i) => {
      if (count(cur, opts.char) === Base.length) {
        return cur;
      }
      if (count(cur, opts.char) < Base.length) {
        return pre;
      }
      if (count(cur, opts.char) < count(pre, opts.char)) {
        return cur;
      }
      return pre;
    }, mask[0]);
  }
  fullMask =
    opts.direction === 'right'
      ? fullMask
      : typeof fullMask === 'string'
      ? reverse(fullMask)
      : fullMask.reverse();
  for (let i = 0, j = 0; j < Base.length; i++) {
    const char = fullMask[i];
    if (char === undefined) {
      result += Base[j++];
    } else if (char === opts.char) {
      result += Base[j++];
    } else {
      result += char;
    }
  }
  if (opts.direction === 'left') {
    return reverse(result);
  }
  return result;
}

export default mask;
