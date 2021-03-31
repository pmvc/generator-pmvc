<?php

namespace PMVC\PlugIn\<%= plugInName %>;

use PMVC\PlugIn;

// \PMVC\l(__DIR__.'/xxx');

${_INIT_CONFIG}[_CLASS] = __NAMESPACE__.'\<%= plugInName %>';

class <%= plugInName %> extends PlugIn
{
    public function init()
    {
        echo "I'm init. ".PHP_EOL;
    }
}
