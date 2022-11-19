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


function App() {
    const store = configureStore({
        reducer: {home: homeReducer, store: storeReducer, user: userReducer}
    });
    return (
        <Provider store={store}>
            <BrowserRouter>
                <div className="container">
                    <Routes>
                        <Route index element={<HomeComponent/>}/>
                        <Route path="/login" element={<LoginForm/>}/>
                        <Route path="/root" element={<RootOperations/>}/>
                    </Routes>
                </div>
            </BrowserRouter>
        </Provider>
    );
}

export default App;
