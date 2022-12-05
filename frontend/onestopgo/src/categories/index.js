import NavBar from "../nav-bar";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router";
import {getProductsOfCategoryThunk} from "../products/product-thunk";
import ProductList from "../products/product-list";

const CategorySummary = () => {
    const {loggedIn, loggedInUser} = useSelector(state => state.login)
    const dispatch = useDispatch();
    const {categoryProductData, categoryProductDataLoading} = useSelector(state => state.product)
    const {categoryId} = useParams();

    useEffect(() => {
        dispatch(getProductsOfCategoryThunk(categoryId))
    }, []);


    return (
        <>
            <NavBar links={[{link: 'cart', name: 'Cart'}, {link: 'orders', name: 'Orders'}, {link: '', name: 'Home'}]}
                    userData={loggedInUser} loggedIn={loggedIn}/>
            {!categoryProductDataLoading &&
                <>
                    <ProductList storeItemQuantityArray={categoryProductData}/>
                </>
            }
        </>
    );
}

export default CategorySummary;