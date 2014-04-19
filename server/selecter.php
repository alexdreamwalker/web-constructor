<?php

	class Selecter
	{
		private $mysqli;

		public function __construct()
		{
			global $mysqli;
			$this->mysqli = $mysqli;
		}

		public function getSunblindsColors($group, $material)
		{
			if($result = $this->mysqli->query("SELECT * from colors")) {
				$result = $result->fetch_all(MYSQLI_ASSOC);
				return $result;
			} else return $this->mysqli->error;
		}
	}

?>