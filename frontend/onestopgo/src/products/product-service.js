import axios from 'axios';

const ONESTOPGO_API = process.env.REACT_APP_ONESTOPGO_API_BASE;
const PRODUCT_API = `${ONESTOPGO_API}/api/v1/product`;
const PRODUCT_STORE_API = `${ONESTOPGO_API}/api/v1/product/store/`;


export const getAllProductsOfStore = async (storeId) => {
    return (await axios.get(PRODUCT_STORE_API + storeId)).data
}


export const createProduct = async (product) => {
    const imageData = product.image;
    delete product.image;

    const json = JSON.stringify(product);
    const blob = new Blob([json], {
        type: 'application/json'
    });

    const formData = new FormData();
    formData.append("product", blob);
    formData.append("image", imageData);

    return (await axios.post(PRODUCT_API, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })).data
}
