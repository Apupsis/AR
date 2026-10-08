<?php
header('Content-Type: text/html; charset=utf-8');

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    
    if (!empty($_POST["website"])) {
        header("Location: /thank/");
        exit;
    }
    
    $fullname = isset($_POST["name"]) ? trim($_POST["name"]) : "";
    $useremail = isset($_POST["email"]) ? trim($_POST["email"]) : "";
    $userphone = isset($_POST["phone"]) ? trim($_POST["phone"]) : "";
    $usersubject = isset($_POST["subject"]) ? trim($_POST["subject"]) : "New Contact Form Submission";
    $usermessage = isset($_POST["message"]) ? trim($_POST["message"]) : "";
    
    $errormessages = array();
    
    if (empty($fullname)) {
        $errormessages[] = "Name is required.";
    } elseif (strlen($fullname) < 2) {
        $errormessages[] = "Name must be at least 2 characters.";
    } elseif (strlen($fullname) > 100) {
        $errormessages[] = "Name is too long.";
    }
    
    if (empty($useremail)) {
        $errormessages[] = "Email is required.";
    } elseif (!filter_var($useremail, FILTER_VALIDATE_EMAIL)) {
        $errormessages[] = "Please enter a valid email address.";
    }
    
    if (!empty($userphone) && strlen($userphone) > 20) {
        $errormessages[] = "Phone number is too long.";
    }
    
    if (empty($usermessage)) {
        $errormessages[] = "Message is required.";
    } elseif (strlen($usermessage) < 5) {
        $errormessages[] = "Message must be at least 5 characters.";
    } elseif (strlen($usermessage) > 5000) {
        $errormessages[] = "Message is too long.";
    }
    
    if (!empty($usersubject) && strlen($usersubject) > 150) {
        $errormessages[] = "Subject is too long.";
    }
    
    if (empty($errormessages)) {
        $receiveremail = "info@shaheen-sports.com";
        
        $sanitizedname = htmlspecialchars($fullname, ENT_QUOTES, 'UTF-8');
        $sanitizedemail = htmlspecialchars($useremail, ENT_QUOTES, 'UTF-8');
        $sanitizedphone = htmlspecialchars($userphone, ENT_QUOTES, 'UTF-8');
        $sanitizedsubject = htmlspecialchars($usersubject, ENT_QUOTES, 'UTF-8');
        $sanitizedmessage = htmlspecialchars($usermessage, ENT_QUOTES, 'UTF-8');
        
        $headerstoset = "MIME-Version: 1.0\r\n";
        $headerstoset .= "Content-type: text/html; charset=UTF-8\r\n";
        $headerstoset .= "From: " . $sanitizedemail . "\r\n";
        $headerstoset .= "Reply-To: " . $sanitizedemail . "\r\n";
        $headerstoset .= "X-Mailer: PHP/" . phpversion();
        
        $emailbodytext = "<!DOCTYPE html>\n";
        $emailbodytext .= "<html>\n";
        $emailbodytext .= "<head><meta charset='UTF-8'></head>\n";
        $emailbodytext .= "<body style='font-family: Arial, sans-serif; line-height: 1.6; color: #333;'>\n";
        $emailbodytext .= "<h2 style='color: #2c3e50;'>New Contact Form Submission</h2>\n";
        $emailbodytext .= "<hr style='border: none; border-top: 1px solid #ddd;'>\n";
        $emailbodytext .= "<p><strong>Name:</strong> " . $sanitizedname . "</p>\n";
        $emailbodytext .= "<p><strong>Email:</strong> " . $sanitizedemail . "</p>\n";
        
        if (!empty($sanitizedphone)) {
            $emailbodytext .= "<p><strong>Phone:</strong> " . $sanitizedphone . "</p>\n";
        }
        
        if (!empty($sanitizedsubject)) {
            $emailbodytext .= "<p><strong>Subject:</strong> " . $sanitizedsubject . "</p>\n";
        }
        
        $emailbodytext .= "<hr style='border: none; border-top: 1px solid #ddd;'>\n";
        $emailbodytext .= "<p><strong>Message:</strong></p>\n";
        $emailbodytext .= "<p>" . nl2br($sanitizedmessage) . "</p>\n";
        $emailbodytext .= "<hr style='border: none; border-top: 1px solid #ddd;'>\n";
        $emailbodytext .= "<p style='color: #999; font-size: 12px;'>This message was sent from the contact form on your website.</p>\n";
        $emailbodytext .= "</body>\n";
        $emailbodytext .= "</html>";
        
        $mailsubjectline = "Contact Form: " . $sanitizedsubject;
        
        mail($receiveremail, $mailsubjectline, $emailbodytext, $headerstoset);
    }
    
    header("Location: /thank/");
    exit;
    
} else {
    header("Location: /thank/");
    exit;
}
?>