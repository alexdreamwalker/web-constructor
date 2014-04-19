<?php

	header("Access-Control-Allow-Origin: *");

	require_once("db.php");
	require_once("selecter.php");

	$selecter = new Selecter();

	function make($data)
	{
		global $selecter;
		$params = $data['params'];
		switch($data['cmd']);
		{
			case "getSunblindsColors": 
				$group = $params['idGroup'];
				$material = $params['idMaterial'];
				return json_encode($selecter->getSunblindsColors($group, $material));
				break;
			default: break;
		}
	};

?>