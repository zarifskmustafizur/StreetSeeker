<?php

require_once('db.php');
$query = "select * from leaderboard";
$result = mysqli_query($con,$query);



?>
<!DOCTYPE hmtl>
<html lang = "en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE-edge">
    <meta name="viewport" content="width=device-width, inital-scale=1.0">
    <link rel="stylesheet" href="css/bootstrap.min.css">
    <title>Leaderboard</title>
</head>
<body class="bg-dark">
    <div class="container">
        <div class="row mt-5">
            <div class="col">
                <div class="card mt-5">
                    <div class="card-header">
                        <h2 class="display-6 text-center">Leaderboard></h2>
                    </div>  
                    <div class="card-body">
                        <table class="table table-boardered text-center">
                            <tr class="bg-dark text-white">
                                <td>Position</td>
                                <td>Display name</td>
                                <td>Difficulty</td>
                                <td>Time</td>
                            </tr>
                            <tr>
                            <?php

                                while($row = msqli_fetch_assoc($result)){
                            ?>
                                <td><?php echo $row['id']; ?></td>
                                <td><?php echo $row['displayname']; ?></td>
                                <td><?php echo $row['difficulty']; ?></td>
                                <td><?php echo $row['time']; ?></td>
                            </tr>
                            <?php
                                }
                            ?>
                        </table>
                    </div> 
                </div>
            </div>
        </div>
    </div>
</body>
</html>