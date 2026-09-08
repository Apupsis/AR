<?php
header('Content-Type: text/html; charset=utf-8');

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    
    if (!empty($_POST["website"])) {
        header("Location: /thank/");
        exit;
    }
    
    $errors = array();
    
    $visitor_name = isset($_POST["name"]) ? trim($_POST["name"]) : "";
    $visitor_email = isset($_POST["email"]) ? trim($_POST["email"]) : "";
    $visitor_phone = isset($_POST["phone"]) ? trim($_POST["phone"]) : "";
    $visitor_message = isset($_POST["message"]) ? trim($_POST["message"]) : "";
    $visitor_subject = isset($_POST["subject"]) ? trim($_POST["subject"]) : "Contact Form Submission";
    
    if (empty($visitor_name)) {
        $errors[] = "Name is required";
    }
    
    if (empty($visitor_email)) {
        $errors[] = "Email is required";
    } elseif (!filter_var($visitor_email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = "Email format is invalid";
    }
    
    if (empty($visitor_message)) {
        $errors[] = "Message is required";
    }
    
    if (!empty($errors)) {
        header("Location: /thank/");
        exit;
    }
    
    $recipient_address = "support@equestrian-care.com";
    
    $sanitized_name = filter_var($visitor_name, FILTER_SANITIZE_STRING);
    $sanitized_email = filter_var($visitor_email, FILTER_SANITIZE_EMAIL);
    $sanitized_phone = filter_var($visitor_phone, FILTER_SANITIZE_STRING);
    $sanitized_message = filter_var($visitor_message, FILTER_SANITIZE_STRING);
    $sanitized_subject = filter_var($visitor_subject, FILTER_SANITIZE_STRING);
    
    $mail_headers = "From: " . $sanitized_email . "\r\n";
    $mail_headers .= "Reply-To: " . $sanitized_email . "\r\n";
    $mail_headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
    
    $email_body = "New Contact Form Submission\r\n";
    $email_body .= "============================\r\n\r\n";
    $email_body .= "Name: " . $sanitized_name . "\r\n";
    $email_body .= "Email: " . $sanitized_email . "\r\n";
    
    if (!empty($sanitized_phone)) {
        $email_body .= "Phone: " . $sanitized_phone . "\r\n";
    }
    
    $email_body .= "Subject: " . $sanitized_subject . "\r\n";
    $email_body .= "\r\nMessage:\r\n";
    $email_body .= $sanitized_message . "\r\n";
    $email_body .= "\r\n============================\r\n";
    $email_body .= "Submitted at: " . date('Y-m-d H:i:s') . "\r\n";
    
    $final_subject = "Contact Form: " . $sanitized_subject;
    
    @mail($recipient_address, $final_subject, $email_body, $mail_headers);
    
    header("Location: /thank/");
    exit;
    
} else {
    header("Location: /thank/");
    exit;
}
?>