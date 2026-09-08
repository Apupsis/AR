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
    
    if (empty($submission_name)) {
        $validation_errors[] = "Name is required";
    }
    
    if (empty($submission_email)) {
        $validation_errors[] = "Email is required";
    } elseif (!filter_var($submission_email, FILTER_VALIDATE_EMAIL)) {
        $validation_errors[] = "Email format is invalid";
    }
    
    if (empty($submission_message)) {
        $validation_errors[] = "Message is required";
    }
    
    if (!empty($validation_errors)) {
        header("Location: /thank/");
        exit;
    }
    
    $recipient_email = "support@voltennisacademy.com";
    
    $email_subject = "=?UTF-8?B?" . base64_encode($submission_subject) . "?=";
    
    $sanitized_name = htmlspecialchars($submission_name, ENT_QUOTES, 'UTF-8');
    $sanitized_email = filter_var($submission_email, FILTER_SANITIZE_EMAIL);
    $sanitized_phone = htmlspecialchars($submission_phone, ENT_QUOTES, 'UTF-8');
    $sanitized_message = htmlspecialchars($submission_message, ENT_QUOTES, 'UTF-8');
    
    $email_body = "Name: " . $sanitized_name . "\r\n";
    $email_body .= "Email: " . $sanitized_email . "\r\n";
    
    if (!empty($sanitized_phone)) {
        $email_body .= "Phone: " . $sanitized_phone . "\r\n";
    }
    
    $email_body .= "Message:\r\n" . $sanitized_message . "\r\n";
    
    $email_headers = "From: " . $sanitized_email . "\r\n";
    $email_headers .= "Reply-To: " . $sanitized_email . "\r\n";
    $email_headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
    $email_headers .= "X-Mailer: PHP/" . phpversion();
    
    $email_result = mail($recipient_email, $email_subject, $email_body, $email_headers);
    
    header("Location: /thank/");
    exit;
} else {
    header("Location: /thank/");
    exit;
}
?>