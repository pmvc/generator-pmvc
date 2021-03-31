'use strict';

var path = require('path');
var helpers = require('yeoman-test');
var os = require('os');

describe('php-pmvc-plugin:app', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/app'))
      .withOptions({ skipInstall: true })
      .withPrompts({ someOption: true })
      .on('end', done);
  });

  it('creates files', function () {
  });
});
