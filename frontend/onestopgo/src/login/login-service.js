import axios from 'axios';

const ONESTOPGO_API = process.env.REACT_APP_ONESTOPGO_API_BASE;
const HOME_API = `${ONESTOPGO_API}/api/v1/home`;
const SEARCH_API = `${ONESTOPGO_API}/api/v1/search?searchTerm=`;
const LOGIN_API ="http://localhost:8080/login"

export const postLoginData = async () => {
    return (await axios.get(LOGIN_API)).data
}

export const hitLogin = async (loginDetails) => {
    const formData = new FormData();
    formData.append("username", loginDetails.email);
    formData.append("password", loginDetails.password);

    return (await axios.post(LOGIN_API, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })).data
}