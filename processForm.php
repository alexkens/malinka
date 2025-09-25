<?php
    require __DIR__ . '/vendor/autoload.php';
    
    use PHPMailer\PHPMailer\PHPMailer; 
    use PHPMailer\PHPMailer\Exception; 
    
    // data
    $name = $_POST['name'];
    $tel = $_POST['tel'];
    $email = $_POST['email'];

    $message = "Name: " . $name . ", E-Mail: " . $email . ", Telefonnr.: " . $tel . ", Mitteilung: " .  $_POST['message'];
    $to = '';
    $subject = "Malinka-Band Anfrage";
    $headers = $_POST['email'];

    $mail = new PHPMailer(true);

    try {
        // Server settings
        $mail->isSMTP();
        $mail->Host       = 'smtp.gmail.com';
        $mail->SMTPAuth   = true;
        $mail->Username = $to;             
        $mail->Password   = '';
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
        $mail->Port       = 465;

        // Recipients
        $mail->setFrom($to);
        $mail->addAddress($to, 'Tatjana Malinka');

        // Content
        $mail->isHTML(false);
        $mail->Subject = $subject;
        $mail->Body    = $message;
        $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

        $mail->send();
        echo 'Message has been sent';

    } catch (Exception $e) {
        echo "MAILER ERROR, nothing was SEND: {$mail->ErrorInfo}";
    }
?>