import axios from 'axios';
import {useState} from "react";

const ONESTOPGO_API = process.env.REACT_APP_ONESTOPGO_API_BASE;
const LOGIN_API = `${ONESTOPGO_API}/login`;
const REGISTER_API = `${ONESTOPGO_API}/api/v1/signup`;
const USER_DETAILS_API = `${ONESTOPGO_API}/api/v1/user`
axios.defaults.withCredentials = true

export const hitLogin = async (loginDetails) => {
    const formData = new FormData();
    formData.append("username", loginDetails.email);
    formData.append("password", loginDetails.password);

    return (await axios.post(LOGIN_API, formData, {
        mode: 'no-cors',
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })).data
}

export const registerUser = async (userDetails) => {
    return (await axios.post(REGISTER_API, userDetails)).data
}

export const getLoggedInUser = async (username) => {
    return (await axios.get(USER_DETAILS_API + '/username/' + username)).data
}