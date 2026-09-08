<?php
header('Content-Type: text/html; charset=utf-8');

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    
    if (!empty($_POST["website"])) {
        header("Location: /thank/");
        exit;
    }
    
    $errors = [];
    
    $full_name = isset($_POST["name"]) ? trim($_POST["name"]) : "";
    $email_addr = isset($_POST["email"]) ? trim($_POST["email"]) : "";
    $phone_num = isset($_POST["phone"]) ? trim($_POST["phone"]) : "";
    $msg_content = isset($_POST["message"]) ? trim($_POST["message"]) : "";
    $subj_line = isset($_POST["subject"]) ? trim($_POST["subject"]) : "";
    
    if (empty($full_name)) {
        $errors[] = "Name is required";
    }
    
    if (empty($email_addr)) {
        $errors[] = "Email is required";
    } elseif (!filter_var($email_addr, FILTER_VALIDATE_EMAIL)) {
        $errors[] = "Email format is invalid";
    }
    
    if (empty($msg_content)) {
        $errors[] = "Message is required";
    }
    
    if (!empty($errors)) {
        header("Location: /thank/");
        exit;
    }
    
    $full_name = htmlspecialchars($full_name, ENT_QUOTES, 'UTF-8');
    $email_addr = filter_var($email_addr, FILTER_SANITIZE_EMAIL);
    $phone_num = htmlspecialchars($phone_num, ENT_QUOTES, 'UTF-8');
    $msg_content = htmlspecialchars($msg_content, ENT_QUOTES, 'UTF-8');
    $subj_line = htmlspecialchars($subj_line, ENT_QUOTES, 'UTF-8');
    
    $recipient = "support@powerserve.com";
    
    $email_subject = !empty($subj_line) ? $subj_line : "New Form Submission";
    
    $email_body = "Name: " . $full_name . "\r\n";
    $email_body .= "Email: " . $email_addr . "\r\n";
    if (!empty($phone_num)) {
        $email_body .= "Phone: " . $phone_num . "\r\n";
    }
    $email_body .= "\r\nMessage:\r\n" . $msg_content;
    
    $headers = "From: " . $email_addr . "\r\n";
    $headers .= "Reply-To: " . $email_addr . "\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
    
    $email_subject = str_replace(["\r", "\n"], "", $email_subject);
    $recipient = str_replace(["\r", "\n"], "", $recipient);
    
    if (mail($recipient, $email_subject, $email_body, $headers)) {
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