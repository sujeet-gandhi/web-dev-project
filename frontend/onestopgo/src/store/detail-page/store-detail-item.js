import React, {useEffect} from "react";
import {useParams} from "react-router";
import ProductList from "../../products/product-list";
import {getProductsOfStoreThunk} from "../../products/product-thunk";
import {useDispatch, useSelector} from "react-redux";
import Loader from "../../components/loader";
import {getUserDataThunk} from "../../login/login-thunk";
import {getStoreFromIdThunk, getUsersWhoLikeStoreThunk, markStoreAsFavouriteThunk} from "../store-thunk";
import {Link} from "react-router-dom";

const ONESTOPGO_API = process.env.REACT_APP_ONESTOPGO_API_BASE;

const StoreDetailItem = () => {
    const {singleStoreDataLoading, singleStoreData, userLikeStoreData, usersLikeStoreLoading} = useSelector(state => state.store)
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
    }

    useEffect(() => {
        dispatch(getProductsOfStoreThunk(storeId))
        dispatch(getStoreFromIdThunk(storeId))
        dispatch(getUserDataThunk())
        dispatch(getUsersWhoLikeStoreThunk(storeId))
    }, []);

    return (
        <>
            {
                singleStoreDataLoading && <Loader/>
            }
            {!singleStoreDataLoading && <>
                <div>
                    <div style={{cursor: 'pointer', marginRight: 30}} className="right me-2">
                        {
                            loggedIn && checkIfStoreIsFavourite(loggedInUser.favourites) && <>
                                <i className="medium teal-text material-icons">star</i>

                                {/*<button className="btn btn-secondary" disabled>Favourite</button>*/}
                            </>
                        }
                        {
                            loggedIn && !checkIfStoreIsFavourite(loggedInUser.favourites) && <>
                                <i className="medium teal-text material-icons">star_border</i>

                                {/*<button className="btn btn-primary" onClick={handleMarkAsFavourite}>Mark as favourite*/}
                                {/*</button>*/}
                            </>
                        }
                    </div>
                    <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12">
                        <div className="card-panel center">
                            <div className={'container'}>
                                <img width={200} height={200} className={'rounded-circle border-3'}
                                     src={ONESTOPGO_API + "/" + singleStoreData.imageUrl}/>
                                <p className="card-title fw-bolder black-text">{singleStoreData.name}</p>
                                <p className="green-text">
                                    {singleStoreData.openingTime} - {singleStoreData.closingTime}<br/>
                                    <span className="card-title text-secondary">
                                        {singleStoreData.type}

                                        {!usersLikeStoreLoading && <div style={{marginTop:16}}>
                                            Marked Favorite By
                                                {userLikeStoreData.map((each) =>
                                                    <Link style={{marginLeft:10}} to={"/profile/" + each.id}>
                                                        <img width={30} height={30} src={ONESTOPGO_API + "/" + each.imageUrl} alt="" className="circle"/>
                                                        <span className="title">{each.name}</span>
                                                    </Link>
                                                )
                                                }
                                        </div>}
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                    <h1>Our Products</h1>
                    {productLoading && <Loader/>}
                    {!productLoading &&
                        <ProductList storeItemQuantityArray={productData} userType={loggedIn && loggedInUser.type}/>}
                </div>
            </>}
        </>
    );
};
export default StoreDetailItem;