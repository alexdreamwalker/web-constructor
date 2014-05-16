<?php
	// резеревируем константы для подключения к серверу
	define("dbHost", "localhost");
	define("dbLogin", "root");
	define("dbPassword", "1111");
	define("dbName", "constructor");
	
	// установка соединения с БД
	$mysqli = new mysqli(dbHost, dbLogin, dbPassword, dbName);
	$mysqli->query("SET NAMES utf8");
?>