import axios from 'axios';

const ONESTOPGO_API = process.env.REACT_APP_ONESTOPGO_API_BASE;
const STORE_API = `${ONESTOPGO_API}/api/v1/store`;

export const getAllStores = async () => {
    return (await axios.get(STORE_API)).data
}
