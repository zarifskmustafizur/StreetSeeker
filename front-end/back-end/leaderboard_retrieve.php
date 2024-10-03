<?php

// Create connection
$conn = new mysqli("dbhost.cs.man.ac.uk","c60196ap","streetseekerpassword","2023_comp10120_x9");

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// SQL query to retrieve name and score, ordered by score in descending order
$sql = "SELECT username, time FROM leaderboard ORDER BY time DESC";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // Output data of each row
    echo "<h1>Leaderboard</h1>";
    echo "<table border='1'><tr><th>username</th><th>Time</th></tr>";
    while($row = $result->fetch_assoc()) {
        echo "<tr><td>".$row["username"]."</td><td>".$row["Time"]."</td></tr>";
    }
    echo "</table>";
} else {
    echo "0 results";
}

$conn->close();
?>