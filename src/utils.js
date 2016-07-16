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

utils.modularExponentiation = function (base, exp, modulus) {
  var bits = exp.toString(2);
  var accum = 1;
  var x = base % modulus;
  for (var i = bits.length-1; i >= 0; i--) {
    if (bits[i] == '1') {
      accum *= x;
    }
    x = (x * x) % modulus;
  }
  return accum % modulus;
};

utils.primeFactors = function (n) {
  var end = Math.floor(Math.pow(n, 0.5));
  for (var i = 2; i <= end; i++) {
    if (n % i === 0) {
      return utils.primeFactors(i).concat(utils.primeFactors(n/i));
    }
  }
  return [n];
};

utils.totient = function (n, factors) {
  if (!factors) {
    factors = [];
    utils.primeFactors(n).forEach(function (factor) {
      if (factors.indexOf(factor) === -1) factors.push(factor);
    });
  }
  var numerator = factors.reduce(function (prod, factor) {
    return prod * (factor - 1);
  }, n);
  var denominator = factors.reduce(function (prod, factor) {
    return prod * factor;
  });
  return numerator / denominator;
};

utils.gcd = function (a, b) {
  var smaller = Math.min(a, b);
  var larger = Math.max(a, b);
  if (smaller === 0) return larger;
  return utils.gcd(smaller, larger % smaller);
};

module.exports = utils;
