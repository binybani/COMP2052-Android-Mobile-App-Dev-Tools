<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Data Retrieved</title>

	<!-- CSS style sheet -->
  <link rel="stylesheet" type="text/css" href="../css/style.css">

	<!-- Google Font -->
	<link rel="preconnect" href="https://fonts.googleapis.com">
 	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
 	<link href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@300;400;500;700&display=swap" rel="stylesheet">

	<!-- jQuery Library goes first - before any other scripts that reqire jQuery -->
	<script src="http://code.jquery.com/jquery-3.4.1.min.js" defer=""></script>

	<!-- Javascript -->
	<script src="../js/assignment02.js" defer="defer"></script>
	<script src="../js/bar.js"></script>
	<script src="../js/pie.js"></script>
	
	<!-- Bootstrap CSS -->
	<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"
		integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">

</head>
<body>
	<div id="wrapper">
	<header>
      <h2 class="title">Client-Server Web App</h2>
    </header>
		<main class="container">
			<section id="graph" class="row shadow p-2 m-2 d-flex justify-content-center rounded-3">
				<h3 class="bold">Data Retrieved</h3>	
				<article class="row">
					<div class="col"></div>
					<div class="border border-info shadow rounded-3 p-2 m-2 col" id="world_name">
						<?php
						$hogwarts = $middleEarth = $westeros = $narnia = $other = 0; /* initialize variables */
						$file = fopen('../data/data.json', 'r') /* open file, 'r' - read */
							or exit('Data not found.'); /*or give error message and exit */
						while(!feof($file)) /* while end of file is not reached */
						{
							$line = fgets($file); /* get one line 라인 하나의 제이슨파일 읽어오기 */
							$data = json_decode($line, TRUE);  /* json-decode it, TRUE=associative array */
							if (!is_array($data)) { continue; } /* not an array? skip */
							foreach ($data as $key => $value) /* traverse the array */
							{
								switch($value) { /* check the value, increment vars */
									case 'Hogwarts':	   	$hogwarts++; break;
									case 'Middle Earth': 	$middleEarth++; break;
									case 'Westeros':  	  $westeros++; break;
									case 'Narnia': 				$narnia++; break;
									case 'Other':  			  $other++; break;
								}
							}
						}
						echo 'Hogwarts: '.$hogwarts.'<br>'; /* output as html */
						echo 'Middle Earth: '.$middleEarth.'<br>';
						echo 'Westeros: '.$westeros.'<br>';
						echo 'Narnia: '.$narnia.'<br>';
						echo 'Other: '.$other.'<br>';
						fclose($file); /* close file */
						?>
						<div class="m-2 p-1 d-flex justify-content-center">
							<button class="rounded-3" id="changeBtn" onClick="switchGraph()"></button>
						</div>	
					</div>
					<div class="col"></div>
        </article><!-- end data article -->
				<article class="row p-5">
					<div class="col"></div>
					<div class="col-5" id="bar1"></div>
					<div class="col-5" id="pie1"></div>
					<div class="col"></div>
					<script>
						new BarChart(
							'bar1', 
							[<?php echo $hogwarts; ?>,
							<?php  echo $middleEarth; ?>,
							<?php  echo $westeros; ?>,
							<?php  echo $narnia; ?>,
							<?php  echo $other; ?>
							]);
					</script>
					<script>
						new PieWithLabels(
							'pie1', 
							[<?php echo $hogwarts; ?>,
							<?php  echo $middleEarth; ?>,
							<?php  echo $westeros; ?>,
							<?php  echo $narnia; ?>,
							<?php  echo $other; ?>
							], ['Hogwarts', 'Middle Earth', 'Westeros', 'Narnia', 'Other']);
					</script>
				</article><!-- end graph article -->
				<article>							
					<button class="p-2 m-2 rounded-3" type="button" id="goMain" class="p-2 m-1 rounded-3" onclick="goMain()">Poll Again</button>
				</article><!-- end button article -->
      </section><!-- end (container) section -->
    </main><!-- end main -->
    <footer>
      <p>Copyright 2023. Beanie Kim. All Rights Reserved.</p>
    </footer><!-- end footer -->
  </div><!-- end wrapper -->
</body>
</html>
