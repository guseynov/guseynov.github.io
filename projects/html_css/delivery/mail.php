<?php 
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

function mime_header_encode($str, $data_charset, $send_charset){
	if($data_charset != $send_charset)
		$str=iconv($data_charset,$send_charset.'//IGNORE',$str);
	return ('=?'.$send_charset.'?B?'.base64_encode($str).'?=');
}

class TEmail{
	public $from_email;
	public $from_name;
	public $to_email;
	public $subject;
	public $data_charset='UTF-8';
	public $send_charset='windows-1251';
	public $body='';
	public $type='text/plain';
	function send(){
		$dc=$this->data_charset;
		$sc=$this->send_charset;
    //Кодируем поля адресата, темы и отправителя
		$enc_to=$this->to_email;
		$enc_subject=mime_header_encode($this->subject,$dc,$sc);
		$enc_from=mime_header_encode($this->from_name,$dc,$sc).' <'.$this->from_email.'>';
    //Кодируем тело письма
		$enc_body=$dc==$sc?$this->body:iconv($dc,$sc.'//IGNORE',$this->body);
    //Оформляем заголовки письма
		$headers='';
		$headers.="Mime-Version: 1.0\r\n";
		$headers.="Content-type: ".$this->type."; charset=".$sc."\r\n";
		$headers.="From: ".$enc_from."\r\n";
    //Отправляем
		return mail($enc_to,$enc_subject,$enc_body,$headers);
	}
}


mb_internal_encoding("UTF-8");
function mb_lcfirst($text) {
    return mb_strtolower(mb_substr($text, 0, 1)) . mb_substr($text, 1);
}


$phone = $_POST['phone'];
$mail = $_POST['email'];
if (isset($_POST['destination']) && !empty($_POST['destination'])) {
$destination = ' '.mb_lcfirst($_POST['destination']);
} else {
	$destination = '';
}

$email=new TEmail;
$email->from_email='noreply@autodelivery.com';
$email->from_name='delivery';
$email->to_email='wewe@ewrwegrg.com';
//funfot@ya.ru
$email->subject='Запрос на расчет доставки';
$email->body="Запрос на расчет доставки".$destination.". Телефон: ".$phone.", почта: ".$mail;



if ($email->send()) {
	echo 'Success';
} else {
	print_r(error_get_last());
}


?>