// // ./pages/api/checkout_sessions/index.ts
// import { CURRENCY, formatAmountForStripe } from '@/config/stripe-helpers';
// import { NextApiRequest, NextApiResponse } from 'next';
// import Stripe from 'stripe';
// // import { CURRENCY, formatAmountForStripe } from '../../../utils/stripe-helpers';

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
//   apiVersion: '2022-11-15', // Use the latest API version or specify as needed
// });

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   if (req.method !== 'POST') {
//     res.setHeader('Allow', 'POST');
//     return res.status(405).end('Method Not Allowed');
//   }

//   try {
//     const { amount } = req.body;
    
//     // Validate the amount
//     if (!amount || amount <= 0) {
//       return res.status(400).json({ error: 'Invalid donation amount' });
//     }

//     // Create Checkout Sessions from body params.
//     const params: Stripe.Checkout.SessionCreateParams = {
//       submit_type: 'donate',
//       payment_method_types: ['card'],
//       line_items: [
//         {
//           name: 'Custom amount donation',
//           amount: formatAmountForStripe(amount, CURRENCY),
//           currency: CURRENCY,
//           quantity: 1,
//         },
//       ],
//       success_url: `${req.headers.origin}/result?session_id={CHECKOUT_SESSION_ID}&status=success`,
//       cancel_url: `${req.headers.origin}/result?session_id={CHECKOUT_SESSION_ID}&status=canceled`,
//     };
    
//     const checkoutSession: Stripe.Checkout.Session = 
//       await stripe.checkout.sessions.create(params);

//     return res.status(200).json({
//       sessionId: checkoutSession.id,
//       url: checkoutSession.url,
//     });
//   } catch (err) {
//     const errorMessage = err instanceof Error ? err.message : 'Internal server error';
//     console.error(`Stripe checkout error: ${errorMessage}`);
//     return res.status(500).json({ statusCode: 500, message: errorMessage });
//   }
// }