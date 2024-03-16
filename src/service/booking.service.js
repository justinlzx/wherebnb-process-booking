import Res from '../Res/response.js';
import axios from 'axios';

export const sendPayment = async ({data}) =>  {

    const {
        pricePerNight,
        name,
        duration
    } = data

    console.log('data', pricePerNight, name, duration)

    let formData = new FormData();
    formData.append('currency', 'sgd');
    formData.append('name', name);
    formData.append('pricePerNight', pricePerNight);
    formData.append('duration', duration);

    await axios({
        method: 'post',
        url: `${process.env.PAYMENTS_URL}/create-checkout-session`,
        data: formData,
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        timeout: 500
    })
    .then((res) => {
        console.log('Payment Successful!')
        return 'Payment Successful!'
    })
    .catch(
        (err) => {
            console.log('Payment Failed!')
            throw new Error('Payment Failed!', 500)
        }
    )
};

export const sendNotification = async () => {
    
    await axios.post(`${process.env.NOTIFICATIONS_URL}/notification`)
    .then((res) => {
        console.log('Notification Sent!')
        return 'Notification Sent!'
    })
    .catch(
        (err) => {
            console.log('Notification Failed!')
            return 'Notification Failed!'
        }
    )
};

export const sendBooking = async () => {

    await axios.post(`${process.env.BOOKINGS_URL}/booking`)
    .then((res) => {
        console.log('Booking Successful!')
        return Res.successResponse('Booking Successful!', 200)
    })
    .catch(
        (err) => {
            console.log('Booking Failed!')
            return Res.errorResponse('Booking Failed!', 500)
        }
    )
};