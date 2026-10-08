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
        $validation_errors[] = "Name is required";
    } elseif (strlen($submission_name) < 2 || strlen($submission_name) > 100) {
        $validation_errors[] = "Name must be between 2 and 100 characters";
    }
    
    if (empty($submission_email)) {
        $validation_errors[] = "Email address is required";
    } elseif (!filter_var($submission_email, FILTER_VALIDATE_EMAIL)) {
        $validation_errors[] = "Please enter a valid email address";
    }
    
    if (empty($submission_message)) {
        $validation_errors[] = "Message cannot be empty";
    } elseif (strlen($submission_message) < 10) {
        $validation_errors[] = "Message must be at least 10 characters long";
    }
    
    if (!empty($submission_phone) && !preg_match('/^[0-9\s\-\+\(\)\.]+$/', $submission_phone)) {
        $validation_errors[] = "Please enter a valid phone number";
    }
    
    if (!empty($validation_errors)) {
        header("Location: /thank/");
        exit;
    }
    
    $recipient_address = "support@starnet-volleyball.com";
    
    $sanitized_name = htmlspecialchars($submission_name, ENT_QUOTES, 'UTF-8');
    $sanitized_email = filter_var($submission_email, FILTER_SANITIZE_EMAIL);
    $sanitized_phone = htmlspecialchars($submission_phone, ENT_QUOTES, 'UTF-8');
    $sanitized_message = htmlspecialchars($submission_message, ENT_QUOTES, 'UTF-8');
    $sanitized_subject = htmlspecialchars($submission_subject, ENT_QUOTES, 'UTF-8');
    
    $email_body = "New Contact Form Submission\n";
    $email_body .= "============================\n\n";
    $email_body .= "Name: " . $sanitized_name . "\n";
    $email_body .= "Email: " . $sanitized_email . "\n";
    
    if (!empty($sanitized_phone)) {
        $email_body .= "Phone: " . $sanitized_phone . "\n";
    }
    
    $email_body .= "Subject: " . $sanitized_subject . "\n";
    $email_body .= "Message:\n" . $sanitized_message . "\n";
    
    $email_headers = "From: " . $sanitized_email . "\r\n";
    $email_headers .= "Reply-To: " . $sanitized_email . "\r\n";
    $email_headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
    $email_headers .= "X-Mailer: PHP/" . phpversion();
    
    $safe_subject = "=?UTF-8?B?" . base64_encode($sanitized_subject) . "?=";
    
    mail($recipient_address, $safe_subject, $email_body, $email_headers);
    
    header("Location: /thank/");
    exit;
    
} else {
    header("Location: /thank/");
    exit;
}
?>