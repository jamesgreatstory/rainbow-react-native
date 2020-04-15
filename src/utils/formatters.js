import { isString } from 'lodash';
import GraphemeSplitter from 'grapheme-splitter';

const grapheme = new GraphemeSplitter();

const firstCharacterOfString = n => n.charAt(0);

export function formatNumberWithCommaSeparators(number) {
  const parts = String(number).split('.');
  const commaSeperated = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return parts.length > 1 ? `${commaSeperated}.${parts[1]}` : commaSeperated;
}

export const getFirstGrapheme = string => grapheme.splitGraphemes(string)[0];

export const initials = string =>
  !string || !isString(string)
    ? '?'
    : string
        .split(' ')
        .map(firstCharacterOfString)
        .join('');

export function removeLeadingZeros(value = '') {
  if (
    value.length > 1 &&
    value.substring(0, 1) === '0' &&
    value.substring(1, 2) !== '.'
  ) {
    return removeLeadingZeros(value.substring(1));
  }

  if (
    value.substring(value.length - 1, value.length) === '.' &&
    value.indexOf('.') !== value.length - 1
  ) {
    return value.substring(0, value.length - 1);
  }

  if (value.substring(0, 1) === '.') {
    return `0${value}`;
  }

  return value;
}

export default {
  getFirstGrapheme,
  initials,
  removeLeadingZeros,
};
