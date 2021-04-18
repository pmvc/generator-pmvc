/**
 * https://yeoman.io/authoring/testing.html
 */
var path = require("path");
var helpers = require("yeoman-test");
var assert = require("yeoman-assert");
var os = require("os");

describe("php-pmvc-plugin:app", function () {
  before(function (done) {
    helpers
      .run(path.join(__dirname, "../generators/app"))
      .withOptions({ skipInstall: true })
      .withPrompts({ isReady: true })
      .on("end", done);
  });

  it("creates files", function () {
    assert.noFile();
  });
});
