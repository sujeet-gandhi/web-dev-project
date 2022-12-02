import React, {useEffect, useState} from "react";
import {useLocation} from "react-router";
import NavBar from "../../nav-bar";
import ProductList from "../../products/product-list";
import {getProductsOfStoreThunk} from "../../products/product-thunk";
import {useDispatch, useSelector} from "react-redux";
import Loader from "../../components/loader";

const ONESTOPGO_API = process.env.REACT_APP_ONESTOPGO_API_BASE;

const StoreDetailItem = () => {
    const [store, setStore] = useState(null);
    const {productData, productLoading} = useSelector(state => state.product)
    const location = useLocation()
    const dispatch = useDispatch()

    const mockUserData = () => {
        return {
            imageUrl: 'images/user/190015bd-511a-41f5-ac17-f401aef8df46.jpg'
        }
    }

    useEffect(() => {
        dispatch(getProductsOfStoreThunk(location.state.store.id))
        setStore(location.state.store);
        console.log(location.state.store.id)
    }, []);

    if (!store) return null;
    return (
        <div>
            <NavBar links={[{link : 'cart', name : 'Cart'}, {link : 'orders', name : 'Orders'}]} userData={mockUserData()}/>
            <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12">
            <div className="card-panel">
                <div className={'col center'}>
                    <img width={200} height={200} className={'rounded-circle border-3 wd-margin-bottom'} src={ONESTOPGO_API + "/" + store.imageUrl}/>
                    <p className="card-title fw-bolder black-text">{store.name}</p>
                    <p className="green-text">
                        {store.openingTime} - {store.closingTime}<br/>
                        <span className="card-title text-secondary">
                                        {store.type}
                                    </span>
                    </p>
                </div>
            </div>
        </div>
            <h1>Our Products</h1>
            {productLoading && <Loader/>}
            {!productLoading && <ProductList storeItemQuantityArray={productData}/>}
        </div>
    );
};
export default StoreDetailItem;