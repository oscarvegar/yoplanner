<?php
if ($_GET['randomId'] != "ssXWNi8XJz39PVxLBufaHbNA7MTm66raLolZCk4hdsG6JdAXFEbs6PPj_DamT5f4") {
    echo "Access Denied";
    exit();
}

// display the HTML code:
echo stripslashes($_POST['wproPreviewHTML']);

?>  
