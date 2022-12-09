import React, {useEffect, useState} from "react";
import {useLocation, useParams} from "react-router";
import ProductList from "../../products/product-list";
import {getProductsOfStoreThunk} from "../../products/product-thunk";
import {useDispatch, useSelector} from "react-redux";
import Loader from "../../components/loader";
import {getUserDataThunk} from "../../login/login-thunk";
import {getStoreFromIdThunk, markStoreAsFavouriteThunk} from "../store-thunk";

const ONESTOPGO_API = process.env.REACT_APP_ONESTOPGO_API_BASE;

const StoreDetailItem = () => {
    const {singleStoreDataLoading, singleStoreData} = useSelector(state => state.store)
    const {productData, productLoading} = useSelector(state => state.product)
    const {loggedIn, loggedInUser} = useSelector(state => state.login)
    const dispatch = useDispatch()
    const {storeId} = useParams();

    const checkIfStoreIsFavourite = (userFavourites) => {
        if (!userFavourites.stores)
            return false

        for (var i = 0; i < userFavourites.stores.length; i++) {
            const each = userFavourites.stores[i]
            if (storeId === (each[1] + '')) {
                return true;
            }
        }

        return false;
    }

    const handleMarkAsFavourite = () => {
        dispatch(markStoreAsFavouriteThunk(storeId))
        dispatch(getUserDataThunk())
    }

    useEffect(() => {
        dispatch(getProductsOfStoreThunk(storeId))
        dispatch(getStoreFromIdThunk(storeId))
        dispatch(getUserDataThunk())
    }, []);

    return (
        <>
            {
                singleStoreDataLoading && <Loader/>
            }
            {!singleStoreDataLoading && <div>
                <div className="right me-2">
                    {
                        loggedIn && checkIfStoreIsFavourite(loggedInUser.favourites) && <>
                            <button className="btn btn-secondary" disabled>Favourite</button>
                        </>
                    }
                    {
                        loggedIn && !checkIfStoreIsFavourite(loggedInUser.favourites) && <>
                            <button className="btn btn-primary" onClick={handleMarkAsFavourite}>Mark as favourite</button>
                        </>
                    }
                </div>
                <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12">
                    <div className="card-panel">
                        <div className={'col center'}>
                            <img width={200} height={200} className={'rounded-circle border-3 wd-margin-bottom'}
                                 src={ONESTOPGO_API + "/" + singleStoreData.imageUrl}/>
                            <p className="card-title fw-bolder black-text">{singleStoreData.name}</p>
                            <p className="green-text">
                                {singleStoreData.openingTime} - {singleStoreData.closingTime}<br/>
                                <span className="card-title text-secondary">
                                        {singleStoreData.type}
                                    </span>
                            </p>
                        </div>
                    </div>
                </div>
                <h1>Our Products</h1>
                {productLoading && <Loader/>}
                {!productLoading && <ProductList storeItemQuantityArray={productData} userType={loggedIn&&loggedInUser.type}/>}
            </div>}
        </>
    );
};
export default StoreDetailItem;