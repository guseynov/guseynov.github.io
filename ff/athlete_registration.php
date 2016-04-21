<?php

$hostname = "localhost";
$username = "fbfr";
$password = "7S2a9J4y";
$dbName = "fbfr";
$table = "athletes_registration";

$connection = mysqli_connect($hostname, $username, $password, $dbName);
mysqli_set_charset($connection, "utf8");

$surname = $_POST['surname'];
$name = $_POST['name'];
$zvanie = $_POST['zvanie'];
$weight_comp = $_POST['weight_comp'];
$weight = $_POST['weight'];
$height = $_POST['height'];
$city = $_POST['city'];
$club = $_POST['club'];
$birthday = $_POST['birthday'];
$work = $_POST['work'];
$profession = $_POST['profession'];
$trainer = $_POST['trainer'];
$beginning_date = $_POST['beginning_date'];
$hobby = $_POST['hobby'];
$best_achievement = $_POST['best_achievement'];
$address = $_POST['address'];
$mobile_phone = $_POST['mobile_phone'];
$phone = $_POST['phone'];
$rus_passport = $_POST['rus_passport'];
$foreign_passport = $_POST['foreign_passport'];
$nomination = $_POST['nomination'];
$category = $_POST['category'];
$age = $_POST['age'];

$res = mysqli_query($connection, "insert into athletes_registration(surname, name, zvanie, weight_comp, weight, height, city, club, birthday, work, profession, trainer, beginning_date, hobby, best_achievement, address, mobile_phone, phone, rus_passport, foreign_passport, nomination, category, age) values('$surname','$name','$zvanie','$weight_comp', '$weight', '$height', '$city', '$club', '$birthday', '$work', '$profession', '$trainer', '$beginning_date','$hobby', '$best_achievement', '$address', '$mobile_phone', '$phone', '$rus_passport', '$foreign_passport', '$nomination', '$category', '$age')");

