import axios from "axios";

const ONESTOPGO_API = process.env.REACT_APP_ONESTOPGO_API_BASE;
const USER_API = `${ONESTOPGO_API}/api/v1/user`;
const STORE_ADMIN_API = `${USER_API}/storeadmin`;

export const createStoreAdmin = async (user) => {
    const imageData = user.image;
    delete user.image;

    const json = JSON.stringify(user);
    const blob = new Blob([json], {
        type: 'application/json'
    });

    const formData = new FormData();
    formData.append("storeadmin", blob);
    formData.append("image", imageData);

    return (await axios.post(STORE_ADMIN_API, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })).data
}


export const updateUser = async (user, userId) => {
    const imageData = user.image;
    delete user.image;

    const json = JSON.stringify(user);
    const blob = new Blob([json], {
        type: 'application/json'
    });

    const formData = new FormData();
    formData.append("user", blob);
    formData.append("image", imageData);

    return (await axios.put(USER_API + '/' + userId, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })).data
}