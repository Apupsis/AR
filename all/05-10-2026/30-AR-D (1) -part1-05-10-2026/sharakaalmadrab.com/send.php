<?php
header('Content-Type: text/html; charset=utf-8');

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    
    if (!empty($_POST["website"])) {
        header("Location: /thank/");
        exit;
    }
    
    $fullname = isset($_POST["name"]) ? trim($_POST["name"]) : "";
    $sender_email = isset($_POST["email"]) ? trim($_POST["email"]) : "";
    $phone_number = isset($_POST["phone"]) ? trim($_POST["phone"]) : "";
    $message_content = isset($_POST["message"]) ? trim($_POST["message"]) : "";
    $topic = isset($_POST["subject"]) ? trim($_POST["subject"]) : "No Subject";
    
    $validation_errors = array();
    
    if (empty($fullname)) {
        $validation_errors[] = "Name field is required";
    } elseif (strlen($fullname) < 2) {
        $validation_errors[] = "Name must be at least 2 characters";
    } elseif (strlen($fullname) > 100) {
        $validation_errors[] = "Name is too long";
    }
    
    if (empty($sender_email)) {
        $validation_errors[] = "Email address is required";
    } elseif (!filter_var($sender_email, FILTER_VALIDATE_EMAIL)) {
        $validation_errors[] = "Please enter a valid email address";
    }
    
    if (empty($message_content)) {
        $validation_errors[] = "Message field is required";
    } elseif (strlen($message_content) < 10) {
        $validation_errors[] = "Message must be at least 10 characters";
    } elseif (strlen($message_content) > 5000) {
        $validation_errors[] = "Message is too long";
    }
    
    if (!empty($phone_number) && !preg_match('/^[0-9+\-\s\(\)]+$/', $phone_number)) {
        $validation_errors[] = "Phone number contains invalid characters";
    }
    
    if (!empty($topic) && strlen($topic) > 150) {
        $validation_errors[] = "Subject is too long";
    }
    
    if (!empty($validation_errors)) {
        header("Location: /thank/");
        exit;
    }
    
    $recipient_address = "support@sharakaalmadrab.com";
    
    $sanitized_name = htmlspecialchars($fullname, ENT_QUOTES, 'UTF-8');
    $sanitized_email = filter_var($sender_email, FILTER_SANITIZE_EMAIL);
    $sanitized_phone = htmlspecialchars($phone_number, ENT_QUOTES, 'UTF-8');
    $sanitized_message = htmlspecialchars($message_content, ENT_QUOTES, 'UTF-8');
    $sanitized_subject = htmlspecialchars($topic, ENT_QUOTES, 'UTF-8');
    
    $email_headers = "MIME-Version: 1.0" . "\r\n";
    $email_headers .= "Content-type: text/html; charset=UTF-8" . "\r\n";
    $email_headers .= "From: " . $sanitized_email . "\r\n";
    $email_headers .= "Reply-To: " . $sanitized_email . "\r\n";
    $email_headers .= "X-Mailer: PHP/" . phpversion();
    
    $email_subject = "New Form Submission: " . $sanitized_subject;
    
    $email_body = "<!DOCTYPE html>" . "\r\n";
    $email_body .= "<html>" . "\r\n";
    $email_body .= "<head>" . "\r\n";
    $email_body .= "<meta charset='UTF-8'>" . "\r\n";
    $email_body .= "</head>" . "\r\n";
    $email_body .= "<body style='font-family: Arial, sans-serif; line-height: 1.6; color: #333;'>" . "\r\n";
    $email_body .= "<h2 style='color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 10px;'>New Contact Form Submission</h2>" . "\r\n";
    $email_body .= "<p><strong>Name:</strong> " . $sanitized_name . "</p>" . "\r\n";
    $email_body .= "<p><strong>Email:</strong> " . $sanitized_email . "</p>" . "\r\n";
    
    if (!empty($sanitized_phone)) {
        $email_body .= "<p><strong>Phone:</strong> " . $sanitized_phone . "</p>" . "\r\n";
    }
    
    $email_body .= "<p><strong>Subject:</strong> " . $sanitized_subject . "</p>" . "\r\n";
    $email_body .= "<p><strong>Message:</strong></p>" . "\r\n";
    $email_body .= "<div style='background-color: #f5f5f5; padding: 15px; border-left: 4px solid #3498db; margin: 15px 0;'>" . "\r\n";
    $email_body .= nl2br($sanitized_message) . "\r\n";
    $email_body .= "</div>" . "\r\n";
    $email_body .= "<p style='margin-top: 30px; font-size: 12px; color: #7f8c8d;'>This email was sent from your website contact form.</p>" . "\r\n";
    $email_body .= "</body>" . "\r\n";
    $email_body .= "</html>";
    
    $mail_sent = mail($recipient_address, $email_subject, $email_body, $email_headers);
    
    header("Location: /thank/");
    exit;
    
} else {
    header("Location: /thank/");
    exit;
}
?>