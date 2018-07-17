<?php
/**
 * Created by PhpStorm.
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
$js_v="?2018-07-13-001";
$css_v="?2018-07-13-001";
$img_v="?2018-07-13-001";
include "templet/common/urlConfig.php";
include "templet/".$model.".php";
