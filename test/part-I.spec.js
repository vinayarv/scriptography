'use strict';

var chai = require('chai');
chai.use(require('chai-spies'));
var expect = chai.expect;

var random = require('../src/random');

describe('* PART I: random stuff, literally *', function () {

  var originalMathRandom = Math.random;
  afterEach(function () {
    Math.random = originalMathRandom;
  });

  describe('`random.integer`', function () {

    xit('uses `Math.random`', function () {
      expect(random.integer).to.be.a('function');
      chai.spy.on(Math, 'random');
      random.integer(0,1000);
      expect(Math.random).to.have.been.called();
    });

    xit('given a min and max, generates an integer betwixt them', function () {
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

    xit('min defaults to zero', function () {
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

    xit('utilizes `random.integer`', function () {
      expect(random.base64).to.be.a('function');
      chai.spy.on(random, 'integer');
      random.base64(16);
      expect(random.integer).to.have.been.called();
    });

    xit('generates a string of the given size', function () {
      var randStr = random.base64(8);
      expect(randStr).to.be.a('string');
      expect(randStr).to.have.length(8);
      expect(random.base64(101)).to.have.length(101);
      expect(random.base64(58)).to.have.length(58);
    });

    xit('generates a random sequence of characters from our base64 character set', function () {
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
    For an example algorithm to work towards, check out the middle squares method: https://en.wikipedia.org/wiki/Middle-square_method.

    */

  });

});
