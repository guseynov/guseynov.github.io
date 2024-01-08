<?
// CRM server conection data
define('CRM_HOST', 'silnieznania.bitrix24.ru'); // your CRM domain name
define('CRM_PORT', '443'); // CRM server port
define('CRM_PATH', '/crm/configs/import/lead.php'); // CRM server REST service path

// CRM server authorization data
define('CRM_LOGIN', 'dima@dimaneva.ru'); // login of a CRM user able to manage leads
define('CRM_PASSWORD', 'berkas123321'); // password of a CRM user
// OR you can send special authorization hash which is sent by server after first successful connection with login and password
//define('CRM_AUTH', 'e54ec19f0c5f092ea11145b80f465e1a'); // authorization hash

/********************************************************************************************/
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


// POST processing
if ($_SERVER['REQUEST_METHOD'] == 'POST')
{
	$leadData = $_POST;

	// get lead data from the form
	$postData = array();
	

	$postData['TITLE'] = (!empty($leadData['phone'])) ? $leadData['phone'] : '';

	if (!empty($leadData['name'])) {
		$postData['NAME'] = $leadData['name'];
	}

	if (!empty($leadData['site'])) {
		$postData['WEB_HOME'] = $leadData['site'];
	}
	

	if (!empty($leadData['phone'])) {
		$postData['PHONE_MOBILE'] = $leadData['phone'];
	}

	$postData['SOURCE_DESCRIPTION'] = 'Дизайнерские лендинги';
//Email
if (!empty($leadData['phone']) && !empty($leadData['name'])) {
		$name =$leadData['name'];
		$phone =$leadData['phone'];
		$site =$leadData['site'];

		$email=new TEmail;
		$email->from_email='noreply@silnieznania.com';
		$email->from_name='Дизайнерские лендинги';
		$email->to_email='jdiceman@mail.ru';

		$email->subject='Поступил заказ: '.$name.', '.$phone;
		if (!empty($site)) {
		$email->body='Поступил заказ. Клиент '.$name.' с номером '.$phone.'. Сайт - '.$site;
	} else {
		$email->body='Поступил заказ. Клиент '.$name.' с номером '.$phone;
	}
		$email->send();
	}

	// append authorization data
	if (defined('CRM_AUTH'))
	{
		$postData['AUTH'] = CRM_AUTH;
	}
	else
	{
		$postData['LOGIN'] = CRM_LOGIN;
		$postData['PASSWORD'] = CRM_PASSWORD;
	}

	// open socket to CRM
	$fp = fsockopen("ssl://".CRM_HOST, CRM_PORT, $errno, $errstr, 30);
	if ($fp)
	{
		// prepare POST data
		$strPostData = '';
		foreach ($postData as $key => $value)
			$strPostData .= ($strPostData == '' ? '' : '&').$key.'='.urlencode($value);

		// prepare POST headers
		$str = "POST ".CRM_PATH." HTTP/1.0\r\n";
		$str .= "Host: ".CRM_HOST."\r\n";
		$str .= "Content-Type: application/x-www-form-urlencoded\r\n";
		$str .= "Content-Length: ".strlen($strPostData)."\r\n";
		$str .= "Connection: close\r\n\r\n";

		$str .= $strPostData;

		// send POST to CRM
		fwrite($fp, $str);

		// get CRM headers
		$result = '';
		while (!feof($fp))
		{
			$result .= fgets($fp, 128);
		}
		fclose($fp);

		echo 'success';
		
		return true;
		
		// cut response headers
		$response = explode("\r\n\r\n", $result);

		$output = '<pre>'.print_r($response[1], 1).'</pre>';
	}
	else
	{
		echo 'fail';
		
		return false;
	}
}
else
{
	echo 'fail';
	
	return false;
}

?>