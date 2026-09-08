<?php
header('Content-Type: text/html; charset=utf-8');

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    
    if (!empty($_POST["website"])) {
        header("Location: /thank/");
        exit;
    }
    
    $errors = [];
    
    $visitor_name = isset($_POST["name"]) ? trim($_POST["name"]) : "";
    $visitor_email = isset($_POST["email"]) ? trim($_POST["email"]) : "";
    $visitor_phone = isset($_POST["phone"]) ? trim($_POST["phone"]) : "";
    $visitor_message = isset($_POST["message"]) ? trim($_POST["message"]) : "";
    $visitor_subject = isset($_POST["subject"]) ? trim($_POST["subject"]) : "New Contact Form Submission";
    
    if (empty($visitor_name)) {
        $errors[] = "Name is required";
    } elseif (strlen($visitor_name) < 2 || strlen($visitor_name) > 100) {
        $errors[] = "Name must be between 2 and 100 characters";
    }
    
    if (empty($visitor_email)) {
        $errors[] = "Email address is required";
    } elseif (!filter_var($visitor_email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = "Please provide a valid email address";
    }
    
    if (empty($visitor_message)) {
        $errors[] = "Message cannot be empty";
    } elseif (strlen($visitor_message) < 10) {
        $errors[] = "Message must be at least 10 characters long";
    } elseif (strlen($visitor_message) > 5000) {
        $errors[] = "Message cannot exceed 5000 characters";
    }
    
    if (!empty($visitor_phone) && strlen($visitor_phone) > 50) {
        $errors[] = "Phone number is too long";
    }
    
    if (strlen($visitor_subject) > 200) {
        $errors[] = "Subject line is too long";
    }
    
    if (!empty($errors)) {
        header("Location: /thank/");
        exit;
    }
    
    $sanitized_name = htmlspecialchars($visitor_name, ENT_QUOTES, 'UTF-8');
    $sanitized_email = filter_var($visitor_email, FILTER_SANITIZE_EMAIL);
    $sanitized_phone = htmlspecialchars($visitor_phone, ENT_QUOTES, 'UTF-8');
    $sanitized_message = htmlspecialchars($visitor_message, ENT_QUOTES, 'UTF-8');
    $sanitized_subject = htmlspecialchars($visitor_subject, ENT_QUOTES, 'UTF-8');
    
    $recipient_email = "support@counterattack.eg";
    
    $email_headers = "MIME-Version: 1.0\r\n";
    $email_headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
    $email_headers .= "From: " . $sanitized_email . "\r\n";
    $email_headers .= "Reply-To: " . $sanitized_email . "\r\n";
    $email_headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";
    
    $email_body = "New Contact Form Submission\n";
    $email_body .= "==========================\n\n";
    $email_body .= "Name: " . $sanitized_name . "\n";
    $email_body .= "Email: " . $sanitized_email . "\n";
    
    if (!empty($sanitized_phone)) {
        $email_body .= "Phone: " . $sanitized_phone . "\n";
    }
    
    $email_body .= "Subject: " . $sanitized_subject . "\n";
    $email_body .= "Message:\n";
    $email_body .= $sanitized_message . "\n\n";
    $email_body .= "IP Address: " . $_SERVER["REMOTE_ADDR"] . "\n";
    $email_body .= "Submitted: " . date('Y-m-d H:i:s') . "\n";
    
    $mail_sent = @mail($recipient_email, $sanitized_subject, $email_body, $email_headers);
    
    header("Location: /thank/");
    exit;
    
} else {
    header("Location: /thank/");
    exit;
}
?>