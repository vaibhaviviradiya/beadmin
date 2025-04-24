const express = require('express');
const router = express.Router();
const Razorpay = require('razorpay');
const crypto = require('crypto');

// Initialize Razorpay with test credentials
const razorpay = new Razorpay({
  key_id: 'rzp_test_vRAfLOfVsemO4d',
  key_secret: 'dIOmO3jYuVesnwWh0GC5yRDP'
});

// Create order endpoint
router.post('/create-order', async (req, res) => {
  try {
    const { amount, currency } = req.body;

    const options = {
      amount: amount, // amount in paise
      currency: currency,
      receipt: 'order_' + Date.now()
    };

    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

// Verify payment endpoint
router.post('/verify-payment', (req, res) => {
  try {
    const { order_id, payment_id, signature } = req.body;
    
    const body = order_id + "|" + payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', 'dIOmO3jYuVesnwWh0GC5yRDP')
      .update(body.toString())
      .digest('hex');

    const isValid = expectedSignature === signature;
    res.json({ isValid });
  } catch (error) {
    console.error('Error verifying payment:', error);
    res.status(500).json({ error: 'Failed to verify payment' });
  }
});

module.exports = router; 