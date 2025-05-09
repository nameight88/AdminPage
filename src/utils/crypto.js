// utils/crypto.js
const _keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';


export function base64Encode(input) {
  let output = '';
  let chr1, chr2, chr3, enc1, enc2, enc3, enc4;
  let i = 0;
  input = _utf8Encode(input);
  while (i < input.length) {
    chr1 = input.charCodeAt(i++);
    chr2 = input.charCodeAt(i++);
    chr3 = input.charCodeAt(i++);
    enc1 = chr1 >> 2;
    enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
    enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
    enc4 = chr3 & 63;
    if (isNaN(chr2)) enc3 = enc4 = 64;
    else if (isNaN(chr3)) enc4 = 64;
    output = output + _keyStr.charAt(enc1) + _keyStr.charAt(enc2) + _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
  }
  return output;
}

function _utf8Encode(str) {
  return unescape(encodeURIComponent(str));
}

export function cipher(salt) {
  let textToChars = (text) => text.split('').map((c) => c.charCodeAt(0));
  let byteHex = (n) => ('0' + Number(n).toString(16)).substr(-2);
  let applySaltToChar = (code) => textToChars(salt).reduce((a, b) => a ^ b, code);
  return (text) =>
    text
      .split('')
      .map(textToChars)
      .map(applySaltToChar)
      .map(byteHex)
      .join('');
}

export const encrypt = (text) => cipher('tjdnfeoquddnjsdlszmflqxmzl')(base64Encode(text));
export const decrypt = (text) => text; // 복호화 구현 필요 시 대응
