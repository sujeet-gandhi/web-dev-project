import {useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";
import Loader from "../components/loader";
import Lottie from "lottie-react";
import store from "../lottie/store.json";
import '../index.css';
import {getHomeDataThunk} from "../home/home-thunk";
import StoreList from "./store-list";

export const AllStoreComponent = () => {
    const {homeData, loading} = useSelector(state => state.home)
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(getHomeDataThunk())
    }, []);

    if (!homeData) return null;
    return (
        <>
            {loading && <Loader/>}
            {!loading &&
                <>
                    <center className={'wd-screen-top-lottie'}>
                        <div className={'container w-75 h-75 wd-screen-top-lottie'}>
                            <Lottie style={{marginTop:-100}} className={'w-50 h-50 wd-screen-top-lottie'} width={10} animationData={store} loop={false} />
                            <h2 style={{marginTop:-80, marginBottom:20}}>Our Stores</h2>
                        </div>
                    </center>
                    <StoreList storeArray={homeData.stores}/>
                </>
            }
        </>
    );
}
