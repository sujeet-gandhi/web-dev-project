import {useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";
import Loader from "../components/loader";
import Lottie from "lottie-react";
import product from "../lottie/product.json";
import '../index.css';
import {getHomeDataThunk} from "../home/home-thunk";
import StoreList from "../store/store-list";

export const AllProductsComponent = () => {
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
                        <div className={'container w-50 h-50 wd-screen-top-lottie'}>
                            <Lottie className={'w-50 h-50 wd-screen-top-lottie'} width={10} animationData={product} loop={true} />
                            <h2>Our Products</h2>
                        </div>
                    </center>
                    <StoreList storeArray={homeData.stores}/>
                </>
            }
        </>
    );
}
