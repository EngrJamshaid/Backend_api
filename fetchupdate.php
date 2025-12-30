<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, PUT');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');

include "db.php";

if ($_SERVER['REQUEST_METHOD'] == 'PUT' || $_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);

    $id = $data['id'];
    $studentname = $data['studentname'];
    $age = $data['age'];
    $city = $data['city'];

    $query = "UPDATE colg 
              SET studentname='$studentname', age='$age', city='$city'
              WHERE id='$id'";

    if (mysqli_query($conn, $query)) {
        echo json_encode(["status"=>"success","message" => "Data updated successfully"]);
    } else {
        echo json_encode(["status"=>"error","message" => "Data update failed"]);
    }
}

mysqli_close($conn);
?>
