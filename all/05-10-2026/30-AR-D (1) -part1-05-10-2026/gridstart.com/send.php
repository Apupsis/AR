<?php

header('Content-Type: text/html; charset=utf-8');

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    
    if (!empty($_POST["website"])) {
        header("Location: /thank/");
        exit;
    }

    $errors = array();
    
    $fullname = isset($_POST["name"]) ? trim($_POST["name"]) : "";
    $emailaddr = isset($_POST["email"]) ? trim($_POST["email"]) : "";
    $phonenumber = isset($_POST["phone"]) ? trim($_POST["phone"]) : "";
    $messagecontent = isset($_POST["message"]) ? trim($_POST["message"]) : "";
    $topicline = isset($_POST["subject"]) ? trim($_POST["subject"]) : "Contact Form Submission";
    
    if (empty($fullname)) {
        $errors[] = "Name is required";
    }
    
    if (empty($emailaddr)) {
        $errors[] = "Email is required";
    } elseif (!filter_var($emailaddr, FILTER_VALIDATE_EMAIL)) {
        $errors[] = "Email format is invalid";
    }
    
    if (empty($messagecontent)) {
        $errors[] = "Message is required";
    }
    
    if (!empty($errors)) {
        header("Location: /thank/");
        exit;
    }
    
    $fullname = htmlspecialchars($fullname, ENT_QUOTES, 'UTF-8');
    $emailaddr = htmlspecialchars($emailaddr, ENT_QUOTES, 'UTF-8');
    $phonenumber = htmlspecialchars($phonenumber, ENT_QUOTES, 'UTF-8');
    $messagecontent = htmlspecialchars($messagecontent, ENT_QUOTES, 'UTF-8');
    $topicline = htmlspecialchars($topicline, ENT_QUOTES, 'UTF-8');
    
    $recipient = "support@gridstart.com";
    
    $emailheaders = "From: " . $emailaddr . "\r\n";
    $emailheaders .= "Reply-To: " . $emailaddr . "\r\n";
    $emailheaders .= "Content-Type: text/plain; charset=UTF-8\r\n";
    
    $bodycontent = "Name: " . $fullname . "\r\n";
    $bodycontent .= "Email: " . $emailaddr . "\r\n";
    
    if (!empty($phonenumber)) {
        $bodycontent .= "Phone: " . $phonenumber . "\r\n";
    }
    
    $bodycontent .= "\r\n";
    $bodycontent .= "Message:\r\n";
    $bodycontent .= $messagecontent . "\r\n";
    
    $finaltopic = "New Contact Form Submission";
    if (!empty($topicline) && $topicline !== "Contact Form Submission") {
        $finaltopic = $topicline;
    }
    
    @mail($recipient, $finaltopic, $bodycontent, $emailheaders);
    
    header("Location: /thank/");
    exit;
    
} else {
    header("Location: /thank/");
    exit;
}

?>