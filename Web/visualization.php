<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  <title>Visualization page</title>

<?php
	require_once 'connect.php';

	
	$query1 = $connect->query("
	SELECT count(mark) FROM `students` WHERE mark = 0
	");
	$query2 = $connect->query("
	SELECT COUNT(mark) FROM `students` WHERE mark = 1
	");
	
	$row = mysqli_fetch_row($query1);
	//echo $row[0];
	
	$grData = array($row[0], mysqli_fetch_row($query2));
	$labs = array("незачет","зачет");

  // visualization.php
  
    $query3 = $connect->query("
	select extract(MONTH from udate) as month,COUNT(mark) as total_value from `students` where udate IS NOT NULL group by month
	");
	
	//$months = mysqli_fetch_all($query3, MYSQLI_ASSOC);
	//$months = mysqli_fetch_all($query3);
	//print_r($months[0]);
	//while($row = mysqli_fetch_assoc($query3)){
	//	echo $row['total_value'];
	//}

	$monthamount = array();
	$monthdata = array("январь","февраль","март","апрель","май","июнь","июль","август","сентябрь","октябрь","ноябрь","декабрь");
	
	while($row = mysqli_fetch_assoc($query3)){
		$monthamount[$row['month']] = $row['total_value'];
		//array_push($monthamount, $row['total_value']);
	}
	//print_r($monthamount);

?>

<div style="width: 500px;">
  <canvas id="myChart"></canvas>
</div>

<div style="width: 500px;">
  <canvas id="mynChart"></canvas>
</div>

<style>
	form{
		padding: 4px;
	}
</style>

<body>

	<script>
  const labels = <?php echo json_encode($labs) ?>;
  const data = {
    labels: labels,
    datasets: [{
      label: 'null',
      data: <?php echo json_encode($grData) ?>,
      backgroundColor: [
        'rgba(220,20,60, 0.8)',
        'rgba(34, 139, 34, 0.8)',
        'rgba(255, 205, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(201, 203, 207, 0.2)'
      ],
      borderColor: [
        'rgb(220,20,60)',
        'rgb(34,139,34)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        'rgb(54, 162, 235)',
        'rgb(153, 102, 255)',
        'rgb(201, 203, 207)'
      ],
      borderWidth: 1
    }]
  };
  
	//const labels2 = <?php echo json_encode($monthdata) ?>;
    const data2 = {
    //labels: labels2,
    datasets: [{
      label: 'Количество прохождений по месяцам',
      data: <?php echo json_encode($monthamount) ?>,

      borderWidth: 1
    }]
  };

  const config = {
	  type: 'doughnut',
    data: data,
    options: {
    },
  };
  
    const config2 = {
    type: 'bar',
    data: data2,
    options: {
    },
  };

  var myChart = new Chart(
    document.getElementById('myChart'),
    config
  );
  
  var mynChart = new Chart(
    document.getElementById('mynChart'),
    config2
  );

</script>

	Вместо чисел будут месяцы

    <form action="start.php" method="post">
        <button type="submit">get back
    </form>

</body>
</html>