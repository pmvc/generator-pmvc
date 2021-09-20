/**
 * https://yeoman.io/authoring/testing.html
 * https://gilsondev.gitbooks.io/yeoman-authoring/content/authoring/unit_testing.html
 */
const path = require("path");
const helpers = require("yeoman-test");
const assert = require("yeoman-assert");
const os = require("os");
const fs = require("fs");

describe("php-pmvc-plugin:app", () => {
  before((done) => {
    helpers
      .run(path.join(__dirname, "../."))
      .inTmpDir(dir=>{console.log('Test folder: '+ dir)})
      .withPrompts({
        isReady: true,
        plugInName: "foo",
        description: "foo-desc",
        keyword: "foo-keyword",
      })
      .on("end", () => {
        done();
      });
  });

  it("should have folder", () => {
    assert.file(['tests', 'src', '.circleci']);
  });

  it("should have file", () => {
    assert.file(['phpunit.xml', '.gitignore', 'tests/include.php', '.circleci/config.yml']);
  });

  it("should have tpl", () => {
    assert.file(['composer.json', 'foo.php', 'README.md', 'tests/test.php']);
  });

  it("should have content", () => {
    assert.fileContent('composer.json', 'foo-desc');
  });
});
