<?php
header('Content-Type: text/html; charset=utf-8');

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    
    if (!empty($_POST["website"])) {
        header("Location: /thank/");
        exit;
    }
    
    $errors = array();
    
    $fullname = isset($_POST["name"]) ? trim($_POST["name"]) : "";
    $useremail = isset($_POST["email"]) ? trim($_POST["email"]) : "";
    $userphone = isset($_POST["phone"]) ? trim($_POST["phone"]) : "";
    $usermessage = isset($_POST["message"]) ? trim($_POST["message"]) : "";
    $usersubject = isset($_POST["subject"]) ? trim($_POST["subject"]) : "New Contact Form Submission";
    
    if (empty($fullname)) {
        $errors[] = "Name is required";
    }
    
    if (empty($useremail)) {
        $errors[] = "Email is required";
    } elseif (!filter_var($useremail, FILTER_VALIDATE_EMAIL)) {
        $errors[] = "Email format is invalid";
    }
    
    if (empty($usermessage)) {
        $errors[] = "Message is required";
    }
    
    if (!empty($errors)) {
        header("Location: /thank/");
        exit;
    }
    
    $fullname = htmlspecialchars($fullname, ENT_QUOTES, 'UTF-8');
    $useremail = filter_var($useremail, FILTER_SANITIZE_EMAIL);
    $userphone = htmlspecialchars($userphone, ENT_QUOTES, 'UTF-8');
    $usermessage = htmlspecialchars($usermessage, ENT_QUOTES, 'UTF-8');
    $usersubject = htmlspecialchars($usersubject, ENT_QUOTES, 'UTF-8');
    
    $recipient = "info@academyelnahm.eg";
    $subject = "New Contact Form Submission: " . $usersubject;
    
    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type: text/html; charset=UTF-8" . "\r\n";
    $headers .= "From: " . $useremail . "\r\n";
    $headers .= "Reply-To: " . $useremail . "\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";
    
    $emailbody = "<!DOCTYPE html>\r\n";
    $emailbody .= "<html>\r\n";
    $emailbody .= "<head>\r\n";
    $emailbody .= "<meta charset='UTF-8'>\r\n";
    $emailbody .= "</head>\r\n";
    $emailbody .= "<body style='font-family: Arial, sans-serif; line-height: 1.6; color: #333;'>\r\n";
    $emailbody .= "<h2>New Contact Form Submission</h2>\r\n";
    $emailbody .= "<p><strong>Name:</strong> " . $fullname . "</p>\r\n";
    $emailbody .= "<p><strong>Email:</strong> " . $useremail . "</p>\r\n";
    
    if (!empty($userphone)) {
        $emailbody .= "<p><strong>Phone:</strong> " . $userphone . "</p>\r\n";
    }
    
    if (!empty($usersubject)) {
        $emailbody .= "<p><strong>Subject:</strong> " . $usersubject . "</p>\r\n";
    }
    
    $emailbody .= "<p><strong>Message:</strong></p>\r\n";
    $emailbody .= "<p>" . nl2br($usermessage) . "</p>\r\n";
    $emailbody .= "</body>\r\n";
    $emailbody .= "</html>\r\n";
    
    mail($recipient, $subject, $emailbody, $headers);
    
    header("Location: /thank/");
    exit;
    
} else {
    header("Location: /thank/");
    exit;
}
?>