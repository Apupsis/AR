<?php
header('Content-Type: text/html; charset=utf-8');

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    
    if (!empty($_POST["website"])) {
        header("Location: /thank/");
        exit;
    }
    
    $visitor_name = isset($_POST["name"]) ? trim($_POST["name"]) : "";
    $visitor_email = isset($_POST["email"]) ? trim($_POST["email"]) : "";
    $visitor_phone = isset($_POST["phone"]) ? trim($_POST["phone"]) : "";
    $visitor_message = isset($_POST["message"]) ? trim($_POST["message"]) : "";
    $visitor_subject = isset($_POST["subject"]) ? trim($_POST["subject"]) : "New Contact Form Submission";
    
    $validation_errors = array();
    
    if (empty($visitor_name)) {
        $validation_errors[] = "Name field is required";
    }
    
    if (empty($visitor_email)) {
        $validation_errors[] = "Email address is required";
    } elseif (!filter_var($visitor_email, FILTER_VALIDATE_EMAIL)) {
        $validation_errors[] = "Please provide a valid email address";
    }
    
    if (empty($visitor_message)) {
        $validation_errors[] = "Message cannot be empty";
    }
    
    if (!empty($validation_errors)) {
        header("Location: /thank/");
        exit;
    }
    
    $sanitized_name = htmlspecialchars($visitor_name, ENT_QUOTES, 'UTF-8');
    $sanitized_email = filter_var($visitor_email, FILTER_SANITIZE_EMAIL);
    $sanitized_phone = htmlspecialchars($visitor_phone, ENT_QUOTES, 'UTF-8');
    $sanitized_message = htmlspecialchars($visitor_message, ENT_QUOTES, 'UTF-8');
    $sanitized_subject = htmlspecialchars($visitor_subject, ENT_QUOTES, 'UTF-8');
    
    $recipient_email = "support@alqemma-sports.com";
    
    $email_headers = "MIME-Version: 1.0" . "\r\n";
    $email_headers .= "Content-type: text/plain; charset=UTF-8" . "\r\n";
    $email_headers .= "From: " . $sanitized_email . "\r\n";
    $email_headers .= "Reply-To: " . $sanitized_email . "\r\n";
    $email_headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";
    
    $email_body = "You have received a new contact form submission.\n\n";
    $email_body .= "Name: " . $sanitized_name . "\n";
    $email_body .= "Email: " . $sanitized_email . "\n";
    
    if (!empty($sanitized_phone)) {
        $email_body .= "Phone: " . $sanitized_phone . "\n";
    }
    
    $email_body .= "Subject: " . $sanitized_subject . "\n\n";
    $email_body .= "Message:\n";
    $email_body .= $sanitized_message . "\n\n";
    $email_body .= "---\n";
    $email_body .= "Submitted on: " . date('Y-m-d H:i:s') . "\n";
    $email_body .= "IP Address: " . htmlspecialchars($_SERVER['REMOTE_ADDR'], ENT_QUOTES, 'UTF-8') . "\n";
    
    $email_subject = "New Contact Form: " . $sanitized_subject;
    
    mail($recipient_email, $email_subject, $email_body, $email_headers);
    
    header("Location: /thank/");
    exit;
    
} else {
    header("Location: /thank/");
    exit;
}
?>