<?php
$q = $_REQUEST["q"];
$file = file_get_contents('database.txt');
$members = json_decode($file);
foreach ($members as $member){
    if ($member->personallicense == $q){
        echo json_encode($member);
    }
}
?>