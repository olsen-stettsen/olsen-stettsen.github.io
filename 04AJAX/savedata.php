<?php
$q = $_REQUEST["q"];
$file = 'database.txt';
file_put_contents($file, $q);
?>