<?php
header('Content-Type: text/html; charset=utf-8');

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    
    if (!empty($_POST["website"])) {
        header("Location: /thank/");
        exit;
    }
    
    $submission_data = [
        'name' => '',
        'email' => '',
        'phone' => '',
        'message' => '',
        'subject' => ''
    ];
    
    $validation_errors = [];
    
    foreach ($submission_data as $field => $value) {
        if (isset($_POST[$field])) {
            $submission_data[$field] = trim($_POST[$field]);
        }
    }
    
    if (empty($submission_data['name'])) {
        $validation_errors[] = 'Name is required';
    } else if (strlen($submission_data['name']) < 2) {
        $validation_errors[] = 'Name must be at least 2 characters';
    } else if (strlen($submission_data['name']) > 100) {
        $validation_errors[] = 'Name cannot exceed 100 characters';
    }
    
    if (empty($submission_data['email'])) {
        $validation_errors[] = 'Email is required';
    } else if (!filter_var($submission_data['email'], FILTER_VALIDATE_EMAIL)) {
        $validation_errors[] = 'Please provide a valid email address';
    }
    
    if (empty($submission_data['message'])) {
        $validation_errors[] = 'Message is required';
    } else if (strlen($submission_data['message']) < 10) {
        $validation_errors[] = 'Message must be at least 10 characters';
    } else if (strlen($submission_data['message']) > 5000) {
        $validation_errors[] = 'Message cannot exceed 5000 characters';
    }
    
    if (!empty($submission_data['phone']) && strlen($submission_data['phone']) > 20) {
        $validation_errors[] = 'Phone number is too long';
    }
    
    if (!empty($submission_data['subject']) && strlen($submission_data['subject']) > 200) {
        $validation_errors[] = 'Subject cannot exceed 200 characters';
    }
    
    if (count($validation_errors) > 0) {
        header("Location: /thank/");
        exit;
    }
    
    $recipient_email = "info@equine-care.com";
    
    $sanitized_name = htmlspecialchars($submission_data['name'], ENT_QUOTES, 'UTF-8');
    $sanitized_email = filter_var($submission_data['email'], FILTER_SANITIZE_EMAIL);
    $sanitized_phone = htmlspecialchars($submission_data['phone'], ENT_QUOTES, 'UTF-8');
    $sanitized_message = htmlspecialchars($submission_data['message'], ENT_QUOTES, 'UTF-8');
    $sanitized_subject = htmlspecialchars($submission_data['subject'], ENT_QUOTES, 'UTF-8');
    
    $email_subject = "New Form Submission" . (!empty($sanitized_subject) ? " - " . $sanitized_subject : "");
    
    $email_headers = "MIME-Version: 1.0\r\n";
    $email_headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
    $email_headers .= "From: " . $sanitized_email . "\r\n";
    $email_headers .= "Reply-To: " . $sanitized_email . "\r\n";
    
    $email_body = "New Form Submission\r\n";
    $email_body .= "===================\r\n\r\n";
    $email_body .= "Name: " . $sanitized_name . "\r\n";
    $email_body .= "Email: " . $sanitized_email . "\r\n";
    
    if (!empty($sanitized_phone)) {
        $email_body .= "Phone: " . $sanitized_phone . "\r\n";
    }
    
    if (!empty($sanitized_subject)) {
        $email_body .= "Subject: " . $sanitized_subject . "\r\n";
    }
    
    $email_body .= "\r\nMessage:\r\n";
    $email_body .= "--------\r\n";
    $email_body .= $sanitized_message . "\r\n";
    $email_body .= "\r\nSubmitted at: " . date('Y-m-d H:i:s') . "\r\n";
    $email_body .= "IP Address: " . htmlspecialchars($_SERVER['REMOTE_ADDR'], ENT_QUOTES, 'UTF-8') . "\r\n";
    
    $mail_sent = mail($recipient_email, $email_subject, $email_body, $email_headers);
    
    header("Location: /thank/");
    exit;
    
} else {
    header("Location: /thank/");
    exit;
}
?>