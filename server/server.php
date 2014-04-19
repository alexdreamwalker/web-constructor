#!/usr/bin/php -q
<?php
header('Access-Control-Allow-Origin: *'); 
error_reporting(E_ALL);
require_once "client.class.php";
require_once "server.class.php";
set_time_limit(0);

session_start();

//initialize input params

if(count($argv) < 2) {
	echo "invalid number of input params";
	exit();
}

$nl = "\r\n";
$address = $argv[1];
$port = $argv[2];

//exec("export LD_LIBRARY_PATH=/usr/lib/mjpg-streamer");
//exec('mjpg_streamer -i "input_uvc.so -y -d /dev/video0 -r 640x480 -f 15" -o "output_http.so -w /srv/www/htdocs -p '.$video_port.'" > /dev/null 2>/dev/null &');

//initialize server

$server = new Server($address, $port);
$server->run();

?>