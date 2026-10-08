<?php

header('Content-Type: text/html; charset=utf-8');

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    
    if (!empty($_POST["website"])) {
        header("Location: /thank/");
        exit;
    }
    
    $submission_name = isset($_POST["name"]) ? trim($_POST["name"]) : "";
    $submission_email = isset($_POST["email"]) ? trim($_POST["email"]) : "";
    $submission_phone = isset($_POST["phone"]) ? trim($_POST["phone"]) : "";
    $submission_message = isset($_POST["message"]) ? trim($_POST["message"]) : "";
    $submission_subject = isset($_POST["subject"]) ? trim($_POST["subject"]) : "Contact Form Submission";
    
    $validation_errors = [];
    
    if (empty($submission_name)) {
        $validation_errors[] = "Name field is required";
    } elseif (strlen($submission_name) > 100) {
        $validation_errors[] = "Name must not exceed 100 characters";
    }
    
    if (empty($submission_email)) {
        $validation_errors[] = "Email address is required";
    } elseif (!filter_var($submission_email, FILTER_VALIDATE_EMAIL)) {
        $validation_errors[] = "Please provide a valid email address";
    }
    
    if (empty($submission_message)) {
        $validation_errors[] = "Message cannot be empty";
    } elseif (strlen($submission_message) > 5000) {
        $validation_errors[] = "Message must not exceed 5000 characters";
    }
    
    if (!empty($submission_phone) && strlen($submission_phone) > 20) {
        $validation_errors[] = "Phone number is too long";
    }
    
    if (!empty($validation_errors)) {
        header("Location: /thank/");
        exit;
    }
    
    $recipient_address = "support@daqat-resha.com";
    
    $sanitized_name = htmlspecialchars($submission_name, ENT_QUOTES, 'UTF-8');
    $sanitized_email = filter_var($submission_email, FILTER_SANITIZE_EMAIL);
    $sanitized_phone = htmlspecialchars($submission_phone, ENT_QUOTES, 'UTF-8');
    $sanitized_message = htmlspecialchars($submission_message, ENT_QUOTES, 'UTF-8');
    $sanitized_subject = htmlspecialchars($submission_subject, ENT_QUOTES, 'UTF-8');
    
    $email_headers = "MIME-Version: 1.0" . "\r\n";
    $email_headers .= "Content-type: text/html; charset=UTF-8" . "\r\n";
    $email_headers .= "From: " . $sanitized_email . "\r\n";
    $email_headers .= "Reply-To: " . $sanitized_email . "\r\n";
    
    $email_body = "<!DOCTYPE html>\r\n";
    $email_body .= "<html>\r\n";
    $email_body .= "<head><meta charset='UTF-8'></head>\r\n";
    $email_body .= "<body style='font-family: Arial, sans-serif; line-height: 1.6; color: #333;'>\r\n";
    $email_body .= "<h2 style='color: #2c3e50;'>New Form Submission</h2>\r\n";
    $email_body .= "<p><strong>Name:</strong> " . $sanitized_name . "</p>\r\n";
    $email_body .= "<p><strong>Email:</strong> " . $sanitized_email . "</p>\r\n";
    
    if (!empty($sanitized_phone)) {
        $email_body .= "<p><strong>Phone:</strong> " . $sanitized_phone . "</p>\r\n";
    }
    
    $email_body .= "<p><strong>Subject:</strong> " . $sanitized_subject . "</p>\r\n";
    $email_body .= "<p><strong>Message:</strong></p>\r\n";
    $email_body .= "<p>" . nl2br($sanitized_message) . "</p>\r\n";
    $email_body .= "<hr style='border: none; border-top: 1px solid #ddd; margin: 20px 0;'>\r\n";
    $email_body .= "<p style='font-size: 12px; color: #666;'>This message was sent from your website contact form.</p>\r\n";
    $email_body .= "</body>\r\n";
    $email_body .= "</html>\r\n";
    
    $mail_result = mail($recipient_address, $sanitized_subject, $email_body, $email_headers);
    
    header("Location: /thank/");
    exit;
    
} else {
    header("Location: /thank/");
    exit;
}

?>