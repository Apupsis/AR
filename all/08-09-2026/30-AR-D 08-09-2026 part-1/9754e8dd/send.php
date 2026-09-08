<?php
header('Content-Type: text/html; charset=utf-8');

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    
    if (!empty($_POST["website"])) {
        header("Location: /thank/");
        exit;
    }
    
    $fullname = isset($_POST["name"]) ? trim($_POST["name"]) : "";
    $usermail = isset($_POST["email"]) ? trim($_POST["email"]) : "";
    $userphone = isset($_POST["phone"]) ? trim($_POST["phone"]) : "";
    $usermessage = isset($_POST["message"]) ? trim($_POST["message"]) : "";
    $usersubject = isset($_POST["subject"]) ? trim($_POST["subject"]) : "New Form Submission";
    
    $errors = array();
    
    if (empty($fullname)) {
        $errors[] = "Name is required";
    } elseif (strlen($fullname) < 2 || strlen($fullname) > 100) {
        $errors[] = "Name must be between 2 and 100 characters";
    }
    
    if (empty($usermail)) {
        $errors[] = "Email is required";
    } elseif (!filter_var($usermail, FILTER_VALIDATE_EMAIL)) {
        $errors[] = "Invalid email format";
    }
    
    if (empty($usermessage)) {
        $errors[] = "Message is required";
    } elseif (strlen($usermessage) < 10) {
        $errors[] = "Message must be at least 10 characters";
    }
    
    if (!empty($userphone) && !preg_match("/^[0-9\s\-\+\(\)]+$/", $userphone)) {
        $errors[] = "Invalid phone number format";
    }
    
    if (!empty($usersubject) && strlen($usersubject) > 150) {
        $errors[] = "Subject must not exceed 150 characters";
    }
    
    if (!empty($errors)) {
        header("Location: /thank/");
        exit;
    }
    
    $recipient = "support@malaabtfaradi.info";
    
    $fullname = filter_var($fullname, FILTER_SANITIZE_STRING);
    $usermail = filter_var($usermail, FILTER_SANITIZE_EMAIL);
    $userphone = filter_var($userphone, FILTER_SANITIZE_STRING);
    $usermessage = filter_var($usermessage, FILTER_SANITIZE_STRING);
    $usersubject = filter_var($usersubject, FILTER_SANITIZE_STRING);
    
    if (strpos($usermail, "\n") !== false || strpos($usermail, "\r") !== false) {
        header("Location: /thank/");
        exit;
    }
    
    $headers = "From: " . $usermail . "\r\n";
    $headers .= "Reply-To: " . $usermail . "\r\n";
    $headers .= "Content-Type: text/plain; charset=utf-8\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";
    
    $emailbody = "Name: " . $fullname . "\r\n";
    $emailbody .= "Email: " . $usermail . "\r\n";
    
    if (!empty($userphone)) {
        $emailbody .= "Phone: " . $userphone . "\r\n";
    }
    
    $emailbody .= "\r\nMessage:\r\n";
    $emailbody .= $usermessage . "\r\n";
    
    $safesubject = "=?UTF-8?B?" . base64_encode($usersubject) . "?=";
    
    mail($recipient, $safesubject, $emailbody, $headers);
    
    header("Location: /thank/");
    exit;
    
} else {
    header("Location: /thank/");
    exit;
}
?>