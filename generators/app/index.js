const yeoman = require("yeoman-generator");
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");
const mkdirp = require("mkdirp");

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
    this.keyword = answers.keyword || answers.plugInName;
  }
  writing() {
    const copy = (src, dest, options) => {
      const action = options ? this.fs.copyTpl : this.fs.copy;
      try {
        action.call(
          this.fs,
          this.templatePath(src),
          this.destinationPath(dest),
          options
        );
      } catch (e) {
        console.log(e);
      }
    };

    mkdirp(this.destinationPath("tests"));
    mkdirp(this.destinationPath("src"));
    mkdirp(this.destinationPath(".circleci"));

    copy("phpunit.xml", "phpunit.xml");
    copy("_gitignore", ".gitignore");
    copy("tests/include.php", "tests/include.php");
    copy("_circleci/config.yml", ".circleci/config.yml");

    copy("composer.json", "composer.json", {
      plugInName: this.plugInName,
      description: this.description,
      keyword: this.keyword,
    });

    copy("hello_world.php", this.plugInName + ".php", {
      plugInName: this.plugInName,
      _INIT_CONFIG: "${_INIT_CONFIG}",
    });

    copy("README.md", "README.md", {
      plugInName: this.plugInName,
    });

    copy("tests/test.php", "tests/test.php", {
      plugInName: this.plugInName,
      PlugInName:
        this.plugInName.charAt(0).toUpperCase() + this.plugInName.slice(1),
    });
  }
};
