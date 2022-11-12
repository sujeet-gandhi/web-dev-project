import React, {useEffect} from "react";
import StoreList from "../store/store-list";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import CategoriesList from "../categories/categories-list";
import {useDispatch, useSelector} from "react-redux";
import {getHomeDataThunk} from "./home-thunk";

export const HomeComponent = () => {
    const {homeData, loading} = useSelector(state => state.home)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getHomeDataThunk())
    }, []);

    if (!homeData) return null;

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
                    <StoreList storeArray={homeData.stores}/>
                    <CategoriesList categoriesArray={homeData.categories}/>
                </>
            }
        </>
    );
}
