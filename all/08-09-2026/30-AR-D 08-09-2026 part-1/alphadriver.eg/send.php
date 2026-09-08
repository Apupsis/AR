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
        $errors[] = "Name is required and must be at least 2 characters";
    }

    if (empty($useremail) || !filter_var($useremail, FILTER_VALIDATE_EMAIL)) {
        $errors[] = "Valid email address is required";
    }

    if (empty($usermessage) || strlen($usermessage) < 5) {
        $errors[] = "Message is required and must be at least 5 characters";
    }

    if (!empty($errors)) {
        header("Location: /thank/");
        exit;
    }

    $sanitized_name = htmlspecialchars($fullname, ENT_QUOTES, "UTF-8");
    $sanitized_email = filter_var($useremail, FILTER_SANITIZE_EMAIL);
    $sanitized_phone = htmlspecialchars($userphone, ENT_QUOTES, "UTF-8");
    $sanitized_message = htmlspecialchars($usermessage, ENT_QUOTES, "UTF-8");
    $sanitized_subject = htmlspecialchars($usersubject, ENT_QUOTES, "UTF-8");

    if (strpos($sanitized_email, "\n") !== false || strpos($sanitized_email, "\r") !== false) {
        header("Location: /thank/");
        exit;
    }

    $recipient = "support@alphadriver.eg";

    $email_body = "Name: " . $sanitized_name . "\r\n";
    $email_body .= "Email: " . $sanitized_email . "\r\n";
    
    if (!empty($sanitized_phone)) {
        $email_body .= "Phone: " . $sanitized_phone . "\r\n";
    }
    
    $email_body .= "\r\nMessage:\r\n" . $sanitized_message;

    $headers = "From: " . $sanitized_email . "\r\n";
    $headers .= "Reply-To: " . $sanitized_email . "\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();

    $mail_sent = mail($recipient, $sanitized_subject, $email_body, $headers);

    header("Location: /thank/");
    exit;

} else {
    header("Location: /thank/");
    exit;
}
?>