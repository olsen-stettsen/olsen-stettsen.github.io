<?php
$q = $_REQUEST["q"];
$r = $_REQUEST["r"];
$file = file_get_contents('database.txt');
$array = array();
if($file == ""){
    $array = array();
    $json = json_encode($array);
    file_put_contents($file, $json);
}
$found = false;
$members = json_decode($file);
foreach ($members as $member){
    if ($member->personllicense == $q && $member->email == $r){
        echo json_encode($member);
        $found = true;
    }
}
if(!$found){
    echo "NONE FOUND";
}
?>