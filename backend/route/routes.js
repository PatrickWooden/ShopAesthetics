const express = require("express");
const app = express();
const cors = require("cors");
const controller = require("../controller/controller");

// access json and cors
app.use(cors());
app.use(express.json());

const baseURL = "/api";

// call the controller method
app.get(`${baseURL}/`, controller.getSignUpUser);
app.post(`${baseURL}/register`, controller.registerUser);
app.post(`${baseURL}/login`, controller.loginUser);
app.get(`${baseURL}/order-history/:userId`, controller.getOrderHistory);
app.get(`${baseURL}/payments/:userId`, controller.getPayments);
app.put(`${baseURL}/payments/:paymentId`, controller.editPayment);
app.delete(`${baseURL}/payments/:paymentId`, controller.deletePaymentMethod);
app.post(`${baseURL}/create-payment`, controller.createPayment);
app.get(`${baseURL}/cart/:userId`, controller.getCart);
module.exports = app;