import axios from 'axios';
import {useState} from "react";

const ONESTOPGO_API = process.env.REACT_APP_ONESTOPGO_API_BASE;
const LOGIN_API =`${ONESTOPGO_API}/login`;
const REGISTER_API =`${ONESTOPGO_API}/api/v1/signup`;
axios.defaults.withCredentials=true

export const hitLogin = async (loginDetails) => {
    const formData = new FormData();
    formData.append("username", loginDetails.email);
    formData.append("password", loginDetails.password);

    return (await axios.post(LOGIN_API, formData, {
        mode: 'no-cors',
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
        .then((request,response) => {
            console.log('hi')
            console.log(request.headers)
            console.log(response);
            console.log(response.headers);
        }).catch(error => {
            console.log(error)
        }));
}

export const registerUser = async (userDetails) => {

    return (await axios.post(REGISTER_API, userDetails)).data
}