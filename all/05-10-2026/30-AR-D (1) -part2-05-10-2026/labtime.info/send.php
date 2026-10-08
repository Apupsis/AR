<?php
header('Content-Type: text/html; charset=utf-8');

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    
    if (!empty($_POST["website"])) {
        header("Location: /thank/");
        exit;
    }
    
    $validation_errors = [];
    
    $incoming_name = isset($_POST["name"]) ? trim($_POST["name"]) : "";
    $incoming_email = isset($_POST["email"]) ? trim($_POST["email"]) : "";
    $incoming_phone = isset($_POST["phone"]) ? trim($_POST["phone"]) : "";
    $incoming_message = isset($_POST["message"]) ? trim($_POST["message"]) : "";
    $incoming_subject = isset($_POST["subject"]) ? trim($_POST["subject"]) : "New Form Submission";
    
    if (empty($incoming_name)) {
        $validation_errors[] = "Name is required";
    } elseif (strlen($incoming_name) < 2 || strlen($incoming_name) > 100) {
        $validation_errors[] = "Name must be between 2 and 100 characters";
    }
    
    if (empty($incoming_email)) {
        $validation_errors[] = "Email address is required";
    } elseif (!filter_var($incoming_email, FILTER_VALIDATE_EMAIL)) {
        $validation_errors[] = "Please provide a valid email address";
    }
    
    if (empty($incoming_message)) {
        $validation_errors[] = "Message cannot be empty";
    } elseif (strlen($incoming_message) < 10) {
        $validation_errors[] = "Message must be at least 10 characters long";
    }
    
    if (!empty($incoming_phone) && !preg_match('/^[0-9\s\-\+\(\)\.]+$/', $incoming_phone)) {
        $validation_errors[] = "Phone number format is invalid";
    }
    
    if (!empty($validation_errors)) {
        header("Location: /thank/");
        exit;
    }
    
    $sanitized_name = htmlspecialchars($incoming_name, ENT_QUOTES, 'UTF-8');
    $sanitized_email = filter_var($incoming_email, FILTER_SANITIZE_EMAIL);
    $sanitized_phone = htmlspecialchars($incoming_phone, ENT_QUOTES, 'UTF-8');
    $sanitized_message = htmlspecialchars($incoming_message, ENT_QUOTES, 'UTF-8');
    $sanitized_subject = htmlspecialchars($incoming_subject, ENT_QUOTES, 'UTF-8');
    
    $recipient_address = "support@labtime.info";
    
    $email_headers = "MIME-Version: 1.0\r\n";
    $email_headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
    $email_headers .= "From: " . $sanitized_email . "\r\n";
    $email_headers .= "Reply-To: " . $sanitized_email . "\r\n";
    $email_headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";
    
    $email_body = "New Form Submission\r\n";
    $email_body .= "==================\r\n\r\n";
    $email_body .= "Name: " . $sanitized_name . "\r\n";
    $email_body .= "Email: " . $sanitized_email . "\r\n";
    
    if (!empty($sanitized_phone)) {
        $email_body .= "Phone: " . $sanitized_phone . "\r\n";
    }
    
    $email_body .= "Subject: " . $sanitized_subject . "\r\n";
    $email_body .= "\r\nMessage:\r\n";
    $email_body .= $sanitized_message . "\r\n";
    $email_body .= "\r\n==================\r\n";
    $email_body .= "Submitted at: " . date('Y-m-d H:i:s') . "\r\n";
    $email_body .= "IP Address: " . htmlspecialchars($_SERVER['REMOTE_ADDR'], ENT_QUOTES, 'UTF-8') . "\r\n";
    
    $mail_sent = mail($recipient_address, $sanitized_subject, $email_body, $email_headers);
    
    header("Location: /thank/");
    exit;
    
} else {
    header("Location: /thank/");
    exit;
}
?>