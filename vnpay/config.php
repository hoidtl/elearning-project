<?php
// Chỉ start session nếu chưa có session
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}
date_default_timezone_set('Asia/Ho_Chi_Minh');
/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
  
$vnp_TmnCode = "WHSL7TDC"; //Mã định danh merchant kết nối (Terminal Id)
$vnp_HashSecret = "26KOMLGCCGXYY01ZYXE9YJ24M1ULD5JJ"; //Secret key
$vnp_Url = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
// QUAN TRỌNG: URL return phải trỏ đến đúng file vnpay_return.php trong thư mục vnpay_php
// Localhost - VNPay Sandbox cho phép dùng localhost
$vnp_Returnurl = "http://localhost/websiteBanBanhKem/vnpay_php/vnpay_return.php";
$vnp_apiUrl = "http://sandbox.vnpayment.vn/merchant_webapi/merchant.html";
$apiUrl = "https://sandbox.vnpayment.vn/merchant_webapi/api/transaction";
//Config input format
//Expire
$startTime = date("YmdHis");
$expire = date('YmdHis',strtotime('+15 minutes',strtotime($startTime)));
