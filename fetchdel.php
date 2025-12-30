<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');

include "db.php";

// JSON input read
$data = json_decode(file_get_contents("php://input"), true);

$id = $data['id'];   // jis record ko delete karna hai

// delete query
$query = "DELETE FROM colg WHERE id='$id'";

if (mysqli_query($conn, $query)) {
    echo json_encode(["message" => "Data deleted successfully"]);
} else {
    echo json_encode(["error" => "Data delete failed"]);
}

mysqli_close($conn);
?>
