<?php
	header("content-type:text/html;charset='utf-8'");
	$arr = array(
		array('name'=>'jery','age'=>18),
		array('name'=>'Arry','age'=>30),
		array('name'=>'Ide','age'=>27),
		array('name'=>'Wells','age'=>23),
		array('name'=>'mini','age'=>20),
		array('name'=>'vicky','age'=>19),
	);
	//数组以json形式呈现
	echo json_encode($arr);
?>