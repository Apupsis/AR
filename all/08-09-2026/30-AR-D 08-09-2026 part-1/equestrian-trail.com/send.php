<?php
header("Content-Type: text/html; charset=UTF-8");

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    
    if (!empty($_POST["website"])) {
        header("Location: /thank/");
        exit;
    }
    
    $submission_name = isset($_POST["name"]) ? trim($_POST["name"]) : "";
    $submission_email = isset($_POST["email"]) ? trim($_POST["email"]) : "";
    $submission_phone = isset($_POST["phone"]) ? trim($_POST["phone"]) : "";
    $submission_message = isset($_POST["message"]) ? trim($_POST["message"]) : "";
    $submission_subject = isset($_POST["subject"]) ? trim($_POST["subject"]) : "Website Inquiry";
    
    $validation_errors = array();
    
    if (empty($submission_name)) {
        $validation_errors[] = "Name is required";
    }
    
    if (empty($submission_email)) {
        $validation_errors[] = "Email address is required";
    } elseif (!filter_var($submission_email, FILTER_VALIDATE_EMAIL)) {
        $validation_errors[] = "Please provide a valid email address";
    }
    
    if (empty($submission_message)) {
        $validation_errors[] = "Message cannot be empty";
    }
    
    if (!empty($validation_errors)) {
        header("Location: /thank/");
        exit;
    }
    
    $sanitized_name = htmlspecialchars($submission_name, ENT_QUOTES, "UTF-8");
    $sanitized_email = filter_var($submission_email, FILTER_SANITIZE_EMAIL);
    $sanitized_phone = htmlspecialchars($submission_phone, ENT_QUOTES, "UTF-8");
    $sanitized_message = htmlspecialchars($submission_message, ENT_QUOTES, "UTF-8");
    $sanitized_subject = htmlspecialchars($submission_subject, ENT_QUOTES, "UTF-8");
    
    $recipient_email = "info@equestrian-trail.com";
    
    $email_subject = "New Form Submission: " . $sanitized_subject;
    
    $email_body = "Name: " . $sanitized_name . "\r\n";
    $email_body .= "Email: " . $sanitized_email . "\r\n";
    
    if (!empty($sanitized_phone)) {
        $email_body .= "Phone: " . $sanitized_phone . "\r\n";
    }
    
    $email_body .= "\r\nMessage:\r\n" . $sanitized_message . "\r\n";
    
    $email_headers = "From: " . $sanitized_email . "\r\n";
    $email_headers .= "Reply-To: " . $sanitized_email . "\r\n";
    $email_headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
    
    $email_subject_encoded = "=?UTF-8?B?" . base64_encode($email_subject) . "?=";
    
    $mail_sent = mail($recipient_email, $email_subject_encoded, $email_body, $email_headers);
    
    header("Location: /thank/");
    exit;
    
} else {
    header("Location: /thank/");
    exit;
}
?>