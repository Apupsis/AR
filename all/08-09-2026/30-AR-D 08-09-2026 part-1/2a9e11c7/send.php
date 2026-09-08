<?php
header('Content-Type: text/html; charset=utf-8');

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    
    if (!empty($_POST["website"])) {
        header("Location: /thank/");
        exit;
    }
    
    $recipientEmail = "info@melabalnzilaq.eg";
    $formName = isset($_POST["name"]) ? trim($_POST["name"]) : "";
    $formEmail = isset($_POST["email"]) ? trim($_POST["email"]) : "";
    $formPhone = isset($_POST["phone"]) ? trim($_POST["phone"]) : "";
    $formMessage = isset($_POST["message"]) ? trim($_POST["message"]) : "";
    $formSubject = isset($_POST["subject"]) ? trim($_POST["subject"]) : "New Form Submission";
    
    $validationErrors = array();
    
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
    
    $sanitizedName = htmlspecialchars($formName, ENT_QUOTES, 'UTF-8');
    $sanitizedEmail = filter_var($formEmail, FILTER_SANITIZE_EMAIL);
    $sanitizedPhone = htmlspecialchars($formPhone, ENT_QUOTES, 'UTF-8');
    $sanitizedMessage = htmlspecialchars($formMessage, ENT_QUOTES, 'UTF-8');
    $sanitizedSubject = htmlspecialchars($formSubject, ENT_QUOTES, 'UTF-8');
    
    $emailSubject = "Contact Form: " . $sanitizedSubject;
    
    $emailBody = "New form submission received:\n\n";
    $emailBody .= "Name: " . $sanitizedName . "\n";
    $emailBody .= "Email: " . $sanitizedEmail . "\n";
    
    if (!empty($sanitizedPhone)) {
        $emailBody .= "Phone: " . $sanitizedPhone . "\n";
    }
    
    $emailBody .= "\nMessage:\n" . $sanitizedMessage . "\n";
    
    $emailHeaders = "From: " . $sanitizedEmail . "\r\n";
    $emailHeaders .= "Reply-To: " . $sanitizedEmail . "\r\n";
    $emailHeaders .= "Content-Type: text/plain; charset=UTF-8\r\n";
    
    $emailSubject = "=?UTF-8?B?" . base64_encode($emailSubject) . "?=";
    
    @mail($recipientEmail, $emailSubject, $emailBody, $emailHeaders);
    
    header("Location: /thank/");
    exit;
    
} else {
    header("Location: /thank/");
    exit;
}
?>