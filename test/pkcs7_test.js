'use strict';

var pkcs7 = require('../lib/pkcs7.js');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.pkcs7 = {
  setUp: function(done) {
    // setup here
    done();
  },
  'pads empty buffers': function(test) {
    test.expect(1);
    test.deepEqual(pkcs7.unpad(pkcs7.pad(new Buffer([]))),
               new Buffer(0),
               'accepts an empty buffer');
    test.done();
  },
  'pads non-empty buffers': function(test) {
    var i = 16, buffer;
    test.expect(i * 3);
    while (i--) {
      // build the test buffer
      buffer = new Buffer(i + 1);
      buffer.fill(0xff);

      test.equal(pkcs7.pad(buffer).length % 16, 0, 'padded length is a multiple of 16');
      test.equal(pkcs7.pad(buffer).slice(-1)[0], 16 - ((i + 1) % 16), 'appended the correct value');
      test.deepEqual(pkcs7.unpad(pkcs7.pad(buffer)), buffer, 'padding is reversible');
    }
    test.done();
  },
  'works on buffers greater than sixteen bytes': function(test) {
    var buffer = new Buffer(16 * 3 + 9);
    test.expect(2);
    buffer.fill(0xff);

    test.equal(pkcs7.pad(buffer).length - buffer.length,
               16 - 9,
               'adds the correct amount of padding');
    test.deepEqual(pkcs7.unpad(pkcs7.pad(buffer)), buffer, 'is reversible');
    test.done();
  }
};
