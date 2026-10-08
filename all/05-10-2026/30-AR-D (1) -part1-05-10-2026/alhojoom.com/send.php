<?php
header('Content-Type: text/html; charset=utf-8');

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    
    if (!empty($_POST["website"])) {
        header("Location: /thank/");
        exit;
    }
    
    $submitted_name = isset($_POST["name"]) ? trim($_POST["name"]) : "";
    $submitted_email = isset($_POST["email"]) ? trim($_POST["email"]) : "";
    $submitted_phone = isset($_POST["phone"]) ? trim($_POST["phone"]) : "";
    $submitted_message = isset($_POST["message"]) ? trim($_POST["message"]) : "";
    $submitted_subject = isset($_POST["subject"]) ? trim($_POST["subject"]) : "";
    
    $validation_errors = array();
    
    if (empty($submitted_name)) {
        $validation_errors[] = "Name field is required";
    }
    
    if (empty($submitted_email)) {
        $validation_errors[] = "Email field is required";
    } elseif (!filter_var($submitted_email, FILTER_VALIDATE_EMAIL)) {
        $validation_errors[] = "Please provide a valid email address";
    }
    
    if (empty($submitted_message)) {
        $validation_errors[] = "Message field is required";
    }
    
    if (strlen($submitted_message) < 10) {
        $validation_errors[] = "Message must be at least 10 characters long";
    }
    
    if (strlen($submitted_name) < 2) {
        $validation_errors[] = "Name must be at least 2 characters long";
    }
    
    if (!empty($validation_errors)) {
        header("Location: /thank/");
        exit;
    }
    
    $recipient_email = "support@alhojoom.com";
    
    $sanitized_name = htmlspecialchars($submitted_name, ENT_QUOTES, 'UTF-8');
    $sanitized_email = filter_var($submitted_email, FILTER_SANITIZE_EMAIL);
    $sanitized_phone = htmlspecialchars($submitted_phone, ENT_QUOTES, 'UTF-8');
    $sanitized_message = htmlspecialchars($submitted_message, ENT_QUOTES, 'UTF-8');
    $sanitized_subject = !empty($submitted_subject) ? htmlspecialchars($submitted_subject, ENT_QUOTES, 'UTF-8') : "New Form Submission";
    
    $email_subject = "New Contact Form Submission: " . $sanitized_subject;
    
    $email_body = "You have received a new contact form submission.\n\n";
    $email_body .= "Name: " . $sanitized_name . "\n";
    $email_body .= "Email: " . $sanitized_email . "\n";
    
    if (!empty($sanitized_phone)) {
        $email_body .= "Phone: " . $sanitized_phone . "\n";
    }
    
    $email_body .= "Subject: " . $sanitized_subject . "\n";
    $email_body .= "Message:\n" . $sanitized_message . "\n\n";
    $email_body .= "---\n";
    $email_body .= "Submission received on: " . date('Y-m-d H:i:s') . "\n";
    $email_body .= "IP Address: " . $_SERVER['REMOTE_ADDR'] . "\n";
    
    $email_headers = "From: " . $sanitized_email . "\r\n";
    $email_headers .= "Reply-To: " . $sanitized_email . "\r\n";
    $email_headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
    $email_headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";
    
    $email_subject = "=?UTF-8?B?" . base64_encode($email_subject) . "?=";
    
    $mail_sent = @mail($recipient_email, $email_subject, $email_body, $email_headers);
    
    header("Location: /thank/");
    exit;
    
} else {
    header("Location: /thank/");
    exit;
}
?>