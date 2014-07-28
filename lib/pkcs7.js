/*
 * pkcs7
 * https://github.com/brightcove/pkcs7
 *
 * Copyright (c) 2014 Brightcove
 * Licensed under the apache2 license.
 */

'use strict';

/**
 * Returns a new Buffer that is padded with PKCS#7 padding.
 * @param plaintext {Buffer} the input bytes before encryption
 * @return {Buffer} the padded bytes
 * @see http://tools.ietf.org/html/rfc5652
 */
exports.pad = function(plaintext) {
  var padding = 16 - (plaintext.length % 16),
      result = new Buffer(plaintext.length + padding);
  plaintext.copy(result);
  result.fill(padding, plaintext.length);
  return result;
};

/**
 * Returns a new Buffer that has PKCS#7 padding removed.
 * @param padded {Buffer} unencrypted bytes that have been padded
 * @return {Buffer} the unpadded bytes
 * @see http://tools.ietf.org/html/rfc5652
 */
exports.unpad = function(padded) {
  var padding = padded[padded.length - 1],
      result = new Buffer(padded.length - padding);
  padded.copy(result);
  return result;
};
