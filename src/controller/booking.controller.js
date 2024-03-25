import { sendPayment, sendBooking } from '../service/booking.service.js'
import stripe from 'stripe';


export const makePayment = async (req, res, next) => {
    const {
        guestId,
        listingId,
        startDate,
        endDate,
        firstName,
        lastName, 
        email,
        pricePerNight,
        name,
        duration 
    } = req.body

    console.log('body:', req.body)
    console.log(req.sessionID)


    req.session.booking = {
        guestId,
        listingId,
        startDate,
        endDate,
        firstName,
        lastName, 
        email,
        pricePerNight,
        name,
        duration 
    }

    try {
        await sendPayment({data: {pricePerNight, name, duration}})
        .then((resp) => {

           console.log('resp:', resp)
            
            return res.status(200).json({
                success: true,
                data: resp
            })
        })
        .catch((err) => {
            return res.status(500).json({
                success: false,
                message: err
            })
        })
    }
    catch (err) {
       next(err)
    }
};

export const makeBooking = async (req, res, next) => {

    if (booking) {
    //     const {
    //         guestId,
    //         listingId,
    //         startDate,
    //         endDate,
    //     } = booking

        await sendBooking({bookingInfo: {
            guestId,
            listingId,
            startDate,
            endDate,
        }})
        .then((resp) => {
            console.log('Booking successful!')
            return res.status(200).json({
                success: true,
                data: booking
            })
        })
        .catch((err) => {
            next(err)
        })
       
    } else {
        return res.status(404).json({
            success: false,
            message: 'Booking failed!'
        })
    }
};

export const stripeWebHook = async (req, res, next) => {

  try {  
    
    const endpointSecret = process.env.STRIPE_SIGNING_SECRET;
    console.log(endpointSecret)

  const sig = req.headers['stripe-signature'];

  let event;

try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    console.log(event)
} catch (err) {
    console.log(`Webhook Error: ${err.message}`);
    res.status(400).send(`Webhook Error: ${err.message}`);
    return 'fail';
}

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const checkoutSessionCompleted = event.data.object;
      // Then define and call a function to handle the event checkout.session.completed

    console.log('payment success', checkoutSessionCompleted)
      makeBooking()
      break;

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  return res.status(200)}
  catch (err) {
    console.log(err)
    next(err)
  }
}
