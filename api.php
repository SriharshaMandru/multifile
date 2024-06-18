<?php 

$folder = "multifileupload/";

move_uploaded_file($_FILES['file']['tmp_name'], $folder . time() . '_' . $_FILES['file']['name']);


?>