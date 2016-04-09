'use strict';

var chai = require('chai');
chai.use(require('chai-spies'));
var expect = chai.expect;

var ascii = require('../src/ascii');
var base64 = require('../src/base64');
var utils = require('../src/utils');
var random = require('../src/random');

// These are already passing, feel free to check out some utility methods available to you (you won't need them until part II)
describe('there and back again, a string-encoding tale', function () {

  it('`ascii.toDigits`', function () {
    var digits = ascii.toDigits('helpful');
    expect(digits).to.eql([104, 101, 108, 112, 102, 117, 108]);
  });

  it('`ascii.fromDigits`', function () {
    var str = ascii.fromDigits([119, 104, 105, 115, 112, 101, 114, 115]);
    expect(str).to.equal('whispers');
  });

  it('`base64.toDigits`', function () {
    var digits = base64.toDigits('ax$B_32');
    expect(digits).to.eql([0, 23, 63, 27, 62, 55, 54]);
  });

  it('`base64.fromDigits`', function () {
    var str = base64.fromDigits([7, 8, 18, 54, 8, 15, 4]);
    expect(str).to.equal('his2ipe');
  });

  it('`utils.base64ToAscii` and `utils.asciiToBase64`', function () {
    var base64Encoding = utils.asciiToBase64('the quick brown fox jumps over the lazy dog');
    expect(base64Encoding).to.not.equal('the quick brown fox jumps over the lazy dog');
    expect(utils.base64ToAscii(base64Encoding)).to.equal('the quick brown fox jumps over the lazy dog');
    var asciiEncoding = utils.base64ToAscii('$1337_FoR_LiFe$');
    expect(asciiEncoding).to.not.equal('$1337_FoR_LiFe$');
    expect(utils.asciiToBase64(asciiEncoding)).to.equal('$1337_FoR_LiFe$');
  });

});

describe('random stuff, literally', function () {

  var originalMathRandom = Math.random;
  afterEach(function () {
    Math.random = originalMathRandom;
  });

  describe('`random.integer`', function () {

    it('uses `Math.random`', function () {
      expect(random.integer).to.be.a.function;
      chai.spy.on(Math, 'random');
      random.integer(0,1000);
      expect(Math.random).to.have.been.called();
    });

    it('given a min and max, generates an integer betwixt them', function () {
      Math.random = function () {
        return 0;
      };
      expect(random.integer(0,10)).to.equal(0);
      Math.random = function () {
        return 0.99;
      };
      expect(random.integer(0,10)).to.equal(10);
      Math.random = function () {
        return 0.4;
      };
      expect(random.integer(0,10)).to.equal(4);
    });

    it('min defaults to zero', function () {
      Math.random = function () {
        return 0;
      };
      expect(random.integer(40)).to.equal(0);
      Math.random = function () {
        return 0.99;
      };
      expect(random.integer(40)).to.equal(40);
      Math.random = function () {
        return 0.25;
      };
      expect(random.integer(40)).to.equal(10);
    });

  });

  describe('`random.base64`', function () {

    it('utilizes `random.integer`', function () {
      expect(random.base64).to.be.a.function;
      chai.spy.on(random, 'integer');
      random.base64(16);
      expect(random.integer).to.have.been.called();
    });

    it('generates a string of the given size', function () {
      var randStr = random.base64(8);
      expect(randStr).to.be.a.string;
      expect(randStr).to.have.length(8);
      expect(random.base64(101)).to.have.length(101);
      expect(random.base64(58)).to.have.length(58);
    });

    it('generates a random sequence of characters from our base64 character set', function () {
      // make sure to utilize `base64._charSet` (which is already defined over in base64.js)
      var fakeVals = [4/64, 18/64, 8/64, 17/64, 15/64, 17/64, 20/64, 18/64];
      Math.random = function () {
        return fakeVals.pop();
      };
      // the assertion below may be a little over-specific
      // so if it fails but you are confident your random string generator is working in its own way
      // feel free to comment it out
      expect(random.base64(8)).to.equal('surprise');
    });

    /*

    # EXTRA CREDIT

    Replace `Math.random` with your own custom-built pseudorandom number generator.
    For an example algorithm to work towards, check out: https://en.wikipedia.org/wiki/Middle-square_method.

    */

  });

});
