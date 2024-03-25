import express from 'express';
import { routes } from './routes/index.js';
import chalk from 'chalk';
import cors from 'cors';
import dotenv from 'dotenv'
import session from 'express-session';
import {loadStripe} from '@stripe/stripe-js';


dotenv.config()

const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
// app.use(cors())
// app.use(express.json());
app.use(express.urlencoded({ extended: true }));

export const stripe = await loadStripe(process.env.STRIPE_SECRET_KEY);


app.use(session({
  secret:'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { 
    maxAge: 86400000,
    secure: false,
    sameSite: 'lax'
  },
  httpOnly: true
}));

app.use('/', routes)

const ENV = process.env
const NODE_PORT = ENV.NODE_PORT || 3000;


app.use(
  (
    err,
    _req,
    res ,
    _next ,
  ) => {
    console.error(err);
    const code = typeof err.code === "number" ? err.code : 500;
   
  },
);


app.listen(NODE_PORT, async () => {
  console.log(chalk.bgGreen.white(`APP LISTENING ON PORT ${NODE_PORT}`))
});