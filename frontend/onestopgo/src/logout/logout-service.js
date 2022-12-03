import axios from 'axios';
const LOGOUT_API ="http://localhost:8080/logout";
axios.defaults.withCredentials=true
export const hitLogout = async () => {
    return (await axios.post(LOGOUT_API,{
        mode: 'no-cors',
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
