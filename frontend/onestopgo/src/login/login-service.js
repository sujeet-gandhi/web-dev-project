import axios from 'axios';
import {useState} from "react";

const ONESTOPGO_API = process.env.REACT_APP_ONESTOPGO_API_BASE;
const LOGIN_API = `${ONESTOPGO_API}/login`;
const USER_DETAILS_API = `${ONESTOPGO_API}/api/v1/login/userdata`;
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
    }).then(async () => {
        console.log("login success")
        return (await axios.get(USER_DETAILS_API)).data
    }).catch(error => error)).data
}


export const getLoggedInUserData = async () => {
    return (await axios.get(USER_DETAILS_API)).data
}