<?php
header("Content-Type: text/html; charset=UTF-8");

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    
    if (!empty($_POST["website"])) {
        header("Location: /thank/");
        exit;
    }

    $submitterName = isset($_POST["name"]) ? trim($_POST["name"]) : "";
    $submitterEmail = isset($_POST["email"]) ? trim($_POST["email"]) : "";
    $submitterPhone = isset($_POST["phone"]) ? trim($_POST["phone"]) : "";
    $submitterMessage = isset($_POST["message"]) ? trim($_POST["message"]) : "";
    $submitterSubject = isset($_POST["subject"]) ? trim($_POST["subject"]) : "New Contact Form Submission";

    $validationErrors = [];

    if (empty($submitterName)) {
        $validationErrors[] = "Name is required";
    } elseif (strlen($submitterName) < 2 || strlen($submitterName) > 100) {
        $validationErrors[] = "Name must be between 2 and 100 characters";
    }

    if (empty($submitterEmail)) {
        $validationErrors[] = "Email address is required";
    } elseif (!filter_var($submitterEmail, FILTER_VALIDATE_EMAIL)) {
        $validationErrors[] = "Please provide a valid email address";
    }

    if (empty($submitterMessage)) {
        $validationErrors[] = "Message cannot be empty";
    } elseif (strlen($submitterMessage) < 10 || strlen($submitterMessage) > 5000) {
        $validationErrors[] = "Message must be between 10 and 5000 characters";
    }

    if (!empty($submitterPhone)) {
        $cleanPhone = preg_replace("/[^0-9\-\+\s\(\)]/", "", $submitterPhone);
        if (strlen($cleanPhone) < 7) {
            $validationErrors[] = "Phone number appears to be invalid";
        }
        $submitterPhone = $cleanPhone;
    }

    if (!empty($submitterSubject)) {
        if (strlen($submitterSubject) > 200) {
            $validationErrors[] = "Subject line is too long";
        }
    }

    if (!empty($validationErrors)) {
        header("Location: /thank/");
        exit;
    }

    $recipientEmail = "contact@elite-croquet.com";
    
    $emailSubject = "Contact Form: " . substr($submitterSubject, 0, 50);
    $emailSubject = preg_replace("/[^\x20-\x7E]/", "", $emailSubject);

    $messageBody = "Name: " . $submitterName . "\r\n";
    $messageBody .= "Email: " . $submitterEmail . "\r\n";
    
    if (!empty($submitterPhone)) {
        $messageBody .= "Phone: " . $submitterPhone . "\r\n";
    }
    
    $messageBody .= "Subject: " . $submitterSubject . "\r\n";
    $messageBody .= "\r\n";
    $messageBody .= "Message:\r\n";
    $messageBody .= $submitterMessage . "\r\n";
    $messageBody .= "\r\n";
    $messageBody .= "---\r\n";
    $messageBody .= "Submitted: " . date("Y-m-d H:i:s") . "\r\n";
    $messageBody .= "IP Address: " . $_SERVER["REMOTE_ADDR"] . "\r\n";

    $emailHeaders = "From: " . $submitterEmail . "\r\n";
    $emailHeaders .= "Reply-To: " . $submitterEmail . "\r\n";
    $emailHeaders .= "Content-Type: text/plain; charset=UTF-8\r\n";
    $emailHeaders .= "X-Mailer: PHP/" . phpversion() . "\r\n";

    $mailSuccess = mail($recipientEmail, $emailSubject, $messageBody, $emailHeaders);

    header("Location: /thank/");
    exit;

} else {
    header("Location: /thank/");
    exit;
}
?>