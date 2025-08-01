<?php
require 'conexao.php';

$name = $_POST['name'];
$price = $_POST['price'];
$location = $_POST['location'];
$bedrooms = $_POST['bedrooms'];
$bathrooms = $_POST['bathrooms'];
$area = $_POST['area'];
$parking = $_POST['parking'];
$image = $_FILES['image']['name'];
$localImage = $_FILES['image']['tmp_name'];
move_uploaded_file($localImage,"../fotos/$image");
$type = $_POST['type'];

$sql = "INSERT INTO tbimoveis (name, price, location, bedrooms, bathrooms, area, parking, image, type)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
$stmt = $pdo->prepare($sql);
$stmt->execute([$name, $price, $location, $bedrooms, $bathrooms, $area, $parking, $image, $type]);

header("Location: index.php");
exit;
?>
