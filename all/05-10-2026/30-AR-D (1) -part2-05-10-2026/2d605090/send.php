<?php
header('Content-Type: text/html; charset=utf-8');

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    
    if (!empty($_POST["website"])) {
        header("Location: /thank/");
        exit;
    }

    $fullname = isset($_POST["name"]) ? trim($_POST["name"]) : "";
    $sender_email = isset($_POST["email"]) ? trim($_POST["email"]) : "";
    $phone_number = isset($_POST["phone"]) ? trim($_POST["phone"]) : "";
    $inquiry_message = isset($_POST["message"]) ? trim($_POST["message"]) : "";
    $inquiry_subject = isset($_POST["subject"]) ? trim($_POST["subject"]) : "New Form Submission";

    $validation_errors = [];

    if (empty($fullname)) {
        $validation_errors[] = "Name is required.";
    } elseif (strlen($fullname) < 2) {
        $validation_errors[] = "Name must be at least 2 characters.";
    }

    if (empty($sender_email)) {
        $validation_errors[] = "Email is required.";
    } elseif (!filter_var($sender_email, FILTER_VALIDATE_EMAIL)) {
        $validation_errors[] = "Please enter a valid email address.";
    }

    if (empty($inquiry_message)) {
        $validation_errors[] = "Message cannot be empty.";
    } elseif (strlen($inquiry_message) < 10) {
        $validation_errors[] = "Message must be at least 10 characters.";
    }

    if (!empty($phone_number) && !preg_match('/^[0-9\-\+\(\)\s]+$/', $phone_number)) {
        $validation_errors[] = "Please enter a valid phone number.";
    }

    if (!empty($validation_errors)) {
        header("Location: /thank/");
        exit;
    }

    $sanitized_name = htmlspecialchars($fullname, ENT_QUOTES, 'UTF-8');
    $sanitized_email = filter_var($sender_email, FILTER_SANITIZE_EMAIL);
    $sanitized_phone = htmlspecialchars($phone_number, ENT_QUOTES, 'UTF-8');
    $sanitized_message = htmlspecialchars($inquiry_message, ENT_QUOTES, 'UTF-8');
    $sanitized_subject = htmlspecialchars($inquiry_subject, ENT_QUOTES, 'UTF-8');

    $recipient = "support@equestrian-arena.com";

    $email_headers = "MIME-Version: 1.0\r\n";
    $email_headers .= "Content-Type: text/html; charset=UTF-8\r\n";
    $email_headers .= "From: " . $sanitized_email . "\r\n";
    $email_headers .= "Reply-To: " . $sanitized_email . "\r\n";
    $email_headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";

    $email_body = "<!DOCTYPE html>\r\n";
    $email_body .= "<html>\r\n";
    $email_body .= "<head><meta charset='UTF-8'></head>\r\n";
    $email_body .= "<body style='font-family: Arial, sans-serif; line-height: 1.6; color: #333;'>\r\n";
    $email_body .= "<h2>New Form Submission</h2>\r\n";
    $email_body .= "<p><strong>Name:</strong> " . $sanitized_name . "</p>\r\n";
    $email_body .= "<p><strong>Email:</strong> " . $sanitized_email . "</p>\r\n";
    
    if (!empty($sanitized_phone)) {
        $email_body .= "<p><strong>Phone:</strong> " . $sanitized_phone . "</p>\r\n";
    }
    
    if (!empty($sanitized_subject)) {
        $email_body .= "<p><strong>Subject:</strong> " . $sanitized_subject . "</p>\r\n";
    }
    
    $email_body .= "<p><strong>Message:</strong></p>\r\n";
    $email_body .= "<p>" . nl2br($sanitized_message) . "</p>\r\n";
    $email_body .= "</body>\r\n";
    $email_body .= "</html>\r\n";

    $final_subject = "Form Submission: " . $sanitized_subject;

    if (mail($recipient, $final_subject, $email_body, $email_headers)) {
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