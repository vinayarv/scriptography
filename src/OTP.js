const random = require('./random');
const utils = require('./utils');
const base64 = require('./base64');

const OTP = {};

OTP.generateKey = function (len) {
  return random.base64(len);
};

OTP.encrypt = function (key, plaintext) {
  key = utils.base64ToAscii(key).slice(0, plaintext.length);
  var cipherText = [];
  for (var i = 0; i < plaintext.length; i++) {
    var XORChar = plaintext.charCodeAt(i) ^ key.charCodeAt(i);
    cipherText.push(String.fromCharCode(XORChar));
  }
  return utils.asciiToBase64(cipherText.join(''));
};

OTP.decrypt = function (key, cipherText) {
  key = utils.base64ToAscii(key).slice(0, cipherText.length);
  cipherText = utils.base64ToAscii(cipherText);
  var plaintext = [];
  for (var i = 0; i < cipherText.length; i++) {
    var XORChar = cipherText.charCodeAt(i) ^ key.charCodeAt(i);
    plaintext.push(String.fromCharCode(XORChar));
  }
  return plaintext.join('');
};

module.exports = OTP;
