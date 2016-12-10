'use strict';

const base64 = require('./base64');

const random = {};

random.integer = function () {};

const charSet = base64._charSet;
random.base64 = function () {};

module.exports = random;
