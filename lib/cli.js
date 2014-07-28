#! /usr/bin/env node

'use strict';

var pkcs7 = require('./pkcs7');
var fs = require('fs');
var path = require('path');

var userArgs = process.argv;

if (userArgs.indexOf('-h') !== -1 || userArgs.indexOf('--help') !== -1) {
  console.log('usage: pkcs7');
  return console.log('pkcs7 expects input on stdin and outputs to stdout');
}

if (userArgs.indexOf('-v') !== -1 || userArgs.indexOf('--version') !== -1) {
  return console.log(JSON.parse(fs.readFileSync(path.join(process.cwd(), 'package.json'))).version);
}

var data = [];
process.stdin.on('readable', function() {
  var chunk = process.stdin.read();
  if (chunk !== null) {
    data.push(chunk);
  }
});

process.stdin.on('end', function() {
  var length = 0, i = data.length, input;

  // figure out how much space needs to be allocated
  while (i--) {
    length += data[i].length;
  }
  input = new Buffer(length);

  // copy everything into the input buffer
  for (i = 0, length = 0; i < data.length; i++) {
    input.copy(data[i], length);
    length += data[i].length;
  }

  // output the padded input
  process.stdout.write(pkcs7.pad(input));
});
