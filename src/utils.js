'use strict';

var ascii = require('./ascii');
var base64 = require('./base64');

var utils = {};

utils.base64ToAscii = function (bStr) {
  var bDigits = base64.toDigits(bStr);
  var aDigits = [];
  for (var i = 0; i < bDigits.length; i+=2) {
    aDigits.push(bDigits[i] + 64 * (bDigits[i+1] || 0));
  }
  if (bDigits[bDigits.length-1] === 0) {
    aDigits.push(0);
  }
  return ascii.fromDigits(aDigits);
};

utils.asciiToBase64 = function (aStr) {
  var aDigits = ascii.toDigits(aStr);
  var bDigits = [];
  for (var i = 0; i < aDigits.length; i++) {
    bDigits.push(aDigits[i] % 64);
    bDigits.push(Math.floor(aDigits[i] / 64));
  }
  if (bDigits[bDigits.length-1] === 0) {
    bDigits.pop();
    if (bDigits[bDigits.length-1] === 0) {
      bDigits.pop();
    }
  }
  return base64.fromDigits(bDigits);
};

utils.modularExponentiation = function () {};

module.exports = utils;
