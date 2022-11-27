import React, {useEffect, useState} from "react";
import StoreList from "../store/store-list";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import CategoriesList from "../categories/categories-list";
import {useDispatch, useSelector} from "react-redux";
import {getSearchDataThunk} from "../home/home-thunk";
import {useLocation} from "react-router";
import StoreMap from "../store-map";

export const SearchComponent = () => {
    const {searchData, loading} = useSelector(state => state.search)
    const dispatch = useDispatch();
    const location = useLocation();
    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        setSearchText(location.state.searchTerm);
        dispatch(getSearchDataThunk(location.state.searchTerm))
    }, []);

    function handleChange(e) {
        setSearchText(e.target.value);
    }

    if (!searchData) return null;

    const handleOnSearchSubmit = () => {
        dispatch(getSearchDataThunk(searchText))
    }

    return (
        <>
            {loading && <h1>Looking up "{searchText}" ...</h1>}
            {!loading &&
                <>
                    <nav>
                        <div className="nav-wrapper teal">
                            <form onSubmit={handleOnSearchSubmit}>
                                <div className="input-field">
                                    <input id="search" type="search" defaultValue={searchText} onChange={handleChange} required/>
                                    <label className="label-icon" htmlFor="search">
                                        <i className="material-icons">search</i>
                                    </label>
                                    <i className="material-icons">close</i>
                                </div>
                            </form>
                        </div>
                    </nav>

                    <h1>Products</h1>

                    <h1>Stores</h1>
                    <StoreList storeArray={searchData.stores}/>

                    <h1>Categories</h1>
                    <CategoriesList categoriesArray={searchData.categories}/>

                    {searchData.stores && <StoreMap storeArray={searchData.stores}/>}

                </>
            }
        </>
    );
}
