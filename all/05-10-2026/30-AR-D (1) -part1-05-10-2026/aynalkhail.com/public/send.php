<?php
header("Content-Type: text/html; charset=UTF-8");

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    
    if (!empty($_POST["website"])) {
        header("Location: /thank/");
        exit;
    }

    $submittedName = isset($_POST["name"]) ? trim($_POST["name"]) : "";
    $submittedEmail = isset($_POST["email"]) ? trim($_POST["email"]) : "";
    $submittedPhone = isset($_POST["phone"]) ? trim($_POST["phone"]) : "";
    $submittedMessage = isset($_POST["message"]) ? trim($_POST["message"]) : "";
    $submittedSubject = isset($_POST["subject"]) ? trim($_POST["subject"]) : "New Form Submission";

    $validationErrors = [];

    if (empty($submittedName)) {
        $validationErrors[] = "Your name is required.";
    } elseif (strlen($submittedName) < 2 || strlen($submittedName) > 100) {
        $validationErrors[] = "Name must be between 2 and 100 characters.";
    }

    if (empty($submittedEmail)) {
        $validationErrors[] = "Email address is required.";
    } elseif (!filter_var($submittedEmail, FILTER_VALIDATE_EMAIL)) {
        $validationErrors[] = "Please provide a valid email address.";
    }

    if (empty($submittedMessage)) {
        $validationErrors[] = "Message cannot be empty.";
    } elseif (strlen($submittedMessage) < 5 || strlen($submittedMessage) > 5000) {
        $validationErrors[] = "Message must be between 5 and 5000 characters.";
    }

    if (!empty($submittedPhone) && strlen($submittedPhone) > 50) {
        $validationErrors[] = "Phone number is too long.";
    }

    if (strlen($submittedSubject) > 200) {
        $validationErrors[] = "Subject line is too long.";
    }

    if (!empty($validationErrors)) {
        header("Location: /thank/");
        exit;
    }

    $recipientEmail = "info@aynalkhail.com";
    
    $sanitizedName = htmlspecialchars($submittedName, ENT_QUOTES, "UTF-8");
    $sanitizedEmail = filter_var($submittedEmail, FILTER_SANITIZE_EMAIL);
    $sanitizedPhone = htmlspecialchars($submittedPhone, ENT_QUOTES, "UTF-8");
    $sanitizedMessage = htmlspecialchars($submittedMessage, ENT_QUOTES, "UTF-8");
    $sanitizedSubject = htmlspecialchars($submittedSubject, ENT_QUOTES, "UTF-8");

    $emailSubject = "Contact Form Submission: " . $sanitizedSubject;
    
    $emailBody = "Name: " . $sanitizedName . "\r\n";
    $emailBody .= "Email: " . $sanitizedEmail . "\r\n";
    
    if (!empty($sanitizedPhone)) {
        $emailBody .= "Phone: " . $sanitizedPhone . "\r\n";
    }
    
    $emailBody .= "Subject: " . $sanitizedSubject . "\r\n";
    $emailBody .= "---\r\n";
    $emailBody .= "Message:\r\n";
    $emailBody .= $sanitizedMessage . "\r\n";

    $emailHeaders = "From: " . $sanitizedEmail . "\r\n";
    $emailHeaders .= "Reply-To: " . $sanitizedEmail . "\r\n";
    $emailHeaders .= "Content-Type: text/plain; charset=UTF-8\r\n";

    $mailSent = mail($recipientEmail, $emailSubject, $emailBody, $emailHeaders);

    header("Location: /thank/");
    exit;

} else {
    header("Location: /thank/");
    exit;
}
?>