import CryptoJS from 'react-native-crypto-js';

function decryptQrcode(ciphertext) {
  let bytes = CryptoJS.AES.decrypt(ciphertext, 'fidly-secret');
  let originalText = bytes.toString(CryptoJS.enc.Utf8);
  return originalText;
}

function extractTokenIdentifier(decryptedString) {
  const identifier = decryptedString.split('-', 4).join('-');
  const token = decryptedString.replace(`${identifier}-`, '');

  return {
    identifier,
    token,
  };
}

export default {
  decryptQrcode,
  extractTokenIdentifier,
};
