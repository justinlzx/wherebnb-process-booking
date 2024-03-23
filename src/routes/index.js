import express from 'express';
import { makePayment, makeBooking } from '../controller/booking.controller.js';

export const routes = express.Router();

routes.post('/payment', makePayment);
routes.post('/payment-success', makeBooking);
routes.post('/cancel', makeBooking);