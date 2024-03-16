import { sendPayment, sendBooking } from '../service/booking.service.js'
import Res from '../Res/response.js';


export const createBooking = async (req, res) => {
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

    try {
        await sendPayment({data: {pricePerNight, name, duration}})
        .then((res) => {
            console.log('Payment Successful!')

            sendBooking(
                guestId,
                listingId,
                startDate,
                endDate,
            )
            .then ((res) => {
                    console.log('Booking Successful!')
                    return res.status('Booking Successful!', 200)

                })
        })
        .catch((err) => {
            console.log('Payment Failed!', err)
            throw new Error('Payment Failed! Try again later', err)
        })}
    catch (err) {
        return res.status('Booking Failed!', 500)
    }
};


