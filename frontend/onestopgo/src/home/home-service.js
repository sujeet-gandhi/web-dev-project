import axios from 'axios';

const ONESTOPGO_API = process.env.REACT_APP_ONESTOPGO_API_BASE;
const HOME_API = `${ONESTOPGO_API}/api/v1/home`;

export const getHomeData = async () => {
    console.log(HOME_API)
    return (await axios.get(HOME_API)).data
}
