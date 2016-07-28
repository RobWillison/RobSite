<?php

namespace Rob\Services;

use PHPMailer;

class Email {

	public function send($email, $body)
	{
		if (! ($email && $body)) {
			return;
		}
		$mail = new PHPMailer;

		$config = require __DIR__ . '/emailConfig.php';

		$mail->isSMTP();                                      // Set mailer to use SMTP
		$mail->Host = $config['host'];  // Specify main and backup SMTP servers
		$mail->SMTPAuth = true;                               // Enable SMTP authentication
		$mail->Username = $config['username'];                 // SMTP username
		$mail->Password = $config['password'];                           // SMTP password
		$mail->SMTPSecure = 'tls';                            // Enable TLS encryption, `ssl` also accepted
		$mail->Port = 587;                                    // TCP port to connect to

		$mail->setFrom($email, 'Mailer');
		$mail->addAddress('Rob@Willison.co.uk', 'Rob');     // Add a recipient

		$mail->Subject = 'From Website';
		$mail->Body    = $body;

		if(!$mail->send()) {
		    return $mail->ErrorInfo;
		}

		return true;
	}
	
}