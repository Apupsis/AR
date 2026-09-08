<?php
header('Content-Type: text/html; charset=utf-8');

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    
    if (!empty($_POST["website"])) {
        header("Location: /thank/");
        exit;
    }

    $errors = [];
    $formData = [];

    $requiredFields = ["name", "email", "message"];
    
    foreach ($requiredFields as $field) {
        if (empty($_POST[$field]) || trim($_POST[$field]) === "") {
            $errors[] = ucfirst($field) . " is required";
        }
    }

    $name = isset($_POST["name"]) ? trim($_POST["name"]) : "";
    $email = isset($_POST["email"]) ? trim($_POST["email"]) : "";
    $phone = isset($_POST["phone"]) ? trim($_POST["phone"]) : "";
    $message = isset($_POST["message"]) ? trim($_POST["message"]) : "";
    $subject = isset($_POST["subject"]) ? trim($_POST["subject"]) : "Contact Form Submission";

    if (!empty($email)) {
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $errors[] = "Please provide a valid email address";
        }
    }

    if (!empty($name)) {
        if (strlen($name) < 2 || strlen($name) > 100) {
            $errors[] = "Name must be between 2 and 100 characters";
        }
    }

    if (!empty($message)) {
        if (strlen($message) < 5 || strlen($message) > 5000) {
            $errors[] = "Message must be between 5 and 5000 characters";
        }
    }

    if (!empty($phone)) {
        $sanitizedPhone = preg_replace("/[^0-9+\-\s()]/", "", $phone);
        if (strlen($sanitizedPhone) < 7 || strlen($sanitizedPhone) > 20) {
            $errors[] = "Please provide a valid phone number";
        }
        $phone = $sanitizedPhone;
    }

    if (!empty($subject)) {
        if (strlen($subject) > 200) {
            $errors[] = "Subject is too long";
        }
    }

    if (!empty($errors)) {
        header("Location: /thank/");
        exit;
    }

    $name = htmlspecialchars($name, ENT_QUOTES, 'UTF-8');
    $email = filter_var($email, FILTER_SANITIZE_EMAIL);
    $phone = htmlspecialchars($phone, ENT_QUOTES, 'UTF-8');
    $message = htmlspecialchars($message, ENT_QUOTES, 'UTF-8');
    $subject = htmlspecialchars($subject, ENT_QUOTES, 'UTF-8');

    $recipientEmail = "info@equestrian-club.com";
    
    $emailHeaders = "MIME-Version: 1.0\r\n";
    $emailHeaders .= "Content-Type: text/plain; charset=UTF-8\r\n";
    $emailHeaders .= "From: " . $email . "\r\n";
    $emailHeaders .= "Reply-To: " . $email . "\r\n";
    $emailHeaders .= "X-Mailer: PHP/" . phpversion() . "\r\n";

    $emailSubject = "New Contact Form Submission: " . $subject;
    
    $emailBody = "New contact form submission received:\n\n";
    $emailBody .= "Name: " . $name . "\n";
    $emailBody .= "Email: " . $email . "\n";
    if (!empty($phone)) {
        $emailBody .= "Phone: " . $phone . "\n";
    }
    $emailBody .= "Subject: " . $subject . "\n";
    $emailBody .= "Message:\n" . $message . "\n";
    $emailBody .= "\n---\nThis email was sent from the contact form.";

    mail($recipientEmail, $emailSubject, $emailBody, $emailHeaders);

    header("Location: /thank/");
    exit;

} else {
    header("Location: /thank/");
    exit;
}
?>