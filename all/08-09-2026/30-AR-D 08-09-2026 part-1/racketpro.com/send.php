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
    
    $validation_errors = [];
    
    if (empty($submitted_name)) {
        $validation_errors[] = "Name field is required";
    }
    
    if (empty($submitted_email)) {
        $validation_errors[] = "Email address is required";
    } elseif (!filter_var($submitted_email, FILTER_VALIDATE_EMAIL)) {
        $validation_errors[] = "Please provide a valid email address";
    }
    
    if (empty($submitted_message)) {
        $validation_errors[] = "Message cannot be empty";
    }
    
    if (count($validation_errors) > 0) {
        header("Location: /thank/");
        exit;
    }
    
    $sanitized_name = htmlspecialchars($submitted_name, ENT_QUOTES, 'UTF-8');
    $sanitized_email = filter_var($submitted_email, FILTER_SANITIZE_EMAIL);
    $sanitized_phone = htmlspecialchars($submitted_phone, ENT_QUOTES, 'UTF-8');
    $sanitized_message = htmlspecialchars($submitted_message, ENT_QUOTES, 'UTF-8');
    $sanitized_subject = htmlspecialchars($submitted_subject, ENT_QUOTES, 'UTF-8');
    
    $recipient_email = "support@racketpro.com";
    
    $email_subject = "New Form Submission";
    if (!empty($sanitized_subject)) {
        $email_subject = "Form Submission: " . $sanitized_subject;
    }
    
    $email_body = "Name: " . $sanitized_name . "\n";
    $email_body .= "Email: " . $sanitized_email . "\n";
    
    if (!empty($sanitized_phone)) {
        $email_body .= "Phone: " . $sanitized_phone . "\n";
    }
    
    $email_body .= "Message: " . $sanitized_message . "\n";
    
    $email_headers = "From: " . $sanitized_email . "\r\n";
    $email_headers .= "Reply-To: " . $sanitized_email . "\r\n";
    $email_headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
    
    $mail_sent = mail($recipient_email, $email_subject, $email_body, $email_headers);
    
    header("Location: /thank/");
    exit;
    
} else {
    header("Location: /thank/");
    exit;
}
?>