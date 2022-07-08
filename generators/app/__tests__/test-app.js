/**
 * https://yeoman.io/authoring/testing.html
 * https://gilsondev.gitbooks.io/yeoman-authoring/content/authoring/unit_testing.html
 */
const { YoTest, assert } = require("yo-unit");

describe("php-pmvc-plugin:app", () => {
  let runResult;

  before(async () => {
    runResult = await YoTest({
      source: __dirname + "/../.",
      params: {
        isReady: true,
        plugInName: "foo",
        description: "foo-desc",
        keyword: "foo-keyword",
      },
    });
  });

  after(()=>{
    if (runResult) {
      runResult.restore();
    }
  });

  it("should have folder", () => {
    assert.file(["tests", "src", ".circleci"]);
  });

  it("should have file", () => {
    assert.file(["phpunit.xml", ".gitignore", "tests/include.php"]);
  });

  it("should have tpl", () => {
    assert.file([
      "composer.json",
      "foo.php",
      "README.md",
      "tests/test.php",
      ".circleci/config.yml",
    ]);
  });

  it("should have content", () => {
    assert.fileContent("composer.json", "foo-desc");
    assert.fileContent(".circleci/config.yml", "foo");
  });
});
