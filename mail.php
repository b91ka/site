<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $name = $_POST['name'];
    $phone = $_POST['phone'];
    $product = $_POST['product'];
    $time = $_POST['time'];

    $content = $name . ' оставил заявку на ритуал' . $product . ' в ' . $time . '. Его телефон: ' . $phone;

    $headers  = 'MIME-Version: 1.0' . "\r\n";
    $headers .= 'Content-type: text/html; charset=utf-8' . "\r\n";


    $success = mail("admin@sale-tamitaft.ru", 'Запрос на ритуал', $content, $headers);

    if ($success) {
        http_response_code(200);
        echo "Письмо отправлено";
    } else {
        http_response_code(500);
        echo "Письмо не отправлено";
    }

} else {
    http_response_code(403);
    echo "Данный метод запроса не поддерживается сервером";
}