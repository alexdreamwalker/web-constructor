<?php

	class Selecter
	{
		private $mysqli;

		public function __construct()
		{
			global $mysqli;
			$this->mysqli = $mysqli;
		}

		public function getSunblindsColors($type, $material, $size)
		{
			$stmt = $this->mysqli->prepare("SELECT * from colors WHERE MaterialID = ? AND TypeID = ? AND Size = ?");
			$stmt->bind_param('ddd', $material, $type, $size);
			if($result = $stmt->execute()) {
				$result = $result->fetch_all(MYSQLI_ASSOC);
				return $result;
			} else return $this->mysqli->error;
		}

		public function getSunblindsTypes()
		{
			if($result = $this->mysqli->query("SELECT * FROM types")) {
				$result = $result->fetch_all(MYSQLI_ASSOC);
				return $result;
			} else return $this->mysqli->error;
		}

		public function getSunblindsMaterials()
		{
			if($result = $this->mysqli->query("SELECT * FROM materials")) {
				$result = $result->fetch_all(MYSQLI_ASSOC);
				return $result;
			} else return $this->mysqli->error;
		}

		public function getSunblindsLamellaSizes()
		{
			if($result = $this->mysqli->query("SELECT DISTINCT Size from colors")) {
				$result = $result->fetch_all(MYSQLI_ASSOC);
				return $result;
			} else return $this->mysqli->error;
		}
	}

?>