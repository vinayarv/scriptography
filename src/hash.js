const base64 = require('./base64');
const utils = require('./utils');

const hash = {};

hash.simple = {};

hash.simple._pad = function (str, length) {
  var paddedStr = str;
  var revStr = str.split('').reverse().join('');
  console.log(revStr);
  while (paddedStr.length < length){
    paddedStr = paddedStr + revStr;
  }
  return paddedStr;
};

hash.simple._partition = function () {};

hash.simple._combine = function () {};

hash.simple.run = function () {};

hash.hmac = function () {};

hash.pbkdf2 = function () {};

module.exports = hash;
