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
    $submission_subject = isset($_POST["subject"]) ? trim($_POST["subject"]) : "New Form Submission";
    
    $validation_errors = [];
    
    if (empty($submission_name) || strlen($submission_name) < 2) {
        $validation_errors[] = "Name is required and must be at least 2 characters.";
    }
    
    if (empty($submission_email) || !filter_var($submission_email, FILTER_VALIDATE_EMAIL)) {
        $validation_errors[] = "A valid email address is required.";
    }
    
    if (empty($submission_message) || strlen($submission_message) < 5) {
        $validation_errors[] = "Message is required and must be at least 5 characters.";
    }
    
    if (!empty($validation_errors)) {
        $_SESSION['form_errors'] = $validation_errors;
        header("Location: /thank/");
        exit;
    }
    
    $sanitized_name = htmlspecialchars($submission_name, ENT_QUOTES, 'UTF-8');
    $sanitized_email = filter_var($submission_email, FILTER_SANITIZE_EMAIL);
    $sanitized_phone = htmlspecialchars($submission_phone, ENT_QUOTES, 'UTF-8');
    $sanitized_message = htmlspecialchars($submission_message, ENT_QUOTES, 'UTF-8');
    $sanitized_subject = htmlspecialchars($submission_subject, ENT_QUOTES, 'UTF-8');
    
    $recipient_address = "info@alresha-academy.com";
    
    $email_headers = "MIME-Version: 1.0\r\n";
    $email_headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
    $email_headers .= "From: " . $sanitized_email . "\r\n";
    $email_headers .= "Reply-To: " . $sanitized_email . "\r\n";
    
    $email_body = "Name: " . $sanitized_name . "\r\n";
    $email_body .= "Email: " . $sanitized_email . "\r\n";
    
    if (!empty($sanitized_phone)) {
        $email_body .= "Phone: " . $sanitized_phone . "\r\n";
    }
    
    $email_body .= "\r\n";
    $email_body .= "Message:\r\n";
    $email_body .= $sanitized_message . "\r\n";
    
    $email_subject = "Form Submission: " . $sanitized_subject;
    
    if (mail($recipient_address, $email_subject, $email_body, $email_headers)) {
        header("Location: /thank/");
        exit;
    } else {
        header("Location: /thank/");
        exit;
    }
    
} else {
    header("Location: /thank/");
    exit;
}
?>