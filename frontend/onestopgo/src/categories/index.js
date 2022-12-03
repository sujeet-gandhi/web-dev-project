import NavBar from "../nav-bar";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router";
import {getProductsOfCategoryThunk} from "../products/product-thunk";
import ProductList from "../products/product-list";

const CategorySummary = () => {
    const mockUserData = () => {
        return {
            imageUrl: 'images/user/190015bd-511a-41f5-ac17-f401aef8df46.jpg'
        }
    }

    const dispatch = useDispatch();
    const {categoryProductData, categoryProductDataLoading} = useSelector(state => state.product)
    const {categoryId} = useParams();

    useEffect(() => {
        dispatch(getProductsOfCategoryThunk(categoryId))
    }, []);


    return (
        <>
            <NavBar links={[{link: 'cart', name: 'Cart'}, {link: 'orders', name: 'Orders'}, {link: '', name: 'Home'}]}
                    userData={mockUserData()}/>
            {!categoryProductDataLoading &&
                <>
                    <ProductList storeItemQuantityArray={categoryProductData}/>
                </>
            }
        </>
    );
}

export default CategorySummary;