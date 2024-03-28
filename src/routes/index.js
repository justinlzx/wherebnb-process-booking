import express from 'express';
import { makePayment, paymentProcessWebhook } from '../controller/booking.controller.js';

export const routes = express.Router();

routes.post('/paymentSuccess', express.raw({type: 'application/json'}), paymentProcessWebhook);
routes.post('/payment', express.json(), makePayment);
