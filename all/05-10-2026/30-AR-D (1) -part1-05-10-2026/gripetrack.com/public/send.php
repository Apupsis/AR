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
    }
    
    if (empty($visitor_email)) {
        $errors[] = "Email is required";
    } elseif (!filter_var($visitor_email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = "Invalid email format";
    }
    
    if (empty($visitor_message)) {
        $errors[] = "Message is required";
    }
    
    $visitor_name = preg_replace("/[^a-zA-Z0-9\s\-\.]/", "", $visitor_name);
    $visitor_email = filter_var($visitor_email, FILTER_SANITIZE_EMAIL);
    $visitor_phone = preg_replace("/[^0-9\s\-\+\(\)]/", "", $visitor_phone);
    $visitor_subject = preg_replace("/[^\x20-\x7E]/", "", $visitor_subject);
    $visitor_message = htmlspecialchars($visitor_message, ENT_QUOTES, 'UTF-8');
    
    if (count($errors) > 0) {
        header("Location: /thank/");
        exit;
    }
    
    $recipient_email = "support@gripetrack.com";
    
    $email_headers = "From: " . $visitor_email . "\r\n";
    $email_headers .= "Reply-To: " . $visitor_email . "\r\n";
    $email_headers .= "MIME-Version: 1.0\r\n";
    $email_headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
    
    $email_body = "Name: " . $visitor_name . "\r\n";
    $email_body .= "Email: " . $visitor_email . "\r\n";
    
    if (!empty($visitor_phone)) {
        $email_body .= "Phone: " . $visitor_phone . "\r\n";
    }
    
    $email_body .= "Subject: " . $visitor_subject . "\r\n";
    $email_body .= "---\r\n";
    $email_body .= $visitor_message . "\r\n";
    $email_body .= "---\r\n";
    $email_body .= "Submitted at: " . date('Y-m-d H:i:s') . "\r\n";
    
    $mail_sent = mail($recipient_email, $visitor_subject, $email_body, $email_headers);
    
    header("Location: /thank/");
    exit;
    
} else {
    header("Location: /thank/");
    exit;
}
?>