<?php
require_once 'connect.php';

//$sql = "SELECT * FROM `students`";
//%products = mysqli_query($connect,"SELECT * FROM `students`");
$products = $connect->query("SELECT * FROM `students`");
$products = mysqli_fetch_all($products);


var_dump($products);
//<?=$products[0] ?>



?>