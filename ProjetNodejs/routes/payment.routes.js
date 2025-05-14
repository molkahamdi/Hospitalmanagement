const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

router.post('/create-checkout-session', async (req, res) => {
  const { montant, nom, prenom } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: {
            name: `Consultation médicale - ${nom} ${prenom}`,
          },
          unit_amount: montant * 100,
        },
        quantity: 1,
      }],
      success_url: 'http://localhost:4200/payment-success',
      cancel_url: 'http://localhost:4200/payment-cancel',
    });

    res.send({ url: session.url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
