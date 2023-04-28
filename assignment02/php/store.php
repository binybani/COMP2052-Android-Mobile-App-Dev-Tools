<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <title>Client-Server Web App</title>

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
      <section class="p-2 m-2">
        <article>
          <h3>Thank you!!</h3>
          <?php
            $file = fopen('../data/data.json', 'a');        /* open file, a - append */
            if($file) {                             /* if file is there */
               fwrite(                              /* write to file */
                  $file,                            /* specified by $file */
                  json_encode($_POST).PHP_EOL);     /* json-encode POSTed data (add end of line) */
               fclose($file);                       /* close file */
               echo '<h3>Data submitted successfully.</h3>'; /* inform of success */
            }
            else {
               echo '<h3>Error opening data file.</h3>';     /* inform of failure */
            }
         ?>
         <button type="button" id="goMain" class="p-2 m-1 rounded-3" onclick="goMain()">Poll Again</button>
        </article><!-- end article -->
      </section><!-- end (container) section -->
    </main><!-- end main -->
    <footer>
      <p>Copyright 2023. Beanie Kim. All Rights Reserved.</p>
    </footer><!-- end footer -->
  </div><!-- end wrapper -->

  <!-- Bootstrap JS Bundle with Popper -->
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
    integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous">
  </script>
</body>

</html>


