import express from 'express';
import { makePayment, makeBooking, stripeWebHook } from '../controller/booking.controller.js';

export const routes = express.Router();

routes.post('/paymentSuccess', express.raw({type: 'application/json'}), stripeWebHook);
routes.post('/payment', express.json(), makePayment);
// routes.post('/payment-success', makeBooking);
routes.post('/cancel',express.json(),  makeBooking);