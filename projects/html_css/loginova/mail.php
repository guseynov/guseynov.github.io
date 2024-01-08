<?php


$to = "Herl1933@armyspy.com";  //YOU SHOULD INSERT YOUR EMAIL HERE
$subject = "Заказ картины";

$message = "Я, ".$_POST['name'].", хочу заказать у вас картину, которая будет приносить мне радость каждый день.
    Мой e-mail - ".$_POST['email'].", телефон - ".$_POST['phone'];

if ($_POST['additional']) {
    $message .= " Более того, мне бы хотелось: ";
    foreach ($_POST['additional'] as $str) {
        $message .= $str.' ';
    }
}

echo mail($to, $subject, $message);