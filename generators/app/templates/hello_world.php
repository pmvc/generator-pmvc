<?php
namespace PMVC\PlugIn\<%= plugInName %>;

// \PMVC\l(__DIR__.'/xxx.php');

${_INIT_CONFIG}[_CLASS] = __NAMESPACE__.'\<%= plugInName %>';

class <%= plugInName %> extends \PMVC\PlugIn
{
    public function init()
    {
        echo "I'm init\n";
    }
}
