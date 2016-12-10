'use strict';

const base64 = require('./base64');
const utils = require('./utils');

const hash = {};

hash.simple = {};

hash.simple._pad = function () {};

hash.simple._partition = function () {};

hash.simple._combine = function () {};

hash.simple.run = function () {};

hash.hmac = function () {};

hash.pbkdf2 = function () {};

module.exports = hash;
