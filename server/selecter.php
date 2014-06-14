<?php

	class Selecter
	{
		private $mysqli;

		public function __construct()
		{
			global $mysqli;
			$this->mysqli = $mysqli;
		}

		public function getSunblindsPlacement()
		{
			if($result = $this->mysqli->query("SELECT * FROM placement")) {
				$result = $result->fetch_all(MYSQLI_ASSOC);
				return $result;
			} else return $this->mysqli->error;
		}

		public function getSunblindsSizeLimits()
		{
			if($result = $this->mysqli->query("SELECT * FROM sizelimits")) {
				$result = $result->fetch_all(MYSQLI_ASSOC);
				return $result;
			} else return $this->mysqli->error;
		}

		public function getSunblindsCorrespondness()
		{
			if($result = $this->mysqli->query("SELECT * FROM correspondness")) {
				$result = $result->fetch_all(MYSQLI_ASSOC);
				return $result;
			} else return $this->mysqli->error;
		}

		public function getSunblindsCorniceColors($size)
		{
			if(empty($size))
				$stmt = $this->mysqli->prepare("SELECT cornices.*, pricecornices.Price from cornices 
												INNER JOIN pricecornices ON cornices.ID = pricecornices.IDCornice");
			else {
				$stmt = $this->mysqli->prepare("SELECT cornices.*, pricecornices.Price from cornices 
												INNER JOIN pricecornices ON cornices.ID = pricecornices.IDCornice
												WHERE Size = ?");
				$stmt->bind_param('d', $size);
			}
			if($stmt->execute()) {
				$result = $stmt->get_result();
				$result = $result->fetch_all(MYSQLI_ASSOC);
				return $result;
			} else return $this->mysqli->error;
		}

		public function getSunblindsRopes()
		{
			$stmt = $this->mysqli->prepare("SELECT ropes.*, priceropes.Price from ropes 
											INNER JOIN priceropes ON ropes.ID = priceropes.IDRope");
			if($stmt->execute()) {
				$result = $stmt->get_result();
				$result = $result->fetch_all(MYSQLI_ASSOC);
				return $result;
			} else return $this->mysqli->error;
		}

		public function getSunblindsStaircases()
		{
			$stmt = $this->mysqli->prepare("SELECT staircases.*, pricestaircases.Price from staircases 
											INNER JOIN pricestaircases ON staircases.ID = pricestaircases.IDStaircase");
			if($stmt->execute()) {
				$result = $stmt->get_result();
				$result = $result->fetch_all(MYSQLI_ASSOC);
				return $result;
			} else return $this->mysqli->error;
		}

		public function getSunblindsColors($type, $material, $size)
		{
			if(empty($material)) {
				$stmt = $this->mysqli->prepare("SELECT colors.*, pricelamellas.Price from colors 
												INNER JOIN pricelamellas ON colors.ID = pricelamellas.IDColor
												WHERE TypeID = ? AND Size = ?");
				$stmt->bind_param('dd', $type, $size);
			} else {
				$stmt = $this->mysqli->prepare("SELECT colors.*, pricelamellas.Price from colors 
												INNER JOIN pricelamellas ON colors.ID = pricelamellas.IDColor 
												WHERE MaterialID = ? AND TypeID = ? AND Size = ?");
				$stmt->bind_param('ddd', $material, $type, $size);
			}

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

		public function getSunblindsComplectation()
		{
			$stmt = $this->mysqli->prepare("SELECT complectation.*, pricecomplectation.Price from complectation 
											INNER JOIN pricecomplectation ON complectation.ID = pricecomplectation.IDComplectation");
			if($stmt->execute()) {
				$result = $stmt->get_result();
				$result = $result->fetch_all(MYSQLI_ASSOC);
				return $result;
			} else return $this->mysqli->error;
		}
	}

?>