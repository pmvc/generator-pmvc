[![Latest Stable Version](https://poser.pugx.org/pmvc-plugin/<%= plugInName %>/v/stable)](https://packagist.org/packages/pmvc-plugin/<%= plugInName %>) 
[![Latest Unstable Version](https://poser.pugx.org/pmvc-plugin/<%= plugInName %>/v/unstable)](https://packagist.org/packages/pmvc-plugin/<%= plugInName %>) 
[![Build Status](https://travis-ci.org/pmvc-plugin/<%= plugInName %>.svg?branch=master)](https://travis-ci.org/pmvc-plugin/<%= plugInName %>)
[![License](https://poser.pugx.org/pmvc-plugin/<%= plugInName %>/license)](https://packagist.org/packages/pmvc-plugin/<%= plugInName %>)
[![Total Downloads](https://poser.pugx.org/pmvc-plugin/<%= plugInName %>/downloads)](https://packagist.org/packages/pmvc-plugin/<%= plugInName %>) 

<%= plugInName %>
===============

## Install with Composer
### 1. Download composer
   * mkdir test_folder
   * curl -sS https://getcomposer.org/installer | php

### 2. Install by composer.json or use command-line directly
#### 2.1 Install by composer.json
   * vim composer.json
```
{
    "require": {
        "pmvc-plugin/<%= plugInName %>": "dev-master"
    }
}
```
   * php composer.phar install

#### 2.2 Or use composer command-line
   * php composer.phar require pmvc-plugin/<%= plugInName %>

