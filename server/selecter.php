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
			$stmt = $this->mysqli->prepare("SELECT colors.*, pricelamellas.Price from colors 
											INNER JOIN pricelamellas ON colors.ID = pricelamellas.IDColor 
											WHERE MaterialID = ? AND TypeID = ? AND Size = ?");
			$stmt->bind_param('ddd', $material, $type, $size);
			if($stmt->execute()) {
				$result = $stmt->get_result();
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