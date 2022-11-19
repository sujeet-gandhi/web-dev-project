import axios from 'axios';

const ONESTOPGO_API = process.env.REACT_APP_ONESTOPGO_API_BASE;
const SEARCH_API = `${ONESTOPGO_API}/api/v1/search`;

export const getSearchData = async () => {
    return (await axios.get(SEARCH_API)).data
}
