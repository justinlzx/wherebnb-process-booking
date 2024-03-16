import express from 'express';
import { createBooking } from '../controller/booking.controller.js';

export const routes = express.Router();

routes.post('/payment', createBooking);