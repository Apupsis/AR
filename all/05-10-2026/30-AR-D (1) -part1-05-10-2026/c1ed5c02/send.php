<?php
header('Content-Type: text/html; charset=utf-8');

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    
    if (!empty($_POST["website"])) {
        header("Location: /thank/");
        exit;
    }
    
    $recipientEmail = "info@ribataldarbah.eg";
    $errors = [];
    
    $fullName = isset($_POST["name"]) ? trim($_POST["name"]) : "";
    $userEmail = isset($_POST["email"]) ? trim($_POST["email"]) : "";
    $userPhone = isset($_POST["phone"]) ? trim($_POST["phone"]) : "";
    $userMessage = isset($_POST["message"]) ? trim($_POST["message"]) : "";
    $userSubject = isset($_POST["subject"]) ? trim($_POST["subject"]) : "New Form Submission";
    
    if (empty($fullName)) {
        $errors[] = "Name is required";
    } elseif (strlen($fullName) < 2) {
        $errors[] = "Name must be at least 2 characters";
    }
    
    if (empty($userEmail)) {
        $errors[] = "Email address is required";
    } elseif (!filter_var($userEmail, FILTER_VALIDATE_EMAIL)) {
        $errors[] = "Please provide a valid email address";
    }
    
    if (empty($userMessage)) {
        $errors[] = "Message cannot be empty";
    } elseif (strlen($userMessage) < 5) {
        $errors[] = "Message must be at least 5 characters";
    }
    
    if (!empty($userPhone) && !preg_match('/^[0-9\s\-\+\(\)]+$/', $userPhone)) {
        $errors[] = "Phone number format is invalid";
    }
    
    if (!empty($errors)) {
        header("Location: /thank/");
        exit;
    }
    
    $sanitizedName = htmlspecialchars($fullName, ENT_QUOTES, 'UTF-8');
    $sanitizedEmail = filter_var($userEmail, FILTER_SANITIZE_EMAIL);
    $sanitizedPhone = htmlspecialchars($userPhone, ENT_QUOTES, 'UTF-8');
    $sanitizedMessage = htmlspecialchars($userMessage, ENT_QUOTES, 'UTF-8');
    $sanitizedSubject = htmlspecialchars($userSubject, ENT_QUOTES, 'UTF-8');
    
    $emailBody = "Name: " . $sanitizedName . "\r\n";
    $emailBody .= "Email: " . $sanitizedEmail . "\r\n";
    
    if (!empty($sanitizedPhone)) {
        $emailBody .= "Phone: " . $sanitizedPhone . "\r\n";
    }
    
    $emailBody .= "Subject: " . $sanitizedSubject . "\r\n";
    $emailBody .= "Message:\r\n" . $sanitizedMessage . "\r\n";
    
    $headers = "From: " . $sanitizedEmail . "\r\n";
    $headers .= "Reply-To: " . $sanitizedEmail . "\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
    
    $finalSubject = "New Contact Form Submission: " . $sanitizedSubject;
    
    $mailSent = @mail($recipientEmail, $finalSubject, $emailBody, $headers);
    
    header("Location: /thank/");
    exit;
    
} else {
    header("Location: /thank/");
    exit;
}
?>