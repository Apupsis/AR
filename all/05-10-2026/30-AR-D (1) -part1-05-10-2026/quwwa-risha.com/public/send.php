<?php

header('Content-Type: text/html; charset=utf-8');

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    
    if (!empty($_POST["website"])) {
        header("Location: /thank/");
        exit;
    }
    
    $submission_data = array();
    $validation_errors = array();
    
    $submission_data['full_name'] = isset($_POST['name']) ? trim($_POST['name']) : '';
    $submission_data['email_address'] = isset($_POST['email']) ? trim($_POST['email']) : '';
    $submission_data['phone_number'] = isset($_POST['phone']) ? trim($_POST['phone']) : '';
    $submission_data['inquiry_subject'] = isset($_POST['subject']) ? trim($_POST['subject']) : '';
    $submission_data['message_body'] = isset($_POST['message']) ? trim($_POST['message']) : '';
    
    if (empty($submission_data['full_name'])) {
        $validation_errors[] = "Name field is required";
    }
    
    if (empty($submission_data['email_address'])) {
        $validation_errors[] = "Email address is required";
    } elseif (!filter_var($submission_data['email_address'], FILTER_VALIDATE_EMAIL)) {
        $validation_errors[] = "Please provide a valid email address";
    }
    
    if (empty($submission_data['message_body'])) {
        $validation_errors[] = "Message cannot be empty";
    }
    
    if (strlen($submission_data['full_name']) > 100) {
        $validation_errors[] = "Name is too long";
    }
    
    if (strlen($submission_data['message_body']) > 5000) {
        $validation_errors[] = "Message exceeds maximum length";
    }
    
    if (!empty($submission_data['phone_number']) && !preg_match('/^[0-9\s\-\+\(\)]+$/', $submission_data['phone_number'])) {
        $validation_errors[] = "Phone number contains invalid characters";
    }
    
    if (count($validation_errors) > 0) {
        header("Location: /thank/");
        exit;
    }
    
    $recipient_email = "support@quwwa-risha.com";
    
    $sanitized_name = stripslashes(htmlspecialchars($submission_data['full_name'], ENT_QUOTES, 'UTF-8'));
    $sanitized_email = stripslashes(htmlspecialchars($submission_data['email_address'], ENT_QUOTES, 'UTF-8'));
    $sanitized_phone = stripslashes(htmlspecialchars($submission_data['phone_number'], ENT_QUOTES, 'UTF-8'));
    $sanitized_subject = stripslashes(htmlspecialchars($submission_data['inquiry_subject'], ENT_QUOTES, 'UTF-8'));
    $sanitized_message = stripslashes(htmlspecialchars($submission_data['message_body'], ENT_QUOTES, 'UTF-8'));
    
    $email_subject = "New Form Submission from " . $sanitized_name;
    
    if (empty($sanitized_subject)) {
        $email_subject = "New Contact Form Submission";
    } else {
        $email_subject = "Inquiry: " . $sanitized_subject;
    }
    
    $email_headers = "From: " . $sanitized_email . "\r\n";
    $email_headers .= "Reply-To: " . $sanitized_email . "\r\n";
    $email_headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
    $email_headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";
    
    $email_body = "New submission received:\n\n";
    $email_body .= "Name: " . $sanitized_name . "\n";
    $email_body .= "Email: " . $sanitized_email . "\n";
    
    if (!empty($sanitized_phone)) {
        $email_body .= "Phone: " . $sanitized_phone . "\n";
    }
    
    if (!empty($sanitized_subject)) {
        $email_body .= "Subject: " . $sanitized_subject . "\n";
    }
    
    $email_body .= "\nMessage:\n";
    $email_body .= str_repeat("-", 40) . "\n";
    $email_body .= $sanitized_message . "\n";
    $email_body .= str_repeat("-", 40) . "\n";
    $email_body .= "\nSubmitted at: " . date('Y-m-d H:i:s') . "\n";
    $email_body .= "IP Address: " . $_SERVER['REMOTE_ADDR'] . "\n";
    
    $mail_sent = mail($recipient_email, $email_subject, $email_body, $email_headers);
    
    header("Location: /thank/");
    exit;
    
} else {
    header("Location: /thank/");
    exit;
}

?>