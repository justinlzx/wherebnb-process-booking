import { sendPayment, makeBooking } from '../service/booking.service.js'
import stripe from 'stripe';
import Res from '../Res/response.js'


export const makePayment = async (req, res, next) => {
    const {
        hostId,
        guestId,
        listingId,
        startDate,
        endDate,
        pricePerNight,
        name: propertyName,
        duration 
    } = req.body

    try {
        await sendPayment({data: {pricePerNight, propertyName, duration, guestId, listingId, hostId, startDate, endDate}})
        .then((resp) => {
            return Res.successResponse(res, resp)
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

export const paymentProcessWebhook = async (req, res, next) => {

  try {  
    
    const endpointSecret = process.env.STRIPE_SIGNING_SECRET;

    const sig = req.headers['stripe-signature'];

    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
        console.log(event)
    } catch (err) {
        console.log(`Webhook Error: ${err.message}`);
        res.status(400).send(`Webhook Error: ${err.message}`);
        return;
    }

    // Handle the event
    switch (event.type) {
        case 'checkout.session.completed':
            const checkoutSessionCompleted = event.data.object;
            // Then define and call a function to handle the event checkout.session.completed

            console.log('Payment success:', checkoutSessionCompleted)
            const {
                guestId,
                hostId,
                listingId,
                startDate,
                endDate,
                totalPrice,
                propertyName
            } = checkoutSessionCompleted.metadata
            await makeBooking({
                data: {
                    guestId,
                    hostId,
                    listingId,
                    startDate,
                    endDate,
                    totalPrice,
                    propertyName
                }
            })
            break;
        case 'checkout.session.canceled':

            return res.status(200)
        default:
        console.log(`Unhandled event type ${event.type}`);
    }

    // Return a 200 response to acknowledge receipt of the event
    return res.status(200)
    } catch (err) {
    console.log(err)
    next(err)
  }
}


