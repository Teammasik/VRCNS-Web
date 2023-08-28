
<?php
require_once 'connect.php';

//$sql = "SELECT * FROM `students`";
//%products = mysqli_query($connect,"SELECT * FROM `students`");
//$products = $connect->query("SELECT * FROM `students`");
//$products = mysqli_fetch_all($products);
?>

<meta charset="UTF-8" />
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Products</title>
</head>
<style>
	th, td{
		padding: 10px;
	}
	th {
		background: #606060;
		color: #fff;
	}
	td {
		background: #b5b5b5;
	}
</style>

<body>

	<div class="row">
		<div class="col-md-12 head">
			<div class="float-right">
				<a href="export.php" class="btn btn-success"><i class="dwn"></i> Export</a>
			</div>
		</div>


    <table>
        <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Surname</th>
            <th>Group</th>
			<th>Mark</th>
			<th>Delete</th>
			
        </tr>
		
			<?php
				$products = $connect->query("SELECT * FROM `students`");
				$products = mysqli_fetch_all($products);
				foreach ($products as $item){

					?> 
						<tr>
							<td><?= $item[0] ?></td>
							<td><?= $item[1] ?></td>
							<td><?= $item[2] ?></td>
							<td><?= $item[3] ?></td>
							<td><?= $item[4] ?></td>
							<td><a style="color: red;" href= "delete.php?id=<?= $item[0] ?>">Delete</a></td>
						</tr>
					<?php
				}
				
				
				
				
				//print_r($products);
				//var_dump($products);
			?>
    </table>
	
	
    <form action="start.php" method="post">
        <button type="submit">Get back
    </form>

	</div>
	
</body>
</html>