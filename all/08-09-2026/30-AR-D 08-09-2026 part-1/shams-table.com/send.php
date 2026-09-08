<?php
header('Content-Type: text/html; charset=utf-8');

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    
    if (!empty($_POST["website"])) {
        header("Location: /thank/");
        exit;
    }
    
    $visitor_name = isset($_POST["name"]) ? trim($_POST["name"]) : "";
    $visitor_email = isset($_POST["email"]) ? trim($_POST["email"]) : "";
    $visitor_phone = isset($_POST["phone"]) ? trim($_POST["phone"]) : "";
    $visitor_message = isset($_POST["message"]) ? trim($_POST["message"]) : "";
    $visitor_subject = isset($_POST["subject"]) ? trim($_POST["subject"]) : "Contact Form Submission";
    
    $errors = array();
    
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
    
    $sanitized_name = htmlspecialchars($visitor_name, ENT_QUOTES, 'UTF-8');
    $sanitized_email = filter_var($visitor_email, FILTER_SANITIZE_EMAIL);
    $sanitized_phone = htmlspecialchars($visitor_phone, ENT_QUOTES, 'UTF-8');
    $sanitized_message = htmlspecialchars($visitor_message, ENT_QUOTES, 'UTF-8');
    $sanitized_subject = htmlspecialchars($visitor_subject, ENT_QUOTES, 'UTF-8');
    
    $recipient = "info@shams-table.com";
    
    $email_headers = "MIME-Version: 1.0" . "\r\n";
    $email_headers .= "Content-type: text/plain; charset=UTF-8" . "\r\n";
    $email_headers .= "From: " . $sanitized_email . "\r\n";
    $email_headers .= "Reply-To: " . $sanitized_email . "\r\n";
    
    $email_body = "New Contact Form Submission\n";
    $email_body .= "===========================\n\n";
    $email_body .= "Name: " . $sanitized_name . "\n";
    $email_body .= "Email: " . $sanitized_email . "\n";
    
    if (!empty($sanitized_phone)) {
        $email_body .= "Phone: " . $sanitized_phone . "\n";
    }
    
    $email_body .= "Subject: " . $sanitized_subject . "\n";
    $email_body .= "\nMessage:\n";
    $email_body .= $sanitized_message . "\n";
    $email_body .= "\n===========================\n";
    $email_body .= "Submitted: " . date('Y-m-d H:i:s') . "\n";
    
    $mail_sent = mail($recipient, $sanitized_subject, $email_body, $email_headers);
    
    header("Location: /thank/");
    exit;
    
} else {
    header("Location: /thank/");
    exit;
}
?>