<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: PUT');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');

include "db.php";

// JSON input read
$data = json_decode(file_get_contents("php://input"), true);

$id = $data['id'];               // jis record ko update karna hai
$studentname = $data['studentname'];
$age = $data['age'];
$city = $data['city'];

// update query
$query = "UPDATE colg 
          SET studentname='$studentname', age='$age', city='$city'
          WHERE id='$id'";

if (mysqli_query($conn, $query)) {
    echo json_encode(["message" => "Data updated successfully"]);
} else {
    echo json_encode(["error" => "Data update failed"]);
}

mysqli_close($conn);
?>
