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
    }
    
    if (empty($formEmail)) {
        $validationErrors[] = "Email is required";
    } elseif (!filter_var($formEmail, FILTER_VALIDATE_EMAIL)) {
        $validationErrors[] = "Invalid email format";
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
    
    $recipientEmail = "info@apexride.eg";
    
    $emailSubject = "New Form Submission: " . $sanitizedSubject;
    
    $emailBody = "You have received a new form submission:\n\n";
    $emailBody .= "Name: " . $sanitizedName . "\n";
    $emailBody .= "Email: " . $sanitizedEmail . "\n";
    
    if (!empty($sanitizedPhone)) {
        $emailBody .= "Phone: " . $sanitizedPhone . "\n";
    }
    
    $emailBody .= "\nMessage:\n" . $sanitizedMessage . "\n\n";
    $emailBody .= "Submitted on: " . date('Y-m-d H:i:s') . "\n";
    $emailBody .= "IP Address: " . $_SERVER['REMOTE_ADDR'] . "\n";
    
    $headers = "From: " . $sanitizedEmail . "\r\n";
    $headers .= "Reply-To: " . $sanitizedEmail . "\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";
    
    $emailSubjectEncoded = "=?UTF-8?B?" . base64_encode($emailSubject) . "?=";
    
    $mailResult = mail($recipientEmail, $emailSubjectEncoded, $emailBody, $headers);
    
    header("Location: /thank/");
    exit;
    
} else {
    header("Location: /thank/");
    exit;
}
?>