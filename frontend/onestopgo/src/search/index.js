import React, {useEffect} from "react";
import StoreList from "../store/store-list";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import CategoriesList from "../categories/categories-list";
import {useDispatch, useSelector} from "react-redux";
import {getSearchDataThunk} from "./search-thunk";

export const SearchComponent = () => {
    const {searchData, loading} = useSelector(state => state.home)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getSearchDataThunk())
    }, []);

    if (!searchData) return null;

    return (
        <>
            {loading && <h1>Loading Data ...</h1>}
            {!loading &&
                <>
                    <nav>
                        <div className="nav-wrapper teal">
                            <form>
                                <div className="input-field">
                                    <input id="search" type="search" required/>
                                    <label className="label-icon" htmlFor="search"><i
                                        className="material-icons">search</i></label>
                                    <i className="material-icons">close</i>
                                </div>
                            </form>
                        </div>
                    </nav>
                    <StoreList storeArray={searchData.stores}/>
                    <CategoriesList categoriesArray={searchData.categories}/>
                </>
            }
        </>
    );
}
