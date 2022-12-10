import axios from 'axios';
import {useState} from "react";

const ONESTOPGO_API = process.env.REACT_APP_ONESTOPGO_API_BASE;
const LOGIN_API = `${ONESTOPGO_API}/login`;
const USER_DETAILS_API = `${ONESTOPGO_API}/api/v1/login/userdata`;
const SAFE_DETAILS = `${ONESTOPGO_API}/api/v1/user/safe/`
axios.defaults.withCredentials = true

export const hitLogin = async (loginDetails) => {
    const formData = new FormData();
    formData.append("username", loginDetails.email);
    formData.append("password", loginDetails.password);

    return (await axios.post(LOGIN_API, formData, {
        mode: 'no-cors',
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        maxRedirects: 0,
        validateStatus: (status) => {
            return status === 204 // spring login returns 204, rest all are redirects and failures
        }
    }).then(async () => {
        console.log("login success")
        window.location.replace("/");
        return (await axios.get(USER_DETAILS_API)).data
    }).catch(error => {
        console.log("login failed")
        return error
    })).data
}


export const getLoggedInUserData = async () => {
    return (await axios.get(USER_DETAILS_API)).data
}

export const getSafeDataOfUserId = async (userId) => {
    return (await axios.get(SAFE_DETAILS + userId)).data
}