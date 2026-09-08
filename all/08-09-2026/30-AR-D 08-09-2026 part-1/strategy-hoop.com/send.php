<?php
header('Content-Type: text/html; charset=utf-8');

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    
    if (!empty($_POST["website"])) {
        header("Location: /thank/");
        exit;
    }
    
    $errors = [];
    
    $sender_name = isset($_POST["name"]) ? trim($_POST["name"]) : "";
    $sender_email = isset($_POST["email"]) ? trim($_POST["email"]) : "";
    $sender_phone = isset($_POST["phone"]) ? trim($_POST["phone"]) : "";
    $sender_message = isset($_POST["message"]) ? trim($_POST["message"]) : "";
    $sender_subject = isset($_POST["subject"]) ? trim($_POST["subject"]) : "Contact Form Submission";
    
    if (empty($sender_name)) {
        $errors[] = "Name is required";
    }
    
    if (empty($sender_email)) {
        $errors[] = "Email is required";
    } elseif (!filter_var($sender_email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = "Email format is invalid";
    }
    
    if (empty($sender_message)) {
        $errors[] = "Message is required";
    }
    
    if (!empty($errors)) {
        header("Location: /thank/");
        exit;
    }
    
    $recipient = "support@strategy-hoop.com";
    
    $sanitized_name = htmlspecialchars($sender_name, ENT_QUOTES, 'UTF-8');
    $sanitized_email = filter_var($sender_email, FILTER_SANITIZE_EMAIL);
    $sanitized_phone = htmlspecialchars($sender_phone, ENT_QUOTES, 'UTF-8');
    $sanitized_message = htmlspecialchars($sender_message, ENT_QUOTES, 'UTF-8');
    $sanitized_subject = htmlspecialchars($sender_subject, ENT_QUOTES, 'UTF-8');
    
    $email_body = "Name: " . $sanitized_name . "\r\n";
    $email_body .= "Email: " . $sanitized_email . "\r\n";
    
    if (!empty($sanitized_phone)) {
        $email_body .= "Phone: " . $sanitized_phone . "\r\n";
    }
    
    $email_body .= "\r\nMessage:\r\n" . $sanitized_message;
    
    $mail_headers = "From: " . $sanitized_email . "\r\n";
    $mail_headers .= "Reply-To: " . $sanitized_email . "\r\n";
    $mail_headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
    
    $final_subject = "New Contact: " . $sanitized_subject;
    
    mail($recipient, $final_subject, $email_body, $mail_headers);
    
    header("Location: /thank/");
    exit;
    
} else {
    header("Location: /thank/");
    exit;
}
?>