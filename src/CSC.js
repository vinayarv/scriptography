const random = require('./random');
const utils = require('./utils');
const ascii = require('./ascii');

const CSC = {};

CSC.generateKey = function() {
  return random.integer(1, 4095);
};

CSC.encrypt = function(key, plaintext) {
  var shiftedStr = [];
  for (var i = 0; i < plaintext.length; i++) {
    var shiftedNumber = plaintext.charCodeAt(i) + key
    shiftedStr.push(String.fromCharCode(shiftedNumber));
  }
  return utils.asciiToBase64(shiftedStr.join(''));
};

CSC.decrypt = function(key, cipherText) {
  var asciiText = utils.base64ToAscii(cipherText);
  var plaintext = [];
  for (var i = 0; i < asciiText.length; i++) {
    var shiftedChar = asciiText.charCodeAt(i) - key
    plaintext.push(String.fromCharCode(shiftedChar));
  }
  return plaintext.join('');
};

module.exports = CSC;
