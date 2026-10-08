<?php
header("Content-Type: text/html; charset=UTF-8");

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    
    if (!empty($_POST["website"])) {
        header("Location: /thank/");
        exit;
    }
    
    $fullname = isset($_POST["name"]) ? trim($_POST["name"]) : "";
    $useremail = isset($_POST["email"]) ? trim($_POST["email"]) : "";
    $userphone = isset($_POST["phone"]) ? trim($_POST["phone"]) : "";
    $usermessage = isset($_POST["message"]) ? trim($_POST["message"]) : "";
    $usersubject = isset($_POST["subject"]) ? trim($_POST["subject"]) : "New Contact Form Submission";
    
    $errors = [];
    
    if (empty($fullname) || strlen($fullname) < 2) {
        $errors[] = "Name is required and must be at least 2 characters.";
    }
    
    if (empty($useremail) || !filter_var($useremail, FILTER_VALIDATE_EMAIL)) {
        $errors[] = "A valid email address is required.";
    }
    
    if (empty($usermessage) || strlen($usermessage) < 5) {
        $errors[] = "Message is required and must be at least 5 characters.";
    }
    
    if (!empty($errors)) {
        header("Location: /thank/");
        exit;
    }
    
    $fullname = htmlspecialchars($fullname, ENT_QUOTES, "UTF-8");
    $useremail = filter_var($useremail, FILTER_SANITIZE_EMAIL);
    $userphone = htmlspecialchars($userphone, ENT_QUOTES, "UTF-8");
    $usermessage = htmlspecialchars($usermessage, ENT_QUOTES, "UTF-8");
    $usersubject = htmlspecialchars($usersubject, ENT_QUOTES, "UTF-8");
    
    $recipient = "support@ahlyvolley.com";
    $emailsubject = "Contact Form: " . $usersubject;
    
    $emailbody = "Name: " . $fullname . "\r\n";
    $emailbody .= "Email: " . $useremail . "\r\n";
    
    if (!empty($userphone)) {
        $emailbody .= "Phone: " . $userphone . "\r\n";
    }
    
    $emailbody .= "\r\nMessage:\r\n" . $usermessage . "\r\n";
    
    $headers = "From: " . $useremail . "\r\n";
    $headers .= "Reply-To: " . $useremail . "\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
    
    $safeemail = preg_replace("/[^a-zA-Z0-9._%-+@]/", "", $useremail);
    $safename = preg_replace("/[^a-zA-Z0-9\s'-]/", "", $fullname);
    
    if (strlen($emailsubject) > 255) {
        $emailsubject = substr($emailsubject, 0, 255);
    }
    
    if (mail($recipient, $emailsubject, $emailbody, $headers)) {
        header("Location: /thank/");
        exit;
    } else {
        header("Location: /thank/");
        exit;
    }
    
} else {
    header("Location: /thank/");
    exit;
}
?>