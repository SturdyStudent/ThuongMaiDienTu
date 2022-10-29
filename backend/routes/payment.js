var express = require("express");
var apiResponse = require('../helpers/apiResponse');

var router = express.Router();

const stripe = require('stripe')('sk_test_51L2cr8EIvijdT2SMZl5JTs34A1NKCkzwb0NsMu00Myy6IGeXR5MiYDIzmyNPSqjvilDd2sQyKb5Ors8xTVmlzxB900px7HAarJ')

router.get('/config', (req, res) => {
    res.send({
        publishableKey: 'pk_test_51L2cr8EIvijdT2SMQHwPAGbdeSsmtlH4qlJrtwC6fxDSewpSGRYRjBR1HzmgrNmiSZdJNAJouR7Yb0n0rS6e0ZMK00QKMaRPic',
    });
});

router.get("/secret", async (req, res) => {
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: 15000,
            currency: 'vnd',
            automatic_payment_methods: { enabled: true },
        });
        return apiResponse.successResponseWithData(res, "Lấy payment intent thành công", { client_secret: paymentIntent.client_secret });
    } catch (err) {
        return apiResponse.validationErrorWithData(res, "Lỗi xác thực", err);
    }
});
module.exports = router;