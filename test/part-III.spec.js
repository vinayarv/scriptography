'use strict';

var chai = require('chai');
chai.use(require('chai-spies'));
var expect = chai.expect;

var utils = require('../src/utils');
var random = require('../src/random');
var CSC = require('../src/CSC');
var OTP = require('../src/OTP');

describe('* PART III: encyrption conniption *', function () {

  describe('Caesar shift cipher', function () {

    describe('`CSC.generateKey`', function () {

      var originalMathRandom = Math.random;
      afterEach(function () {
        Math.random = originalMathRandom;
      });

      xit('is different each time', function () {
        expect(CSC.generateKey).to.be.a('function');
        // technically this assertion will very infrequently fail even if you do everything correctly
        expect(CSC.generateKey()).to.not.equal(CSC.generateKey());
      });

      xit('generates a random integer from 1 to 4095 (one less than the size of our ASCII alphabet)', function () {
        chai.spy.on(random, 'integer');
        expect(CSC.generateKey()).to.be.a('number');
        expect(random.integer).to.have.been.called();
        Math.random = function () {
          return 0;
        };
        expect(CSC.generateKey()).to.equal(1);
        Math.random = function () {
          return 0.99999;
        };
        expect(CSC.generateKey()).to.equal(4095);
      });

    });

    describe('`CSC.encrypt`', function () {

      xit('given a key and ASCII plaintext returns base64 ciphertext of the same *byte size*', function () {
        expect(CSC.encrypt).to.be.a('function');
        var ciphertext = CSC.encrypt(300, 'how now brown cow?');
        expect(ciphertext).to.be.a('string');
        expect(utils.base64ToAscii(ciphertext)).to.have.length(18);
      });

      xit('offsets the resulting ciphertext by the key', function () {
        // HINT: make sure to shift the original ASCII text *before* converting to base64
        var ciphertext1 = CSC.encrypt(1, 'aAxfoo');
        expect(utils.base64ToAscii(ciphertext1)).to.equal('bBygpp');
        var ciphertext2 = CSC.encrypt(4, 'FULLSTACKhoorah');
        expect(utils.base64ToAscii(ciphertext2)).to.equal('JYPPWXEGOlssvel');
      });

    });

    describe('`CSC.decrypt`', function () {

      xit('given a key and some base64 ciphertext returns ASCII plaintext of the same *byte size*', function () {
        expect(CSC.decrypt).to.be.a('function');
        var ciphertext = utils.asciiToBase64('the quick brown fox jumps over the lazy dog');
        var plaintext = CSC.decrypt(158, ciphertext);
        expect(plaintext).to.be.a('string');
        expect(plaintext).to.have.length(43);
      });

      xit('de-offsets the resulting plaintext by the key', function () {
        var ciphertext1 = utils.asciiToBase64('mellow');
        var plaintext1 = CSC.decrypt(1, ciphertext1);
        expect(plaintext1).to.equal('ldkknv');
        var ciphertext2 = utils.asciiToBase64('ThAnks...');
        var plaintext2 = CSC.decrypt(4, ciphertext2);
        expect(plaintext2).to.equal('Pd=jgo***');
      });

    });

    describe('is symmetric', function () {

      xit('decrypt comes back with what encrypt started with', function () {
        var original = 'This is incredible right?';
        var cloned = CSC.decrypt(589, CSC.encrypt(589, original));
        expect(cloned).to.equal(original);
      });

      xit('fails to decrypt with the wrong key', function () {
        var original = 'How about that?';
        var cloned = CSC.decrypt(123, CSC.encrypt(456, original));
        expect(cloned).to.not.equal(original);
      });

    });

  });

  describe('one time pad', function () {

    describe('`OTP.generateKey`', function () {

      xit('is different each time', function () {
        expect(OTP.generateKey).to.be.a('function');
        expect(OTP.generateKey(16)).to.not.equal(OTP.generateKey(16));
      });

      xit('produces a random base64 string of the given length', function () {
        chai.spy.on(random, 'base64');
        var key = OTP.generateKey(4);
        expect(random.base64).to.have.been.called();
        expect(key).to.be.a('string');
        expect(key).to.have.length(4);
      });

    });

    describe('`OTP.encrypt`', function () {

      var key;
      beforeEach(function () {
        // an example key to work with, 64 characters long
        key = 'bBM4byLnS7yTy6Vwhl578dAulQ7wrss3RtUJhzIR_xqnuPGOxOlzLdWfMmS1d2xb';
      });

      xit('given a key and ASCII plaintext returns base64 ciphertext of the same *byte size*', function () {
        expect(OTP.encrypt).to.be.a('function');
        // NOTE: the key might be larger than the plaintext, simply don't use the whole key
        var ciphertext = OTP.encrypt(key, 'Message in a bottle');
        expect(ciphertext).to.be.a('string');
        expect(utils.base64ToAscii(ciphertext)).to.have.length(19);
      });

      xit('uses XOR to produce a noisy result', function () {
        var plaintext = 'A humorous but secret message';
        var ciphertext = OTP.encrypt(utils.asciiToBase64(plaintext), plaintext);
        expect(ciphertext).to.be.a('string');
        for (var i = 0; i < ciphertext.length; i++) {
          // any number XORed with itself outputs 0, e.g. 1034 ^ 1034 === 0, and 0 corresponds to base64 character 'a', so we get all 'a's
          expect(ciphertext[i]).to.equal('a');
        }
        // totally different example
        expect(OTP.encrypt(key, 'Good job so far')).to.equal('gAj5Uzbmm7YS37nxNlk6tc6uTRAxJt');
      });

    });

    describe('`OTP.decrypt`', function () {

      var key;
      beforeEach(function () {
        // an example key to work with, 64 characters long
        key = 'bBM4byLnS7yTy6Vwhl578dAulQ7wrss3RtUJhzIR_xqnuPGOxOlzLdWfMmS1d2xb';
      });

      xit('given a key and some base64 ciphertext returns ASCII plaintext of the same *byte size*', function () {
        expect(OTP.decrypt).to.be.a('function');
        // NOTE: the key might be larger than the ciphertext, simply don't use the whole key
        var plaintext = OTP.decrypt(key, 'mAd5Yzwmn6$S97pwUkx6Cd7vRQzx_tM2FscIIy');
        expect(plaintext).to.be.a('string');
        expect(utils.asciiToBase64(plaintext)).to.have.length(38);
      });

      xit('uses XOR to unscramble the ciphertext', function () {
        var ciphertext = '1u32f1kjf';
        var plaintext = OTP.decrypt(ciphertext, ciphertext);
        expect(plaintext).to.be.a('string');
        for (var i = 0; i < plaintext.length; i++) {
          expect(plaintext.charCodeAt(i)).to.equal(0);
        }
        // totally different example
        expect(OTP.decrypt(key, 'gAj5Uzbmm7YS37nxNlk6tc6uTRAxJt')).to.equal('Good job so far');
      });

    });

    describe('is symmetric', function () {

      xit('decrypt comes back with what encrypt started with', function () {
        var key = OTP.generateKey(16);
        var original = 'Secretly';
        var cloned = OTP.decrypt(key, OTP.encrypt(key, original));
        expect(original).to.equal(cloned);
      });

      xit('fails to decrypt with the wrong key', function () {
        var encryptionKey = OTP.generateKey(16);
        var wrongKey = OTP.generateKey(16);
        var original = 'Secretly';
        var cloned = OTP.decrypt(wrongKey, OTP.encrypt(encryptionKey, original));
        expect(cloned).to.not.equal(original);
      });

    });

  });

});
