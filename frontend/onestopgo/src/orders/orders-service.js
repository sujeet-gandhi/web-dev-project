import axios from 'axios';

const ONESTOPGO_API = process.env.REACT_APP_ONESTOPGO_API_BASE;
const ORDER_API = `${ONESTOPGO_API}/api/v1/order`;

export const orderList = async () => {
    return (await axios.get(ORDER_API + "/orderList")).data
}

export const cancelOrder = async (orderId) => {
    return (await axios.put(ORDER_API + "/cancelOrder/" + orderId)).data
}

export const deliverOrder = async (orderId) => {
    return (await axios.put(ORDER_API + "/deliverOrder/" + orderId)).data
}
