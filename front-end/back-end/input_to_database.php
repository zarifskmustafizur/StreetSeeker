<?php

//connecting input data to database
$conn = new mysqli("dbhost.cs.man.ac.uk","c60196ap","streetseekerpassword","2023_comp10120_x9");

if(isset($_POST['email']) && isset($_POST['username']) && isset($_POST['password'])){
    $email = $_POST['email'];
    $username = $_POST['username'];
    $password = $_POST['password'];
    $encrypted_password = password_hash($password, PASSWORD_DEFAULT);

    if ($conn->connect_error){
        die('connection failed: '.$conn->connect_error);
    }
    else{
        $check_duplicate = "SELECT * FROM registration WHERE email = '$email' OR username = '$username'";
        $result = mysqli_query($conn, $check_duplicate);
        $count = mysqli_num_rows($result);
        if($count > 0){
            echo "Email or username already exists";
        }
        else{
            $stmt = $conn->prepare("insert into registration(email,username,password) values(?,?,?)");
            $stmt->bind_param("sss", $email, $username, $encrypted_password);
            $stmt->execute();
            header("Location: ../home_page.html");
            exit();
            $stmt->close();
            $conn->close();
        }
    }
}
?>
