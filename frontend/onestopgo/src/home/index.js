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

export const HomeComponent = () => {
    const {homeData, loading} = useSelector(state => state.home)
    const dispatch = useDispatch();

    const mockUserData = () => {
        return {
            imageUrl: 'images/user/190015bd-511a-41f5-ac17-f401aef8df46.jpg'
        }
    }

    useEffect(() => {
        dispatch(getHomeDataThunk())
    }, []);

    if (!homeData) return null;

    return (
        <>
            <NavBar links={[{link : 'cart', name : 'Cart', icon : 'shopping_cart'},
                            {link : 'orders', name : 'Orders', icon : 'kitchen'}]}
                            userData={mockUserData()}/>
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
