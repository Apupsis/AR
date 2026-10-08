<?php
header('Content-Type: text/html; charset=utf-8');

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    
    if (!empty($_POST["website"])) {
        header("Location: /thank/");
        exit;
    }

    $fullName = isset($_POST["name"]) ? trim($_POST["name"]) : "";
    $senderEmail = isset($_POST["email"]) ? trim($_POST["email"]) : "";
    $phoneNumber = isset($_POST["phone"]) ? trim($_POST["phone"]) : "";
    $messageContent = isset($_POST["message"]) ? trim($_POST["message"]) : "";
    $subjectLine = isset($_POST["subject"]) ? trim($_POST["subject"]) : "Website Form Submission";

    $errors = [];

    if (empty($fullName)) {
        $errors[] = "Name is required";
    }

    if (empty($senderEmail)) {
        $errors[] = "Email is required";
    } elseif (!filter_var($senderEmail, FILTER_VALIDATE_EMAIL)) {
        $errors[] = "Email format is invalid";
    }

    if (empty($messageContent)) {
        $errors[] = "Message cannot be empty";
    }

    if (!empty($errors)) {
        header("Location: /thank/");
        exit;
    }

    $recipientEmail = "info@academy-grip.com";

    $fullName = htmlspecialchars($fullName, ENT_QUOTES, 'UTF-8');
    $senderEmail = filter_var($senderEmail, FILTER_SANITIZE_EMAIL);
    $phoneNumber = htmlspecialchars($phoneNumber, ENT_QUOTES, 'UTF-8');
    $messageContent = htmlspecialchars($messageContent, ENT_QUOTES, 'UTF-8');
    $subjectLine = htmlspecialchars($subjectLine, ENT_QUOTES, 'UTF-8');

    $emailHeaders = "MIME-Version: 1.0\r\n";
    $emailHeaders .= "Content-Type: text/html; charset=UTF-8\r\n";
    $emailHeaders .= "From: " . $senderEmail . "\r\n";
    $emailHeaders .= "Reply-To: " . $senderEmail . "\r\n";

    $emailBody = "<!DOCTYPE html>\r\n";
    $emailBody .= "<html>\r\n";
    $emailBody .= "<head>\r\n";
    $emailBody .= "<meta charset='UTF-8'>\r\n";
    $emailBody .= "</head>\r\n";
    $emailBody .= "<body style='font-family: Arial, sans-serif; line-height: 1.6; color: #333;'>\r\n";
    $emailBody .= "<h2>New Form Submission</h2>\r\n";
    $emailBody .= "<p><strong>Name:</strong> " . $fullName . "</p>\r\n";
    $emailBody .= "<p><strong>Email:</strong> " . $senderEmail . "</p>\r\n";
    
    if (!empty($phoneNumber)) {
        $emailBody .= "<p><strong>Phone:</strong> " . $phoneNumber . "</p>\r\n";
    }
    
    $emailBody .= "<p><strong>Subject:</strong> " . $subjectLine . "</p>\r\n";
    $emailBody .= "<hr style='border: none; border-top: 1px solid #ddd; margin: 20px 0;'>\r\n";
    $emailBody .= "<p><strong>Message:</strong></p>\r\n";
    $emailBody .= "<p>" . nl2br($messageContent) . "</p>\r\n";
    $emailBody .= "</body>\r\n";
    $emailBody .= "</html>\r\n";

    $mailSent = mail($recipientEmail, "New Inquiry: " . $subjectLine, $emailBody, $emailHeaders);

    header("Location: /thank/");
    exit;

} else {
    header("Location: /thank/");
    exit;
}
?>