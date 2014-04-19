<?php

/*
* Simple client class - remote users of camera
* may be fullfilled in future
*/

class Client {
	private $id; //unique identificator
	private $socket; //client communication socket
	private $handshake; //RS1365 handshake flag
	private $pid;
	private $idUser;

	function __construct($id, $socket) {
		$this->id = $id;
		$this->socket = $socket;
		$this->handshake = false;
		$this->pid = null;
		$this->idUser = null;
	}

	public function getId() {
		return $this->id;
	}

	public function getIdUser() {
		return $this->idUser;
	}

	public function setId($id) {
		$this->id = $id;
	}

	public function getSocket() {
		return $this->socket;
	}

	public function setSocket($socket) {
		$this->socket = $socket;
	}

	public function getHandshake() {
		return $this->handshake;
	}

	public function setHandshake($handshake) {
		$this->handshake = $handshake;
	}

	public function getPid() {
		return $this->pid;
	}

	public function setPid($pid) {
		$this->pid = $pid;
	}

	public function setIDUser($id) {
		if(is_numeric($id) && $id >= 0)
			$this->idUser = $id;
	}
}