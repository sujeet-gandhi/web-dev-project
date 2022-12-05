import axios from 'axios';
import {useState} from "react";

const ONESTOPGO_API = process.env.REACT_APP_ONESTOPGO_API_BASE;
const LOGIN_API = `${ONESTOPGO_API}/login`;
const CREATE_NEW_USER = `${ONESTOPGO_API}/api/v1/user`;
const USER_DETAILS_API = `${ONESTOPGO_API}/api/v1/login/userdata`;
axios.defaults.withCredentials = true

export const hitLogin = async (loginDetails) => {
    const formData = new FormData();
    formData.append("username", loginDetails.email);
    formData.append("password", loginDetails.password);

    return await axios.post(LOGIN_API, formData, {
        mode: 'no-cors',
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).then(() => {
        console.log("login success")
    }).catch(error => {
        console.log("logging error ", error)
    })
}

export const getLoggedInUserData = async () => {
    return (await axios.get(USER_DETAILS_API)).data
}

export const registerUser = async (userDetails) => {
    return (await axios.post(CREATE_NEW_USER, userDetails)).data
}