import { sendPayment, sendBooking } from '../service/booking.service.js'
import Res from '../Res/response.js';


export const createBooking = async (req, res, next) => {
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
        .then( (resp) => {

            // await sendBooking(
//                 guestId,
//                 listingId,
//                 startDate,
//                 endDate,
//             )
//             .then ((resp) => {
//                 // console.log('Booking Successful!', resp)
//                 return res.status('Booking Successful!', 200)
//             })
            
            return res.status(200).json({
                success: true,
                data: resp
            })
        })
        .catch((err) => {
            return res.status(500).json({
                success: false,
                message: 'Payment Failed!'
            })
        })
    }
    catch (err) {
       next(err)
    }
};



