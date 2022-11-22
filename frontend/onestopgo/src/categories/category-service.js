import axios from 'axios';

const ONESTOPGO_API = process.env.REACT_APP_ONESTOPGO_API_BASE;
const STORE_API = `${ONESTOPGO_API}/api/v1/category`;

export const getAllCategories = async () => {
    return (await axios.get(STORE_API)).data
}

export const createCategory = async (category) => {
    const imageData = category.image;
    delete category.image;

    const json = JSON.stringify(category);
    const blob = new Blob([json], {
        type: 'application/json'
    });

    const formData = new FormData();
    formData.append("category", blob);
    formData.append("image", imageData);

    return (await axios.post(STORE_API, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })).data
}
