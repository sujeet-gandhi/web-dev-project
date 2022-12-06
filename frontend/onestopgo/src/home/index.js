import React, {useEffect} from "react";
import StoreList from "../store/store-list";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import CategoriesList from "../categories/categories-list";
import {useDispatch, useSelector} from "react-redux";
import {getHomeDataThunk} from "./home-thunk";
import Loader from "../components/loader";
import StoreMap from "../store-map";
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
            {loading && <Loader/>}
            {!loading &&
                <>
                    <div className="position-relative mb-2 border-3 card">
                        <img src="/images/one.png" className="w-100 rounded-3"/>
                    </div>
                    <StoreList storeArray={homeData.stores}/>
                    <CategoriesList categoriesArray={homeData.categories}/>
                    <StoreMap storeArray={homeData.stores}/>
                </>
            }
        </>
    );
}
