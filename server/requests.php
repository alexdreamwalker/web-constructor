<?php

	header("Access-Control-Allow-Origin: *");

	require_once("db.php");
	require_once("selecter.php");

	$selecter = new Selecter();

	function make($data)
	{
		global $selecter;
		$params = $data['params'];
		switch($data['cmd'])
		{
			case 'getSunblindsColors': 
				$type = $params['idType'];
				$material = $params['idMaterial'];
				$size = $params['size'];
				return json_encode($selecter->getSunblindsColors($type, $material, $size));
				break;
			case 'getSunblindsLamellaSizes':
				return json_encode($selecter->getSunblindsLamellaSizes());
				break;
			case 'getSunblindsTypes':
				return json_encode($selecter->getSunblindsTypes());
				break;
			case 'getSunblindsMaterials':
				return json_encode($selecter->getSunblindsMaterials());
				break;
			case 'getSunblindsPlacement':
				return json_encode($selecter->getSunblindsPlacement());
				break;
			case 'getSunblindsComplectation':
				return json_encode($selecter->getSunblindsComplectation());
				break;
			case 'getSunblindsSizeLimits':
				return json_encode($selecter->getSunblindsSizeLimits());
				break;
			case 'getSunblindsCorrespondness':
				return json_encode($selecter->getSunblindsCorrespondness());
				break;
			case 'getSunblindsCorniceColors':
				$size = $params['size'];
				return json_encode($selecter->getSunblindsCorniceColors($size));
				break;
			case 'getSunblindsRopes':
				return json_encode($selecter->getSunblindsRopes());
				break;
			case 'getSunblindsStaircases':
				return json_encode($selecter->getSunblindsStaircases());
				break;
			default: break;
		}
	};

?>