import React, {useEffect, useState} from "react";
import StoreList from "../store/store-list";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import CategoriesList from "../categories/categories-list";
import {useDispatch, useSelector} from "react-redux";
import {getHomeDataThunk} from "./home-thunk";
import Loader from "../components/loader";
import StoreMap from "../store-map";
import NavBar from "../nav-bar";
import {getUserDataThunk} from "../login/login-thunk";

export const HomeComponent = () => {
    const {homeData, loading} = useSelector(state => state.home)
    const {loggedIn, loggedInUser} = useSelector(state => state.login)
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(getHomeDataThunk())
        dispatch(getUserDataThunk())
    }, []);


    if (!homeData) return null;

    return (
        <>
            <NavBar links={[{link : 'cart', name : 'Cart', icon : 'shopping_cart'},
                            {link : 'orders', name : 'Orders', icon : 'kitchen'}]}
                            userData={loggedInUser} loggedIn={loggedIn}/>
            {loading && <Loader/>}
            {!loading &&
                <>
                    <StoreList storeArray={homeData.stores}/>
                    <CategoriesList categoriesArray={homeData.categories}/>
                    <StoreMap storeArray={homeData.stores}/>
                </>
            }
        </>
    );
}
