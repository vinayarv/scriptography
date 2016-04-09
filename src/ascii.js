'use strict';

var ascii = {};

ascii.toDigits = function (aStr) {
  var digits = [];
  for (var i = 0; i < aStr.length; i++) {
    var digit = aStr.charCodeAt(i) % 4096;
    digits.push(digit);
  }
  return digits;
};

ascii.fromDigits = function (digits) {
  var aStr = '';
  digits.forEach(function (digit) {
    aStr += String.fromCharCode(digit);
  });
  return aStr;
};

module.exports = ascii;
