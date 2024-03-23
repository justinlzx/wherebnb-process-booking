import { sendPayment, sendBooking } from '../service/booking.service.js'


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

    console.log(req.session)
    console.log(req.sessionID)
    const booking = req.session.booking
    console.log(booking)
    if (booking) {

        const {
            guestId,
            listingId,
            startDate,
            endDate,
        } = booking

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
        console.log('Booking failedasdf!')
        return res.status(404).json({
            success: false,
            message: 'Booking failed!'
        })
    }
};

