<?php
header('Content-Type: text/html; charset=utf-8');

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    
    if (!empty($_POST["website"])) {
        header("Location: /thank/");
        exit;
    }
    
    $fullname = isset($_POST["name"]) ? trim($_POST["name"]) : '';
    $sender_email = isset($_POST["email"]) ? trim($_POST["email"]) : '';
    $contact_phone = isset($_POST["phone"]) ? trim($_POST["phone"]) : '';
    $inquiry_subject = isset($_POST["subject"]) ? trim($_POST["subject"]) : 'Contact Form Submission';
    $inquiry_message = isset($_POST["message"]) ? trim($_POST["message"]) : '';
    
    $errors = [];
    
    if (empty($fullname)) {
        $errors[] = "Name is required";
    }
    
    if (empty($sender_email)) {
        $errors[] = "Email address is required";
    } elseif (!filter_var($sender_email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = "Please provide a valid email address";
    }
    
    if (empty($inquiry_message)) {
        $errors[] = "Message cannot be empty";
    }
    
    if (strlen($fullname) > 100) {
        $errors[] = "Name is too long";
    }
    
    if (strlen($inquiry_message) > 5000) {
        $errors[] = "Message exceeds maximum length";
    }
    
    if (!empty($contact_phone) && !preg_match('/^[0-9\s\-\+\(\)]+$/', $contact_phone)) {
        $errors[] = "Phone number contains invalid characters";
    }
    
    if (!empty($errors)) {
        header("Location: /thank/");
        exit;
    }
    
    $recipient_email = "support@alchampions.com";
    
    $fullname_safe = filter_var($fullname, FILTER_SANITIZE_STRING);
    $sender_email_safe = filter_var($sender_email, FILTER_SANITIZE_EMAIL);
    $inquiry_subject_safe = filter_var($inquiry_subject, FILTER_SANITIZE_STRING);
    $contact_phone_safe = filter_var($contact_phone, FILTER_SANITIZE_STRING);
    $inquiry_message_safe = filter_var($inquiry_message, FILTER_SANITIZE_STRING);
    
    $sender_email_safe = str_replace(["\r", "\n"], '', $sender_email_safe);
    $recipient_email = str_replace(["\r", "\n"], '', $recipient_email);
    
    $email_headers = "MIME-Version: 1.0\r\n";
    $email_headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
    $email_headers .= "From: " . $sender_email_safe . "\r\n";
    $email_headers .= "Reply-To: " . $sender_email_safe . "\r\n";
    $email_headers .= "X-Mailer: PHP/" . phpversion();
    
    $email_body = "Contact Form Submission\n";
    $email_body .= str_repeat("=", 40) . "\n\n";
    $email_body .= "Name: " . $fullname_safe . "\n";
    $email_body .= "Email: " . $sender_email_safe . "\n";
    
    if (!empty($contact_phone_safe)) {
        $email_body .= "Phone: " . $contact_phone_safe . "\n";
    }
    
    $email_body .= "Subject: " . $inquiry_subject_safe . "\n\n";
    $email_body .= "Message:\n";
    $email_body .= str_repeat("-", 40) . "\n";
    $email_body .= $inquiry_message_safe . "\n";
    $email_body .= str_repeat("-", 40) . "\n\n";
    $email_body .= "Submitted: " . date('Y-m-d H:i:s') . "\n";
    $email_body .= "IP Address: " . filter_var($_SERVER['REMOTE_ADDR'], FILTER_VALIDATE_IP) . "\n";
    
    mail($recipient_email, $inquiry_subject_safe, $email_body, $email_headers);
    
    header("Location: /thank/");
    exit;
    
} else {
    header("Location: /thank/");
    exit;
}
?>