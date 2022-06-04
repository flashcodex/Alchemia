<script>
    alert('pasok');
</script>
<?php
@session_start();
$folder_name = '../../../../images/kyc-id/';


$files = $_FILES['files'];
$file_path = $files['tmp_name'][0]; // temporary upload path of the first file
$file_name = str_replace(array('-',' '),"",$_POST['name']); // desired name of the file
$kyc_id = $_POST['kyc_id'];
$count = $_POST['count'];
echo '<script>alert('.$kyc_id.')</script>';
move_uploaded_file($file_path, $folder_name.$kyc_id.'-'.$count.'-'. basename($file_name));
?>