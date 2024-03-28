import axios from 'axios';

export const sendPayment = async ({data}) =>  {

    const {
        pricePerNight,
        name,
        duration,
        guestId,
        listingId,
        startDate,
        endDate,
        hostId
    } = data

    let formData = new FormData();
    formData.append('currency', 'sgd');
    formData.append('name', name);
    formData.append('pricePerNight', pricePerNight);
    formData.append('duration', duration);
    formData.append('guestId', guestId);
    formData.append('listingId', listingId);
    formData.append('startDate', startDate);
    formData.append('endDate', endDate);
    formData.append('hostId', hostId);


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

export const sendNotification = async (payload) => {

    console.log('payload:', payload)
    await axios.post(`${process.env.NOTIFICATIONS_URL}/rabbit`, payload)
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
        return 'Booking Successful!'
    })
    .catch(
        (err) => {
            console.log(err)
            return 'Booking entry failed'
        }
    )
};


export const makeBooking = async ({data}) => {

    const {
        hostId,
        guestId,
        listingId,
        startDate,
        endDate,
        totalPrice
    } = data

    try {
        await sendBooking({bookingInfo: {
            guestId,
            hostId,
            listingId,
            startDate,
            endDate,
            totalPrice
        }})
    } catch{
        return 'Booking Failed!'
    }
   
    try {
        const guestInfo = await axios.get(`${process.env.ACCOUNTS_URL}/view/${guestId}`)

        const hostInfo = await axios.get(`${process.env.ACCOUNTS_URL}/view/${hostId}`)
        
        const payload = {
            emailType: "bookingConfirmation",
            travelerEmail: guestInfo.data.data.email,
            travelerName: guestInfo.data.data.firstName,
            hostEmail: hostInfo.data.data.email,
            hostName: hostInfo.data.data.firstName,
            bookingDates: startDate,
            totalPrice,
        }

        sendNotification(payload)
    } catch (err){
        console.log(err)
        return 'Notification Failed!'
    }
    finally {
        return 'Process complete!'
    }
  
};
