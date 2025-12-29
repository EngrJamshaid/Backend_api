<?php
header('Content-Type:application/json');
header('Acess-Control-Allow-Origin:*');
header('Acess-Control-Allow-Methods:POST');
header('Acess-Control-Allow-Headers:Acess-Control-Allow-Headers,Contant-Type,Access-control-Allow-Methods,Authorization,X-Requested-With');

include "db.php";

// JSON input read
$data = json_decode(file_get_contents("php://input"), true);

$studentname = $data['studentname'];
$age = $data['age'];
$city = $data['city'];

// insert query
$query = "INSERT INTO colg (studentname, age, city) 
          VALUES ('$studentname', '$age', '$city')";

if (mysqli_query($conn, $query)) {
    echo json_encode(["message" => "Data inserted successfully"]);
} else {
    echo json_encode(["error" => "Data insert failed"]);
}

mysqli_close($conn);

?>