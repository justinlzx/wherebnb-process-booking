import Res from '../Res/response.js';
import axios from 'axios';

export const sendPayment = async ({data}) =>  {

    const {
        pricePerNight,
        name,
        duration
    } = data

    console.log('data:', data)

    let formData = new FormData();
    formData.append('currency', 'sgd');
    formData.append('name', name);
    formData.append('pricePerNight', pricePerNight);
    formData.append('duration', duration);

    const response = await axios({
        method: 'post',
        url: `${process.env.PAYMENTS_URL}/create-checkout-session`,
        data: formData,
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        timeout: 5000
    });

    console.log('response:', response.data)

    return response.data;
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

export const sendBooking = async ({bookingInfo}) => {


    await axios.post(`${process.env.BOOKINGS_URL}/booking`, bookingInfo)
    .then((res) => {
        console.log(res)
        return Res.successResponse('Booking Successful!', 200)
    })
    .catch(
        (err) => {
            console.log(err)
            return Res.errorResponse('Booking Failed!', 500)
        }
    )
};