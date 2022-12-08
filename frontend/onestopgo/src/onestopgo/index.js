import {configureStore} from "@reduxjs/toolkit";
import homeReducer from "../home/home-reducer";
import storeReducer from "../store/store-reducer";
import userReducer from "../user/user-reducer";
import searchReducer from "../search/search-reducer";
import productReducer from "../products/product-reducer";
import cartReducer from "../cart/cart-reducer";
import ordersReducer from "../orders/orders-reducer";
import {CartComponent} from "../cart";
import {Route, Routes} from "react-router-dom";
import {HomeComponent} from "../home";
import {OrdersComponents} from "../orders";
import {Provider} from "react-redux";
import NavigationSidebar from "../navigation-sidebar";
import NavBar from "../nav-bar";
import React from "react";
import {SearchComponent} from "../search";
import {EmptySearchView} from "../search/empty-search";
import ProfileComponent from "../profile";
import ProductDetailItem from "../products/detail-page/product-detail-item";
import loginReducer from "../login/login-reducer";
import {Logout} from "../logout";
import RootOperations from "../root-operations";
import StoreAdmin from "../store-admin";
import StoreDetailItem from "../store/detail-page/store-detail-item";
import CategorySummary from "../categories";

const store = configureStore({
    reducer: {home: homeReducer, store: storeReducer, user: userReducer, search: searchReducer,
        product: productReducer, cart: cartReducer, order: ordersReducer, login: loginReducer}
});

function OneStopGo() {
    return (
        <Provider store={store}>
            <NavBar links={[{link : 'cart', name : 'Cart', icon : 'shopping_cart'}, {link : 'orders', name : 'Orders', icon : 'kitchen'}]}/>
            <div className="row mt-4">
                <div className="col-2 col-md-2 col-lg-1 col-xl-2">
                    <NavigationSidebar active="home"/>
                </div>
                <div className="col-12 col-md-12 col-lg-7 col-xl-7"
                     style={{"position": "relative"}}>
                    <Routes>
                        <Route path="" element={<HomeComponent/>}/>
                        <Route path="orders" element={<OrdersComponents/>}/>
                        <Route path="products" element={<h1>We will display all the products here</h1>}/>
                        <Route path="stores" element={<h1>All Store list here</h1>}/>
                        <Route path="/store" element={<StoreDetailItem/>}/>
                        <Route path="product" element={<ProductDetailItem/>}/>
                        <Route path="lists" element={<h1>Lists Coming Soon</h1>}/>
                        <Route path="profile" element={<ProfileComponent/>}/>
                        <Route path="cart" element={<CartComponent/>}/>
                        <Route path="search" element={<EmptySearchView/>}/>
                        <Route path="results/*" element={<SearchComponent/>}/>
                        <Route path="edit-profile" element={<ProfileComponent/>}/>
                        <Route path="root" element={<RootOperations/>}/>
                        <Route path="storeadmin" element={<StoreAdmin/>}/>
                        <Route path="logout" element={<Logout/>}/>
                        <Route path="category/:categoryId" element={<CategorySummary/>}/>
                    </Routes>
                </div>
                <div className="d-sm-none d-md-none d-lg-block col-lg-3 col-xl-3">
                    <CartComponent/>
                </div>
            </div>
        </Provider>
    );
}

export default OneStopGo