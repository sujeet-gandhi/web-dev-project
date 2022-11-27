import axios from 'axios';

const ONESTOPGO_API = process.env.REACT_APP_ONESTOPGO_API_BASE;
const ORDER_API = `${ONESTOPGO_API}/api/v1/order`;

export const getCart = async () => {
    return (await axios.get(ORDER_API + "/cart")).data
}

export const addToCart = async (orderItemQuantity) => {
    return (await axios.post(ORDER_API + "/addToCart", orderItemQuantity)).data
}

export const removeFromCart = async (orderId) => {
    console.log('Order Item Quantity = '+orderId);
    return (await axios.delete(ORDER_API + "/removeFromCart/" +orderId)).data
}

export const updateCart = async (orderItemQuantity) => {
    return (await axios.put(ORDER_API + "/updateCart", orderItemQuantity)).data
}

export const placeOrder = async (orderId) => {
    return (await axios.put(ORDER_API + "/placeOrder/" + orderId)).data
}


