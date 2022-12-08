import {useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";
import {getOrderListThunk} from "./orders-thunk";
import Loader from "../components/loader";
import {OrderItem} from "./order-item";
import {getUserDataThunk} from "../login/login-thunk";
import {LoginSuggest} from "../components/login-prompt";
import Lottie from "lottie-react";
import order from "../lottie/order.json";
import '../index.css';

export const OrdersComponents = () => {
    const {ordersData, loading} = useSelector(state => state.order)
    const {loggedIn, loggedInUser} = useSelector(state => state.login)
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(getOrderListThunk())
        dispatch(getUserDataThunk())
    }, []);

    if (!loggedIn) return <LoginSuggest pageName={'Orders'}/>;
    if (!ordersData) return null;
    return (
        <>
            {loading && <Loader/>}
            {!loading &&
                <>
                    <center className={'wd-screen-top-lottie'}>
                        <div className={'container w-50 h-50 wd-screen-top-lottie'}>
                            <Lottie className={'w-50 h-50 wd-screen-top-lottie'} width={10} animationData={order} loop={false} />
                        </div>
                    </center>
                    <ul className={'wd-screen-top-lottie'}>
                        {
                            ordersData.orders.map ((order) =>
                                <l1>
                                    <OrderItem order={order} userType={loggedInUser.type}/>
                                </l1>
                            )
                        }
                    </ul>
                </>
            }
        </>
    );
}
