<?php
require_once 'connect.php';

$id = $_GET['id'];

$connect->query("DELETE FROM `students` WHERE `students`.`id` = '$id'");

header('Location: http://localhost/Web/index.php');

