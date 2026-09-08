<?php
header('Content-Type: text/html; charset=utf-8');

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    
    if (!empty($_POST["website"])) {
        header("Location: /thank/");
        exit;
    }
    
    $errors = [];
    
    $fullName = isset($_POST["name"]) ? trim($_POST["name"]) : "";
    $emailAddr = isset($_POST["email"]) ? trim($_POST["email"]) : "";
    $phoneNum = isset($_POST["phone"]) ? trim($_POST["phone"]) : "";
    $msgContent = isset($_POST["message"]) ? trim($_POST["message"]) : "";
    $subjectLine = isset($_POST["subject"]) ? trim($_POST["subject"]) : "Contact Form Submission";
    
    if (empty($fullName)) {
        $errors[] = "Name is required";
    }
    
    if (empty($emailAddr)) {
        $errors[] = "Email is required";
    } elseif (!filter_var($emailAddr, FILTER_VALIDATE_EMAIL)) {
        $errors[] = "Invalid email format";
    }
    
    if (empty($msgContent)) {
        $errors[] = "Message is required";
    }
    
    if (!empty($errors)) {
        header("Location: /thank/");
        exit;
    }
    
    $fullName = htmlspecialchars($fullName, ENT_QUOTES, 'UTF-8');
    $emailAddr = filter_var($emailAddr, FILTER_SANITIZE_EMAIL);
    $phoneNum = htmlspecialchars($phoneNum, ENT_QUOTES, 'UTF-8');
    $msgContent = htmlspecialchars($msgContent, ENT_QUOTES, 'UTF-8');
    $subjectLine = htmlspecialchars($subjectLine, ENT_QUOTES, 'UTF-8');
    
    $recipientEmail = "support@aldawaran.info";
    
    $emailHeaders = "From: " . $emailAddr . "\r\n";
    $emailHeaders .= "Reply-To: " . $emailAddr . "\r\n";
    $emailHeaders .= "MIME-Version: 1.0\r\n";
    $emailHeaders .= "Content-Type: text/plain; charset=UTF-8\r\n";
    
    $emailBody = "Name: " . $fullName . "\r\n";
    $emailBody .= "Email: " . $emailAddr . "\r\n";
    
    if (!empty($phoneNum)) {
        $emailBody .= "Phone: " . $phoneNum . "\r\n";
    }
    
    $emailBody .= "\r\nMessage:\r\n" . $msgContent;
    
    $mailResult = mail($recipientEmail, $subjectLine, $emailBody, $emailHeaders);
    
    header("Location: /thank/");
    exit;
    
} else {
    header("Location: /thank/");
    exit;
}
?>