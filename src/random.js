const base64 = require('./base64');

const random = {};

random.integer = function() {
  var min, max;
  var args = Array.from(arguments);
  if (args.length === 2) {
    min = args[0];
    max = args[1]
  } else {
    min = 0;
    max = args[0];
  }
  return Math.ceil((max - min) * Math.random() + min);
};


const charSet = base64._charSet;

random.base64 = function(len) {
  var randomStr = [];
  for (var i = 0; i < len; i++) {
    var index = random.integer(0, 7);
      randomStr.push(charSet[index]);
  }
  return randomStr.join("");
};

module.exports = random;
