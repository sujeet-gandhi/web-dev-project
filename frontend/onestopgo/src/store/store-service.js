import axios from 'axios';

const ONESTOPGO_API = process.env.REACT_APP_ONESTOPGO_API_BASE;
const STORE_API = `${ONESTOPGO_API}/api/v1/store`;

export const getAllStores = async () => {
    return (await axios.get(STORE_API)).data
}

export const createStore = async (store) => {
    return (await axios.post(STORE_API, store)).data
}
