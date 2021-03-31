var yeoman = require("yeoman-generator");
var Generator = require("yeoman-generator");
var chalk = require("chalk");
var yosay = require("yosay");
var mkdirp = require("mkdirp");

module.exports = class extends Generator {
  async prompting() {
    this.log(
      yosay(
        'Before start "PMVC Plugin" generator,\n "Need Create Folder First" \nYou need create folder first by yourself.'
      )
    );

    var folders = this.destinationRoot().split("/");

    const answers = await this.prompt([
      {
        type: "input",
        name: "plugInName",
        message: "Please input your plug-in name?",
        default: folders[folders.length - 1],
      },
      {
        type: "input",
        name: "description",
        message:
          "Please input description for plug-in? (will use in php composer)",
        default: "About ...",
      },
      {
        type: "input",
        name: "keyword",
        message:
          "Please input keyword for plug-in? (will use in php composer tagging)",
        default: "",
      },
    ]);
    this.props = answers;
    this.plugInName = answers.plugInName;
    this.description = answers.description;
    this.keyword = answers.keyword;
  }
  writing() {
    this.fs.copy(
      this.templatePath("phpunit.xml"),
      this.destinationPath("phpunit.xml")
    );
    this.fs.copy(
      this.templatePath("_gitignore"),
      this.destinationPath(".gitignore")
    );
    this.fs.copy(
      this.templatePath("_travis.yml"),
      this.destinationPath(".travis.yml")
    );
    this.fs.copyTpl(
      this.templatePath("composer.json"),
      this.destinationPath("composer.json"),
      {
        plugInName: this.plugInName,
        description: this.description,
        keyword: this.keyword,
      }
    );
    this.fs.copyTpl(
      this.templatePath("hello_world.php"),
      this.destinationPath(this.plugInName + ".php"),
      {
        plugInName: this.plugInName,
        _INIT_CONFIG: "${_INIT_CONFIG}",
      }
    );
    this.fs.copyTpl(
      this.templatePath("README.md"),
      this.destinationPath("README.md"),
      {
        plugInName: this.plugInName,
      }
    );
    mkdirp(this.destinationPath("tests"));
    mkdirp(this.destinationPath("src"));
    this.fs.copy(
      this.templatePath("tests/include.php"),
      this.destinationPath("tests/include.php")
    );
    this.fs.copyTpl(
      this.templatePath("tests/test.php"),
      this.destinationPath("tests/test.php"),
      {
        plugInName: this.plugInName,
        PlugInName:
          this.plugInName.charAt(0).toUpperCase() + this.plugInName.slice(1),
      }
    );
  }
};
