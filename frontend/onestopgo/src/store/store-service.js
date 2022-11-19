import axios from 'axios';

const ONESTOPGO_API = process.env.REACT_APP_ONESTOPGO_API_BASE;
const STORE_API = `${ONESTOPGO_API}/api/v1/store`;

export const getAllStores = async () => {
    return (await axios.get(STORE_API)).data
}

export const createStore = async (store) => {
    const imageData = store.image;
    delete store.image;

    const json = JSON.stringify(store);
    const blob = new Blob([json], {
        type: 'application/json'
    });

    const formData = new FormData();
    formData.append("store", blob);
    formData.append("image", imageData);

    return (await axios.post(STORE_API, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })).data
}
