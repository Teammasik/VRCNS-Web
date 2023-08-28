<?php
include_once 'connect.php';
date_default_timezone_set('UTC');


function filterData(&$str){
	$str = preg_replace("/\t/", "\\t", $str);
	$str = preg_replace("/\r?\n/", "\\n", $str);
	if(strstr($str, '"')) $str = '"' . str_replace('"','""', $str) . '"';
}

$curd = date('Ymd');
$filename = "students-data_" . ".xls";
//$fileName = "students-data_" .date('Ymd') . ".csv"; 
//$fileName = "students-data_" .$curd . ".csv"; 

$fields = array('ID', 'Name', 'Surname', 'Group', 'Mark');

$excelData = implode("\t", array_values($fields)) . "\n";

$query = $connect->query("SELECT * FROM `students`");

if($query->num_rows > 0){
	while($row = $query->fetch_assoc()){
		$lineData = array($row['id'], 
		mb_convert_encoding($row['username'], 'Windows-1251', 'UTF-8'), 
		mb_convert_encoding($row['usersurname'], 'Windows-1251', 'UTF-8'),
		mb_convert_encoding($row['usergroup'], 'Windows-1251', 'UTF-8'),
		mb_convert_encoding($row['mark'], 'Windows-1251', 'UTF-8'));
		/*$row['username'],
		$row['usersurname'], 
		$row['usergroup'], 
		$row['mark']);*/
		array_walk($lineData, 'filterData');
		$excelData .= implode("\t", array_values($lineData)) . "\n";
	}
}else{
	$excelData .= 'No records found'. "\n";
}

//header("Content-Type: application/vnd.ms-excel");
header("Content-Type: application/xls");

header("Content-Disposition: attachment; filename=\"$filename\"");


echo $excelData;

exit;