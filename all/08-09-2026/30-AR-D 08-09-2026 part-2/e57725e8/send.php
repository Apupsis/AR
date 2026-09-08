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

    $validation_errors = [];

    if (empty($submission_name)) {
        $validation_errors[] = "Name is required";
    }

    if (empty($submission_email)) {
        $validation_errors[] = "Email is required";
    } elseif (!filter_var($submission_email, FILTER_VALIDATE_EMAIL)) {
        $validation_errors[] = "Please provide a valid email address";
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

    $recipient_address = "support@academy-backhand.com";

    $email_headers = "From: " . $sanitized_email . "\r\n";
    $email_headers .= "Reply-To: " . $sanitized_email . "\r\n";
    $email_headers .= "MIME-Version: 1.0\r\n";
    $email_headers .= "Content-Type: text/html; charset=UTF-8\r\n";

    $email_body = "<html><body>";
    $email_body .= "<h2>" . $sanitized_subject . "</h2>";
    $email_body .= "<p><strong>Name:</strong> " . $sanitized_name . "</p>";
    $email_body .= "<p><strong>Email:</strong> " . $sanitized_email . "</p>";
    if (!empty($sanitized_phone)) {
        $email_body .= "<p><strong>Phone:</strong> " . $sanitized_phone . "</p>";
    }
    $email_body .= "<p><strong>Message:</strong></p>";
    $email_body .= "<p>" . nl2br($sanitized_message) . "</p>";
    $email_body .= "</body></html>";

    $mail_sent = mail($recipient_address, $sanitized_subject, $email_body, $email_headers);

    header("Location: /thank/");
    exit;

} else {
    header("Location: /thank/");
    exit;
}
?>