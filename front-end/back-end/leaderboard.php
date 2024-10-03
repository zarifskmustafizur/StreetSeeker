<?php

// Create connection
$conn = new mysqli("dbhost.cs.man.ac.uk","c60196ap","streetseekerpassword","2023_comp10120_x9");

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get data from the JavaScript script and game.html
$time = $_POST['time'];
$username = $_POST['username'];
// $id = $_POST['id'];
$difficulty = $_POST['difficulty'];

// Prepare and execute the SQL query
$sql = "INSERT INTO leaderboard (time, username, difficulty) VALUES (?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("isii", $time, $username, $difficulty);

if ($stmt->execute()) {
    echo "Data inserted successfully.";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$stmt->close();
$conn->close();
?>