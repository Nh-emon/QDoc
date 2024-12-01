<?php
session_start();
$username = $_SESSION['username'] ?? 'guest';
$token = $_SESSION['token'] ?? 'none';

$request_author  = $_GET['author']  ?? 'none';
$request_folder  = $_GET['folder']  ?? 'none';
$request_subject = $_GET['subject'] ?? 'none';
$request_chapter = $_GET['chapter'] ?? 'none';
$request_topic   = $_GET['topic']   ?? 'none';

if ($username === 'guest' && $request_author === 'none') {
    header("Location: auth/login.php");
    exit();
}

?>



<!DOCTYPE html>
<html lang="en">

    <head>
        <?php include 'layout/page-header.php' ?>
    </head>    
<body class='position-relative laser-pointer scroll scroll-mid' data-theme='new' 
data-username ='<?php echo $username;?>' 
data-token    ='<?php echo $token;?>' 
data-author   ='<?php echo $request_author;?>'
data-folder   ='<?php echo $request_folder;?>'
data-subject  ='<?php echo $request_subject;?>'
data-chapter  ='<?php echo $request_chapter;?>'
data-topic    ='<?php echo $request_topic;?>'
>

<?php include 'layout/nav.php' ?>
<?php include 'layout/absolute_component.php' ?>
<?php include 'layout/media-manager.php' ?>
<?php include 'layout/main.php' ?>
<?php include 'layout/leftSideBar.php' ?>
<?php include 'layout/modal-content.php' ?>
<?php include 'layout/prompt-offcanvas.php' ?>


</body>
</html>