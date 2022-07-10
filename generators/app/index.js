const { YoGenerator, YoHelper, commonPrompt } = require("yo-reshow");

module.exports = class extends YoGenerator {
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

  /**
   * Using lists in a yeoman prompt
   *
   * https://www.alwaystwisted.com/post.php?s=using-lists-in-a-yeoman-generator
   * https://github.com/SBoudrias/Inquirer.js
   */
  async prompting() {
    const prompts = [
      ...commonPrompt.mainName(this, {
        tip: 'Before "PMVC Plugin"\n\n!! Need Create Folder First !!\n\nYou need create folder by yourself.',
        isReady: ({ destFolderName }) =>
          `We will put files to [${destFolderName}], do you already create plug-in folder?`,
        mainName: "Please input your plug-in name?",
      }),
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
    ];
    const answers = await this.prompt(prompts);
    this.props = answers;
    this.plugInName = answers.mainName;
    this.description = answers.description;
    this.keyword = answers.keyword || this.plugInName;
  }

  writing() {
    const { cp, mkdir } = YoHelper(this);

    mkdir("tests");
    mkdir("src");
    mkdir(".circleci");
    cp("phpunit.xml");
    cp("_gitignore", ".gitignore");
    cp("tests/include.php", "tests/include.php");

    cp("_circleci/config.yml", ".circleci/config.yml", {
      plugInName: this.plugInName,
    });

    cp("composer.json", "composer.json", {
      plugInName: this.plugInName,
      description: this.description,
      keyword: this.keyword,
    });

    cp("hello_world.php", this.plugInName + ".php", {
      plugInName: this.plugInName,
      _INIT_CONFIG: "${_INIT_CONFIG}",
    });

    cp("README.md", "README.md", {
      plugInName: this.plugInName,
    });

    cp("tests/test.php", "tests/test.php", {
      plugInName: this.plugInName,
      PlugInName:
        this.plugInName.charAt(0).toUpperCase() + this.plugInName.slice(1),
    });
  }
};
