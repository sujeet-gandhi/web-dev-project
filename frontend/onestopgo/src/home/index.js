import React, {useEffect, useState} from "react";
import StoreList from "../store/store-list";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import CategoriesList from "../categories/categories-list";
import {useDispatch, useSelector} from "react-redux";
import {getHomeDataThunk} from "./home-thunk";
import {useNavigate} from "react-router";
import Loader from "../components/loader";
import StoreMap from "../store-map";
import NavBar from "../nav-bar";

export const HomeComponent = () => {
    const {homeData, loading} = useSelector(state => state.home)
    const dispatch = useDispatch();

    const [searchText, setSearchText] = useState("");

    function handleChange(e) {
        setSearchText(e.target.value);
    }

    useEffect(() => {
        dispatch(getHomeDataThunk())
    }, []);

    const nav = useNavigate()

    const handleOnSearchSubmit = () => {
        console.log("Search Submitted");
        nav("/search", {
            state:
                {
                    searchTerm: searchText
                }
        })
    }

    if (!homeData) return null;

    return (
        <>
            {loading && <Loader/>}
            {!loading &&
                <>
                    <NavBar links={[{link : 'cart', name : 'Cart'}, {link : 'orders', name : 'Orders'}]}/>
                    <nav>
                        <div className="nav-wrapper green">
                            <form onSubmit={handleOnSearchSubmit}>
                                <div className="input-field">
                                    <input id="search" type="search" onChange={handleChange} required/>
                                    <label className="label-icon" htmlFor="search"><i
                                        className="material-icons">search</i></label>
                                    <i className="material-icons">close</i>
                                </div>
                            </form>
                        </div>
                    </nav>
                    <StoreList storeArray={homeData.stores}/>
                    <CategoriesList categoriesArray={homeData.categories}/>
                    <StoreMap storeArray={homeData.stores}/>
                </>
            }
        </>
    );
}
