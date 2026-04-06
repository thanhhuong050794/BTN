import express from "express";
import { VNPay } from "vnpay";
// http://localhost:3000/create-payment
const app = express();

// cấu hình VNPAY
const vnpay = new VNPay({
    tmnCode: "2QXUI4B4",
    secureSecret: "YOUR_SECRET",
    vnpayHost: "https://sandbox.vnpayment.vn",
    testMode: true,
    hashAlgorithm: "SHA512",
});

// API tạo thanh toán
app.get("/create-payment", (req, res) => {
    const paymentUrl = vnpay.buildPaymentUrl({
        vnp_Amount: 100000,
        vnp_IpAddr: "127.0.0.1",
        vnp_ReturnUrl: "http://localhost:3000/return",
        vnp_TxnRef: Date.now().toString(),
        vnp_OrderInfo: "Thanh toán test",
    });

    res.redirect(paymentUrl);
});

// API nhận kết quả
app.get("/return", (req, res) => {
    if (req.query.vnp_ResponseCode === "00") {
        res.send("Thanh toán thành công ");
    } else {
        res.send("Thanh toán thất bại ");
    }
});

// chạy server
app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});