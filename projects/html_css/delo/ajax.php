<?php 
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


if ($_SERVER['HTTP_X_REQUESTED_WITH']) {

		$name = $_POST['name'];
		$mail = $_POST['email'];
		$phone = $_POST['phone'];
		$additional = $_POST['additional'];

		$email=new TEmail;
		$email->from_email='noreply@delo.life';
		$email->from_name='Delo.Life';
		$email->to_email='deft@mail.ru';

		$email->subject='Запрос на получение документов о партнерстве';
		$email->body='Поступил запрос на получение документов о партнерстве. Имя: '.$name.', e-mail: '.$mail.', телефон: '.$phone.', дополнительная информация: '.$additional;
		if ($email->send()) {
			echo 'Success';
		} else {
			print_r(error_get_last());
		}

		
}
?>