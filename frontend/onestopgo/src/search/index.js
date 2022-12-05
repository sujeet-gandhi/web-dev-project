import React, {useEffect, useState} from "react";
import StoreList from "../store/store-list";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import CategoriesList from "../categories/categories-list";
import {useDispatch, useSelector} from "react-redux";
import {getSearchDataThunk} from "../home/home-thunk";
import {useLocation} from "react-router";
import ProductList from "../products/product-list";
import StoreMap from "../store-map";

export const SearchComponent = () => {
    const {searchData, loading} = useSelector(state => state.search)
    const [searchText, setSearchText] = useState("");
    const dispatch = useDispatch();
    const {pathname} = useLocation();
    const paths = pathname.split('/')
    const searchTerm = paths[2];

    useEffect(() => {
        setSearchText(searchTerm);
        dispatch(getSearchDataThunk(searchTerm))
    }, []);

    function handleChange(e) {
        setSearchText(e.target.value);
    }

    if (!searchData) return null;
    console.log("Search Data = " +searchData);
    return (
        <>
            {loading && <h1>Looking up "{searchText}" ...</h1>}
            {!loading &&
                <>
                    <h1>Products</h1>
                    <ProductList storeItemQuantityArray={searchData.products}/>

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
