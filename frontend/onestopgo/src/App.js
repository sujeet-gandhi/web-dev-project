import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {HomeComponent} from "./home";
import '@fortawesome/fontawesome-free/css/all.css';
import {LoginForm} from "./login";
import {configureStore} from "@reduxjs/toolkit";
import homeReducer from "./home/home-reducer";
import {Provider} from "react-redux";
import RootOperations from "./root-operations";
import storeReducer from "./store/store-reducer";
import userReducer from "./user/user-reducer";
import searchReducer from "./search/search-reducer";
import {SearchComponent} from "./search";
import StoreAdmin from "./store-admin";
import productReducer from "./products/product-reducer";
import cartReducer from "./cart/cart-reducer";
import {CartComponent} from "./cart";
import ordersReducer from "./orders/orders-reducer";
import {OrdersComponents} from "./orders";
import ProfilePage from "./profile";
import StoreDetailItem from "./store/detail-page/store-detail-item";
import ProductDetailItem from "./products/detail-page/product-detail-item";
import CategorySummary from "./categories";

function App() {
    const store = configureStore({
        reducer: {home: homeReducer, store: storeReducer, user: userReducer, search: searchReducer,
            product: productReducer, cart: cartReducer, order: ordersReducer}
    });
    return (
        <Provider store={store}>
            <BrowserRouter>
                <div className="container">
                    <Routes>
                        <Route index element={<HomeComponent/>}/>
                        <Route path="/search" element={<SearchComponent/>}/>
                        <Route path="/store" element={<StoreDetailItem/>}/>
                        <Route path="/product" element={<ProductDetailItem/>}/>
                        <Route path="/login" element={<LoginForm/>}/>
                        <Route path="/root" element={<RootOperations/>}/>
                        <Route path="/cart" element={<CartComponent/>}/>
                        <Route path="/orders" element={<OrdersComponents/>}/>
                        <Route path="/storeAdmin" element={<StoreAdmin/>}/>
                        <Route path="/profile" element={<ProfilePage/>}/>
                        <Route path="/category/:categoryId" element={<CategorySummary/>}/>
                    </Routes>
                    {/*<Footer/>*/}
                </div>
            </BrowserRouter>
        </Provider>
    );
}

export default App;
