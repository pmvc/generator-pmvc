'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Install PMVC Plugin generator,\n "Create Folder First" \nYou need create folder first by yourself.'
    ));

    var prompts = [
    {
      type: 'input',
      name: 'plugInName',
      message: 'Please input your plug-in name?',
      default: 'my_plug' 
    },
    {
      type: 'input',
      name: 'description',
      message: 'Please input description for plug-in? (will use in php composer)',
      default: 'About ...' 
    },
    {
      type: 'input',
      name: 'keyword',
      message: 'Please input keyword for plug-in? (will use in php composer tagging)',
      default: '' 
    },
    ];

    this.prompt(prompts, function (props) {
      this.props = props;
      this.plugInName = props.plugInName;
      this.description = props.description;
      this.keyword = props.keyword;
      // To access props later use this.props.someOption;
      done();
    }.bind(this));
  },

  writing: {
    app: function () {
      this.fs.copy(
        this.templatePath('phpunit.xml'),
        this.destinationPath('phpunit.xml')
      );
      this.fs.copy(
        this.templatePath('_gitignore'),
        this.destinationPath('.gitignore')
      );
      this.fs.copy(
        this.templatePath('_travis.yml'),
        this.destinationPath('.travis.yml')
      );
      this.fs.copyTpl(
        this.templatePath('composer.json'),
        this.destinationPath('composer.json'),
        {
            plugInName: this.plugInName,
            description: this.description, 
            keyword: this.keyword
        }
      );
      this.fs.copyTpl(
        this.templatePath('hello_world.php'),
        this.destinationPath(this.plugInName+'.php'),
        {
            plugInName: this.plugInName
            ,_INIT_CONFIG: '${_INIT_CONFIG}'
        }
      );
      this.fs.copyTpl(
        this.templatePath('README.md'),
        this.destinationPath('README.md'),
        {
            plugInName: this.plugInName
        }
      );
      this.fs.copyTpl(
        this.templatePath('test.php'),
        this.destinationPath('test.php'),
        {
            plugInName: this.plugInName,
            PlugInName: this.plugInName.charAt(0).toUpperCase() + this.plugInName.slice(1)
        }
      );
    },

    projectfiles: function () {
    }
  }

});
