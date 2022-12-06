import axios from 'axios';

const ONESTOPGO_API = process.env.REACT_APP_ONESTOPGO_API_BASE;
const LOGOUT_API = `${ONESTOPGO_API}/logout`;
axios.defaults.withCredentials = true

export const hitLogout = async () => {
    return (await axios.post(LOGOUT_API, {
        mode: 'no-cors',
    })
        .then(() => {
            console.log("user logged out")
            return "logout success"
        }).catch(error => error));
}
