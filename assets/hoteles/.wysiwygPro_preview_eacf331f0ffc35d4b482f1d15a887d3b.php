<?php
if ($_GET['randomId'] != "TtGohs38p4goQ5q3WHE2Wk6yc6C5DUg0AM14AXqW3FR_Zpoz7psb7IILsajX8S7R") {
    echo "Access Denied";
    exit();
}

// display the HTML code:
echo stripslashes($_POST['wproPreviewHTML']);

?>  
