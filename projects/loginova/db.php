<?php

$hostname = "localhost";
$username = "loginova";
$password = "loginova123";
$dbName = "loginova";
$table = "photos";

$connection = mysqli_connect($hostname, $username, $password, $dbName);

if (!$connection) {
    printf("Database error:".mysqli_connect_error());
    exit;
}

if ($_POST['cat1'] && $_POST['cat2']) {
    $result = mysqli_query($connection, 'select id, title, path from photos where cat1="' . $_POST['cat1'] . '" and cat2="' . $_POST['cat2'] . '"');
    $arr = array();
    if ($result) {
        while ($row = mysqli_fetch_array($result)) {
            $arr[] = $row;
        }
    } else {
        printf("Error while requesting a database...");
    }
    echo json_encode($arr);
    mysqli_close($connection);
} else {
    if ($_POST['id']) {
        $result = mysqli_query($connection, 'select * from photos where id='.$_POST['id']);
        $arr = array();
        if ($result) {
            while ($row = mysqli_fetch_array($result)) {
                $arr[] = $row;
            }
        } else {
            printf("Error while requesting a database...");
        }
        echo json_encode($arr);
        mysqli_close($connection);
    } else {
        printf('Bad request');
        exit;
    }
}
