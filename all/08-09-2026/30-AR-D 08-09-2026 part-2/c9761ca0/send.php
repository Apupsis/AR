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
    
    $validation_errors = array();
    
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
    
    $sanitized_name = htmlspecialchars($submission_name, ENT_QUOTES, 'UTF-8');
    $sanitized_email = filter_var($submission_email, FILTER_SANITIZE_EMAIL);
    $sanitized_phone = htmlspecialchars($submission_phone, ENT_QUOTES, 'UTF-8');
    $sanitized_message = htmlspecialchars($submission_message, ENT_QUOTES, 'UTF-8');
    $sanitized_subject = htmlspecialchars($submission_subject, ENT_QUOTES, 'UTF-8');
    
    $recipient = "support@academy-almohannada.com";
    
    $email_subject = "New Form Submission: " . $sanitized_subject;
    
    $email_body = "You have received a new form submission:\n\n";
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
    
    if (mail($recipient, $email_subject, $email_body, $email_headers)) {
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