import axios from "axios";

const ONESTOPGO_API = process.env.REACT_APP_ONESTOPGO_API_BASE;
const STORE_ADMIN_API = `${ONESTOPGO_API}/api/v1/user/storeadmin`;

export const createUser = async (user) => {
    return (await axios.post(STORE_ADMIN_API, user)).data
}
