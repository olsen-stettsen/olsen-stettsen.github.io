<?php
$q = $_REQUEST["q"];
$member = json_decode($q);
$file = 'database.txt';
$data = file_get_contents($file);
$array;
if($data == ""){
    $array = array();  
}
else{
    $array = json_decode($data);
    $found = false;
    for ($x = 0; $x <= count($array); $x++){
        if ($array[$x]->personllicense == $member->personllicense){
            $array[$x] = $member;
            $found = true;
        }
    }
}
if (!$found){
    array_push($array, $member);
}
$json = json_encode($array);
file_put_contents($file, $json);
?>