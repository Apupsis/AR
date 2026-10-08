<?php
header('Content-Type: text/html; charset=utf-8');

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    
    if (!empty($_POST["website"])) {
        header("Location: /thank/");
        exit;
    }
    
    $formName = isset($_POST["name"]) ? trim($_POST["name"]) : "";
    $formEmail = isset($_POST["email"]) ? trim($_POST["email"]) : "";
    $formPhone = isset($_POST["phone"]) ? trim($_POST["phone"]) : "";
    $formMessage = isset($_POST["message"]) ? trim($_POST["message"]) : "";
    $formSubject = isset($_POST["subject"]) ? trim($_POST["subject"]) : "New Form Submission";
    
    $validationErrors = [];
    
    if (empty($formName)) {
        $validationErrors[] = "Name is required";
    } elseif (strlen($formName) < 2 || strlen($formName) > 100) {
        $validationErrors[] = "Name must be between 2 and 100 characters";
    }
    
    if (empty($formEmail)) {
        $validationErrors[] = "Email address is required";
    } elseif (!filter_var($formEmail, FILTER_VALIDATE_EMAIL)) {
        $validationErrors[] = "Please provide a valid email address";
    }
    
    if (empty($formMessage)) {
        $validationErrors[] = "Message cannot be empty";
    } elseif (strlen($formMessage) < 5 || strlen($formMessage) > 5000) {
        $validationErrors[] = "Message must be between 5 and 5000 characters";
    }
    
    if (!empty($formPhone) && strlen($formPhone) > 30) {
        $validationErrors[] = "Phone number is too long";
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
    
    $recipientEmail = "support@drivetable.com";
    
    $emailSubject = "Form Submission: " . $sanitizedSubject;
    
    $emailBody = "You have received a new form submission:\n\n";
    $emailBody .= "Name: " . $sanitizedName . "\n";
    $emailBody .= "Email: " . $sanitizedEmail . "\n";
    
    if (!empty($sanitizedPhone)) {
        $emailBody .= "Phone: " . $sanitizedPhone . "\n";
    }
    
    $emailBody .= "Subject: " . $sanitizedSubject . "\n";
    $emailBody .= "Message:\n" . $sanitizedMessage . "\n";
    
    $emailHeaders = "From: " . $sanitizedEmail . "\r\n";
    $emailHeaders .= "Reply-To: " . $sanitizedEmail . "\r\n";
    $emailHeaders .= "Content-Type: text/plain; charset=UTF-8\r\n";
    
    $emailSubject = "=?UTF-8?B?" . base64_encode($emailSubject) . "?=";
    
    $mailResult = @mail($recipientEmail, $emailSubject, $emailBody, $emailHeaders);
    
    header("Location: /thank/");
    exit;
    
} else {
    header("Location: /thank/");
    exit;
}
?>