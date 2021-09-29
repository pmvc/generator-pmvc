<?php
namespace PMVC\PlugIn\<%= plugInName %>;

use PMVC\TestCase;

class <%= PlugInName %>Test extends TestCase
{
    private $_plug = '<%= plugInName %>';
    function testPlugin()
    {
        ob_start();
        print_r(\PMVC\plug($this->_plug));
        $output = ob_get_contents();
        ob_end_clean();
        $this->haveString($this->_plug,$output);
    }

}
