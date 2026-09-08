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
    
    if (empty($formName) || strlen($formName) < 2) {
        $validationErrors[] = "Name is required and must be at least 2 characters.";
    }
    
    if (empty($formEmail) || !filter_var($formEmail, FILTER_VALIDATE_EMAIL)) {
        $validationErrors[] = "A valid email address is required.";
    }
    
    if (empty($formMessage) || strlen($formMessage) < 10) {
        $validationErrors[] = "Message must be at least 10 characters long.";
    }
    
    if (!empty($formPhone)) {
        $phoneDigits = preg_replace('/[^0-9]/', '', $formPhone);
        if (strlen($phoneDigits) < 10) {
            $validationErrors[] = "Phone number must contain at least 10 digits.";
        }
    }
    
    if (!empty($validationErrors)) {
        $_SESSION["form_errors"] = $validationErrors;
        $_SESSION["form_data"] = [
            "name" => $formName,
            "email" => $formEmail,
            "phone" => $formPhone,
            "message" => $formMessage,
            "subject" => $formSubject
        ];
        header("Location: /thank/");
        exit;
    }
    
    $recipientEmail = "hello@nileacademy.com";
    
    $emailSubject = "=" . substr(bin2hex("UTF-8"), 0, 2) . "?UTF-8?B?" . base64_encode($formSubject) . "?=";
    
    $emailHeaders = "MIME-Version: 1.0\r\n";
    $emailHeaders .= "Content-Type: text/plain; charset=UTF-8\r\n";
    $emailHeaders .= "From: " . filter_var($formEmail, FILTER_SANITIZE_EMAIL) . "\r\n";
    $emailHeaders .= "Reply-To: " . filter_var($formEmail, FILTER_SANITIZE_EMAIL) . "\r\n";
    
    $emailBody = "New Form Submission\n";
    $emailBody .= "-------------------\n\n";
    $emailBody .= "Name: " . $formName . "\n";
    $emailBody .= "Email: " . $formEmail . "\n";
    
    if (!empty($formPhone)) {
        $emailBody .= "Phone: " . $formPhone . "\n";
    }
    
    $emailBody .= "\nSubject: " . $formSubject . "\n\n";
    $emailBody .= "Message:\n";
    $emailBody .= $formMessage . "\n\n";
    $emailBody .= "-------------------\n";
    $emailBody .= "Submitted at: " . date("Y-m-d H:i:s") . "\n";
    $emailBody .= "IP Address: " . $_SERVER["REMOTE_ADDR"] . "\n";
    
    $mailSent = mail($recipientEmail, $emailSubject, $emailBody, $emailHeaders);
    
    if ($mailSent) {
        $_SESSION["form_success"] = true;
        $_SESSION["form_data"] = [];
    } else {
        $_SESSION["form_success"] = false;
    }
    
    header("Location: /thank/");
    exit;
    
} else {
    header("Location: /thank/");
    exit;
}

?>