import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import '@fortawesome/fontawesome-free/css/all.css';
import {configureStore} from "@reduxjs/toolkit";
import homeReducer from "./home/home-reducer";
import {Provider} from "react-redux";
import storeReducer from "./store/store-reducer";
import userReducer from "./user/user-reducer";
import searchReducer from "./search/search-reducer";
import productReducer from "./products/product-reducer";
import cartReducer from "./cart/cart-reducer";
import ordersReducer from "./orders/orders-reducer";
import OneStopGo from "./onestopgo";

function App() {
    const store = configureStore({
        reducer: {home: homeReducer, store: storeReducer, user: userReducer, search: searchReducer,
            product: productReducer, cart: cartReducer, order: ordersReducer}
    });
    return (
        <Provider store={store}>
            <BrowserRouter>
                <div className={'w-100'}>
                    <Routes>
                        <Route path="/*" element={<OneStopGo/>}/>
                    </Routes>
                    {/*<Footer/>*/}
                </div>
            </BrowserRouter>
        </Provider>
    );
}

export default App;
