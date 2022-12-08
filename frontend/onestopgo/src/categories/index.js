import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router";
import {getProductsOfCategoryThunk} from "../products/product-thunk";
import ProductList from "../products/product-list";
import {getUserDataThunk} from "../login/login-thunk";

const CategorySummary = () => {
    const {loggedIn, loggedInUser} = useSelector(state => state.login)
    const dispatch = useDispatch();
    const {categoryProductData, categoryProductDataLoading} = useSelector(state => state.product)
    const {categoryId} = useParams();

    useEffect(() => {
        dispatch(getProductsOfCategoryThunk(categoryId))
        dispatch(getUserDataThunk())
    }, []);


    return (
        <>
            {!categoryProductDataLoading &&
                <>
                    <ProductList storeItemQuantityArray={categoryProductData} userType={loggedInUser.type}/>
                </>
            }
        </>
    );
}

export default CategorySummary;