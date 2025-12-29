<?php
header('Content-Type:application/json');
header('Acess-Control-Allow-Origin:*');
$data=json_decode(file_get_contents('php://input'),true);
include "db.php";
$stuedentid=$data['stu_id'];

$sql='select * from colg where id={$stuedentid}';
$result=mysqli_query($conn,$sql)or die('query failed');

if(mysqli_num_rows($result)>0){
    $output=mysqli_fetch_all($result, MYSQLI_ASSOC);
    echo json_encode($output);

}else{
echo json_encode(array('message'=>'no Record found','status'=>false));
}

?>