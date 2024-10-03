<?php
session_start();


// Proceed with the existing authentication logic
$username = $_POST['username'];
$password = $_POST['password'];
// Connect to the database
$con = new mysqli("dbhost.cs.man.ac.uk","c60196ap","streetseekerpassword","2023_comp10120_x9");
if ($con->connect_error){
    die("Failed to connect: ".$con->connect_error);
} else {
    $stmt = $con->prepare("SELECT * FROM registration WHERE username = ?");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $stmt_result = $stmt->get_result();
    if($stmt_result->num_rows > 0){
        $data = $stmt_result->fetch_assoc();
        if(password_verify($password, $data['password'])){ // Verify hashed password
            header("Location: ../home_page.html");
            exit();
        } else {
            echo "<h2>Invalid username or password</h2>";
        }
    } else {
        echo "<h2>Invalid username or password</h2>";
    }
}
?>
