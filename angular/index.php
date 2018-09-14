<?php
/**
 * 
 * User: caoshanbin
 * Date: 2018/5/25
 * Time: 10:32
 */
$model=isset($_GET["loadmodel"])?$_GET["loadmodel"]:"";
if(!$model)
{
    $model="index";
}
$tpl_path="./templet/";
$js_v="?t=2018-09-14-006";
$css_v="?t=2018-09-14-006";
$img_v="?t=2018-09-14-006";
include "templet/common/urlConfig.php";
include "templet/".$model.".php";
