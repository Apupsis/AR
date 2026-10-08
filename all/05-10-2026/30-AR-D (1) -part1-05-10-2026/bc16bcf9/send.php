<?php

header('Content-Type: text/html; charset=utf-8');

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    
    if (!empty($_POST["website"])) {
        header("Location: /thank/");
        exit;
    }
    
    $fullName = isset($_POST["name"]) ? trim($_POST["name"]) : "";
    $emailAddr = isset($_POST["email"]) ? trim($_POST["email"]) : "";
    $phoneNum = isset($_POST["phone"]) ? trim($_POST["phone"]) : "";
    $msgContent = isset($_POST["message"]) ? trim($_POST["message"]) : "";
    $subjectLine = isset($_POST["subject"]) ? trim($_POST["subject"]) : "Contact Form Submission";
    
    $validationPassed = true;
    $errorList = [];
    
    if (empty($fullName) || strlen($fullName) < 2) {
        $validationPassed = false;
        $errorList[] = "Name is required and must be at least 2 characters";
    }
    
    if (empty($emailAddr) || !filter_var($emailAddr, FILTER_VALIDATE_EMAIL)) {
        $validationPassed = false;
        $errorList[] = "A valid email address is required";
    }
    
    if (empty($msgContent) || strlen($msgContent) < 10) {
        $validationPassed = false;
        $errorList[] = "Message must be provided and contain at least 10 characters";
    }
    
    if (!$validationPassed) {
        header("Location: /thank/");
        exit;
    }
    
    $fullName = filter_var($fullName, FILTER_SANITIZE_STRING);
    $emailAddr = filter_var($emailAddr, FILTER_SANITIZE_EMAIL);
    $phoneNum = filter_var($phoneNum, FILTER_SANITIZE_STRING);
    $msgContent = filter_var($msgContent, FILTER_SANITIZE_STRING);
    $subjectLine = filter_var($subjectLine, FILTER_SANITIZE_STRING);
    
    $emailAddr = str_replace(["\r", "\n"], "", $emailAddr);
    $fullName = str_replace(["\r", "\n"], "", $fullName);
    $subjectLine = str_replace(["\r", "\n"], "", $subjectLine);
    
    $recipientEmail = "support@risha-aldars.com";
    
    $emailSubject = "New Contact Form: " . $subjectLine;
    
    $emailBody = "Name: " . $fullName . "\r\n";
    $emailBody .= "Email: " . $emailAddr . "\r\n";
    
    if (!empty($phoneNum)) {
        $emailBody .= "Phone: " . $phoneNum . "\r\n";
    }
    
    $emailBody .= "Subject: " . $subjectLine . "\r\n";
    $emailBody .= "Message: \r\n" . $msgContent . "\r\n";
    
    $headers = "From: " . $emailAddr . "\r\n";
    $headers .= "Reply-To: " . $emailAddr . "\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
    
    $mailSent = @mail($recipientEmail, $emailSubject, $emailBody, $headers);
    
    header("Location: /thank/");
    exit;
    
} else {
    header("Location: /thank/");
    exit;
}

?>