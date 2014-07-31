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
  'pads empty buffers': function(test) {
    var result;
    test.expect(1);
    result = pkcs7.unpad(pkcs7.pad(new Uint8Array([])));
    test.deepEqual(new Uint8Array(result, result.byteOffset, result.byteLength),
               new Uint8Array(0),
               'accepts an empty buffer');
    test.done();
  },
  'pads non-empty buffers': function(test) {
    var i = 16, buffer, result;
    test.expect(i * 3);
    while (i--) {
      // build the test buffer
      buffer = new Uint8Array(i + 1);

      result = pkcs7.pad(buffer);
      test.equal(result.length % 16, 0, 'padded length is a multiple of 16');
      test.equal(result.slice(-1)[0], 16 - ((i + 1) % 16), 'appended the correct value');
      result = pkcs7.unpad(result);
      test.deepEqual(new Uint8Array(result, result.byteOffset, result.byteLength),
                     buffer,
                     'padding is reversible');
    }
    test.done();
  },
  'works on buffers greater than sixteen bytes': function(test) {
    var buffer = new Uint8Array(16 * 3 + 9), result;
    test.expect(2);

    test.equal(pkcs7.pad(buffer).length - buffer.length,
               16 - 9,
               'adds the correct amount of padding');
    result = pkcs7.unpad(pkcs7.pad(buffer));
    test.deepEqual(new Uint8Array(result, result.byteOffset, result.byteLength),
                   buffer,
                   'is reversible');
    test.done();
  }
};
