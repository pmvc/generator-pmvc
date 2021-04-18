var yeoman = require("yeoman-generator");
var Generator = require("yeoman-generator");
var chalk = require("chalk");
var yosay = require("yosay");
var mkdirp = require("mkdirp");

module.exports = class extends Generator {
  // note: arguments and options should be defined in the constructor.
  constructor(args, opts) {
    super(args, opts);

    // This makes `appname` a required argument.
    // this.argument("appname", { type: String, required: true });

    // And you can then access it later; e.g.
    // this.log(this.options.appname);
  }

  /**
   * Run loop (Life cycle)
   * https://yeoman.io/authoring/running-context.html#the-run-loop
   *
   * 1. initializing
   * 2. prompting
   * 3. configuring
   * 4. default
   * 5. writing
   * 6. conflicts
   * 7. install
   * 8. end
   */

  async prompting() {
    // https://github.com/yeoman/environment/blob/main/lib/util/log.js
    this.log(
      yosay(
        'Before "PMVC Plugin"\n\n!! Need Create Folder First !!\n\nYou need create folder by yourself.',
        { maxLength: 30 }
      )
    );

    const folders = this.destinationRoot().split("/");
    const folderName = folders[folders.length - 1];

    const answers = await this.prompt([
      {
        type: "confirm",
        name: "isReady",
        message: `We will put files at [${folderName}], do you already create plug-in folder?`,
        default: false,
      },
      {
        when: (response) => {
          if (!response.isReady) {
            process.exit(0);
          }
        },
      },
      {
        type: "input",
        name: "plugInName",
        message: "Please input your plug-in name?",
        default: folderName,
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
