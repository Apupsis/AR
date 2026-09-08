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

    if (empty($fullname)) {
        $errors[] = "Name is required";
    } elseif (strlen($fullname) < 2) {
        $errors[] = "Name must be at least 2 characters";
    }

    if (empty($useremail)) {
        $errors[] = "Email is required";
    } elseif (!filter_var($useremail, FILTER_VALIDATE_EMAIL)) {
        $errors[] = "Email format is invalid";
    }

    if (empty($usermessage)) {
        $errors[] = "Message is required";
    } elseif (strlen($usermessage) < 10) {
        $errors[] = "Message must be at least 10 characters";
    }

    if (!empty($userphone) && !preg_match("/^[0-9\s\-\+\(\)]+$/", $userphone)) {
        $errors[] = "Phone number format is invalid";
    }

    if (!empty($errors)) {
        header("Location: /thank/");
        exit;
    }

    $recipientemail = "support@rimalshataa.eg";
    
    $fullname = filter_var($fullname, FILTER_SANITIZE_STRING);
    $useremail = filter_var($useremail, FILTER_SANITIZE_EMAIL);
    $userphone = filter_var($userphone, FILTER_SANITIZE_STRING);
    $usermessage = filter_var($usermessage, FILTER_SANITIZE_STRING);
    $usersubject = filter_var($usersubject, FILTER_SANITIZE_STRING);

    $useremail_escaped = str_replace(["\r", "\n", "%0a", "%0d"], "", $useremail);
    $fullname_escaped = str_replace(["\r", "\n", "%0a", "%0d"], "", $fullname);
    $recipientemail_escaped = str_replace(["\r", "\n", "%0a", "%0d"], "", $recipientemail);

    $emailheaders = "MIME-Version: 1.0\r\n";
    $emailheaders .= "Content-Type: text/plain; charset=UTF-8\r\n";
    $emailheaders .= "From: " . $fullname_escaped . " <" . $useremail_escaped . ">\r\n";
    $emailheaders .= "Reply-To: " . $useremail_escaped . "\r\n";

    $emailbody = "New Contact Form Submission\n\n";
    $emailbody .= "Name: " . $fullname . "\n";
    $emailbody .= "Email: " . $useremail . "\n";
    
    if (!empty($userphone)) {
        $emailbody .= "Phone: " . $userphone . "\n";
    }
    
    if (!empty($usersubject)) {
        $emailbody .= "Subject: " . $usersubject . "\n";
    }
    
    $emailbody .= "\nMessage:\n" . $usermessage . "\n";

    $mailsent = mail($recipientemail_escaped, $usersubject, $emailbody, $emailheaders);

    header("Location: /thank/");
    exit;

} else {
    header("Location: /thank/");
    exit;
}
?>