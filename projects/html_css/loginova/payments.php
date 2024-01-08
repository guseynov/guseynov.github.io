<?php

require __DIR__ . '/PayPal-PHP-SDK/autoload.php';

$sdkConfig = array(
    "mode" => "sandbox"   // change "sandbox" if u want to switch into "live" mode
);
// LIVE - uncomment two lines below if u wanna switch to live mode and comment if u run sandbox mode
//$clientId = "AZqaX6NZHtHFDGwx4lTnsyjLf81T6HFD0glckJkwzFlFBpbLzoyBaOJypUYYE1oQZRat2OQ8lftkc-J_";
//$clientSecret = "EMl1nocehhhAedRmjh98KGwiH3LW320ZMiNPazheYQUMXXMV3ibLWVHfklpoP4-YOU87kDnAkiPN1pT3";
// SANDBOX - uncomment two lines below it if u wanna switch to sandbox mode and comment if u run live mode
$clientId = "Af1axl9pB_eHbTVNDDY-_FhhKIuRS8fRRO3-NfU63-QNOZEmYsO_PqVTzEV8xFytSK4he4LQOqqjsbLC";
$clientSecret = "EHs_Fy6KYMlpa4_RtPNhv4zLDVmL0N4czHxpslBrVa396qSqP6RrPpM1bKbc9_oj3eUKRvd3wcSKxLB9";

$apiContext = new \PayPal\Rest\ApiContext(new \PayPal\Auth\OAuthTokenCredential(
    $clientId, $clientSecret));
$apiContext->setConfig($sdkConfig);

$payer = new \PayPal\Api\Payer();
$payer->setPaymentMethod('paypal');

$amount = new \PayPal\Api\Amount();
$amount->setCurrency('USD');
$amount->setTotal($_POST['price'] ? $_POST['price'] : "123");

$transaction = new \PayPal\Api\Transaction();
$transaction->setDescription($_POST['title'] ? $_POST['title'] : "Тестовый платеж");
$transaction->setAmount($amount);

$redirectUrls = new \PayPal\Api\RedirectUrls();
$redirectUrls->setReturnUrl("http://dimaneva.ru/loginova/dist/?order=success");
$redirectUrls->setCancelUrl("http://dimaneva.ru/loginova/dist/?order=fail");

$payment = new \PayPal\Api\Payment();
$payment->setIntent("sale");
$payment->setPayer($payer);
$payment->setRedirectUrls($redirectUrls);
$payment->setTransactions(array($transaction));

$payment->create($apiContext);

$id = $payment->getId();
$link = $payment->getApprovalLink();

header('location:'.$link);

