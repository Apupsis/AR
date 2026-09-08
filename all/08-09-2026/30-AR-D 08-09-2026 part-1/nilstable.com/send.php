<?php
header("Content-Type: text/html; charset=UTF-8");

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    
    if (!empty($_POST["website"])) {
        header("Location: /thank/");
        exit;
    }

    $recipientEmail = "info@nilstable.com";
    $formName = isset($_POST["name"]) ? trim($_POST["name"]) : "";
    $formEmail = isset($_POST["email"]) ? trim($_POST["email"]) : "";
    $formPhone = isset($_POST["phone"]) ? trim($_POST["phone"]) : "";
    $formMessage = isset($_POST["message"]) ? trim($_POST["message"]) : "";
    $formSubject = isset($_POST["subject"]) ? trim($_POST["subject"]) : "New Form Submission";

    $validationErrors = [];

    if (empty($formName)) {
        $validationErrors[] = "Name is required";
    }

    if (empty($formEmail)) {
        $validationErrors[] = "Email is required";
    } elseif (!filter_var($formEmail, FILTER_VALIDATE_EMAIL)) {
        $validationErrors[] = "Email format is invalid";
    }

    if (empty($formMessage)) {
        $validationErrors[] = "Message is required";
    }

    if (!empty($validationErrors)) {
        header("Location: /thank/");
        exit;
    }

    $sanitizedName = filter_var($formName, FILTER_SANITIZE_STRING);
    $sanitizedEmail = filter_var($formEmail, FILTER_SANITIZE_EMAIL);
    $sanitizedPhone = filter_var($formPhone, FILTER_SANITIZE_STRING);
    $sanitizedMessage = filter_var($formMessage, FILTER_SANITIZE_STRING);
    $sanitizedSubject = filter_var($formSubject, FILTER_SANITIZE_STRING);

    $emailSubject = "New Form Submission: " . $sanitizedSubject;
    
    $emailBody = "Name: " . $sanitizedName . "\r\n";
    $emailBody .= "Email: " . $sanitizedEmail . "\r\n";
    
    if (!empty($sanitizedPhone)) {
        $emailBody .= "Phone: " . $sanitizedPhone . "\r\n";
    }
    
    $emailBody .= "\r\nMessage:\r\n";
    $emailBody .= $sanitizedMessage . "\r\n";

    $emailHeaders = "From: " . $sanitizedEmail . "\r\n";
    $emailHeaders .= "Reply-To: " . $sanitizedEmail . "\r\n";
    $emailHeaders .= "Content-Type: text/plain; charset=UTF-8\r\n";

    $emailSubjectEncoded = "=?UTF-8?B?" . base64_encode($emailSubject) . "?=";

    mail($recipientEmail, $emailSubjectEncoded, $emailBody, $emailHeaders);

    header("Location: /thank/");
    exit;

} else {
    header("Location: /thank/");
    exit;
}
?>