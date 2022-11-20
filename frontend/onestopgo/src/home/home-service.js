import axios from 'axios';

const ONESTOPGO_API = process.env.REACT_APP_ONESTOPGO_API_BASE;
const HOME_API = `${ONESTOPGO_API}/api/v1/home`;
const SEARCH_API = `${ONESTOPGO_API}/api/v1/search?searchTerm=`;

export const getHomeData = async () => {
    return (await axios.get(HOME_API)).data
}

export const getSearchData = async (searchTerm) => {
    console.log("Searching for "+searchTerm+" across all verticals.")
    return (await axios.get(SEARCH_API + searchTerm)).data
}
