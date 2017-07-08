const utils = require('./utils');
const ascii = require('./ascii');

const RSA = {};

RSA._selectKeyPair = function(p, q) {
  var n = p * q;
  var phiN = utils.totient(n, [p, q]);
  console.log(phiN);

  return [1, 2];
};

RSA.generateKeys = function() {};

RSA.encrypt = function() {};

RSA.decrypt = function() {};

module.exports = RSA;
