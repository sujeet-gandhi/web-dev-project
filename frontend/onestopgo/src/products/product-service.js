import axios from 'axios';

const ONESTOPGO_API = process.env.REACT_APP_ONESTOPGO_API_BASE;
const PRODUCT_API = `${ONESTOPGO_API}/api/v1/product`;
const PRODUCT_STORE_API = `${ONESTOPGO_API}/api/v1/product/store/`;
const PRODUCT_STOREADMIN_API = `${ONESTOPGO_API}/api/v1/product/storeadmin`;
const CATEGORY_PRODUCT_API = `${ONESTOPGO_API}/api/v1/product/category/`;


export const getAllProductsOfStoreAdmin = async () => {
    return (await axios.get(PRODUCT_STOREADMIN_API)).data
}

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


export const getProductsRelatedToCategory = async (categoryId) => {
    return (await axios.get(CATEGORY_PRODUCT_API + categoryId)).data
}