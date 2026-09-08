<?php
header('Content-Type: text/html; charset=utf-8');

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    
    if (!empty($_POST["website"])) {
        header("Location: /thank/");
        exit;
    }
    
    $errors = [];
    
    $fullname = isset($_POST["name"]) ? trim($_POST["name"]) : "";
    $emailaddr = isset($_POST["email"]) ? trim($_POST["email"]) : "";
    $phonenumber = isset($_POST["phone"]) ? trim($_POST["phone"]) : "";
    $messagebody = isset($_POST["message"]) ? trim($_POST["message"]) : "";
    $subjectline = isset($_POST["subject"]) ? trim($_POST["subject"]) : "Contact Form Submission";
    
    if (empty($fullname)) {
        $errors[] = "Name is required";
    }
    
    if (empty($emailaddr)) {
        $errors[] = "Email is required";
    } elseif (!filter_var($emailaddr, FILTER_VALIDATE_EMAIL)) {
        $errors[] = "Email format is invalid";
    }
    
    if (empty($messagebody)) {
        $errors[] = "Message is required";
    }
    
    if (!empty($errors)) {
        header("Location: /thank/");
        exit;
    }
    
    $sanitized_name = htmlspecialchars($fullname, ENT_QUOTES, 'UTF-8');
    $sanitized_email = filter_var($emailaddr, FILTER_SANITIZE_EMAIL);
    $sanitized_phone = htmlspecialchars($phonenumber, ENT_QUOTES, 'UTF-8');
    $sanitized_message = htmlspecialchars($messagebody, ENT_QUOTES, 'UTF-8');
    $sanitized_subject = htmlspecialchars($subjectline, ENT_QUOTES, 'UTF-8');
    
    $recipient = "support@croquet-eg.com";
    
    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type: text/plain; charset=UTF-8" . "\r\n";
    $headers .= "From: " . $sanitized_email . "\r\n";
    $headers .= "Reply-To: " . $sanitized_email . "\r\n";
    
    $email_subject = "New Contact Form Submission: " . $sanitized_subject;
    
    $email_message = "Name: " . $sanitized_name . "\r\n";
    $email_message .= "Email: " . $sanitized_email . "\r\n";
    
    if (!empty($sanitized_phone)) {
        $email_message .= "Phone: " . $sanitized_phone . "\r\n";
    }
    
    $email_message .= "\r\nMessage:\r\n";
    $email_message .= $sanitized_message . "\r\n";
    $email_message .= "\r\n---\r\n";
    $email_message .= "Submitted on: " . date('Y-m-d H:i:s') . "\r\n";
    
    $mail_sent = mail($recipient, $email_subject, $email_message, $headers);
    
    header("Location: /thank/");
    exit;
    
} else {
    header("Location: /thank/");
    exit;
}
?>