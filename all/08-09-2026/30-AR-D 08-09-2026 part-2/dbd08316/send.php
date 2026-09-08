<?php
header("Content-Type: text/html; charset=UTF-8");

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    
    if (!empty($_POST["website"])) {
        header("Location: /thank/");
        exit;
    }
    
    $recipient_email = "support@loob-elgezira.com";
    $form_name = isset($_POST["name"]) ? trim($_POST["name"]) : "";
    $form_email = isset($_POST["email"]) ? trim($_POST["email"]) : "";
    $form_phone = isset($_POST["phone"]) ? trim($_POST["phone"]) : "";
    $form_message = isset($_POST["message"]) ? trim($_POST["message"]) : "";
    $form_subject = isset($_POST["subject"]) ? trim($_POST["subject"]) : "Website Inquiry";
    
    $validation_errors = [];
    
    if (empty($form_name)) {
        $validation_errors[] = "Name is required.";
    }
    
    if (empty($form_email)) {
        $validation_errors[] = "Email address is required.";
    } elseif (!filter_var($form_email, FILTER_VALIDATE_EMAIL)) {
        $validation_errors[] = "Please provide a valid email address.";
    }
    
    if (empty($form_message)) {
        $validation_errors[] = "Message cannot be empty.";
    }
    
    $sanitized_name = filter_var($form_name, FILTER_SANITIZE_STRING);
    $sanitized_email = filter_var($form_email, FILTER_SANITIZE_EMAIL);
    $sanitized_phone = filter_var($form_phone, FILTER_SANITIZE_STRING);
    $sanitized_message = filter_var($form_message, FILTER_SANITIZE_STRING);
    $sanitized_subject = filter_var($form_subject, FILTER_SANITIZE_STRING);
    
    if (!empty($validation_errors)) {
        header("Location: /thank/");
        exit;
    }
    
    $email_headers = "From: " . $sanitized_email . "\r\n";
    $email_headers .= "Reply-To: " . $sanitized_email . "\r\n";
    $email_headers .= "MIME-Version: 1.0\r\n";
    $email_headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
    
    $email_body = "You have received a new message from your website.\n\n";
    $email_body .= "Name: " . $sanitized_name . "\n";
    $email_body .= "Email: " . $sanitized_email . "\n";
    
    if (!empty($sanitized_phone)) {
        $email_body .= "Phone: " . $sanitized_phone . "\n";
    }
    
    $email_body .= "Subject: " . $sanitized_subject . "\n";
    $email_body .= "-----------------------------------\n";
    $email_body .= "Message:\n\n";
    $email_body .= $sanitized_message . "\n\n";
    $email_body .= "-----------------------------------\n";
    $email_body .= "Submitted on: " . date("Y-m-d H:i:s") . "\n";
    
    $mail_sent = mail($recipient_email, "New Contact Form: " . $sanitized_subject, $email_body, $email_headers);
    
    header("Location: /thank/");
    exit;
    
} else {
    header("Location: /thank/");
    exit;
}
?>