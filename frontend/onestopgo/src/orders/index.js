import {useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";
import {getOrderListThunk} from "./orders-thunk";
import Loader from "../components/loader";
import {OrderItem} from "./order-item";
import {getUserDataThunk} from "../login/login-thunk";
import {LoginSuggest} from "../components/login-prompt";
import Lottie from "lottie-react";
import order from "../lottie/order.json";

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
                    <center>
                        <div className={'container w-25'}>
                            <Lottie width={10} animationData={order} loop={false} />
                        </div>
                    </center>
                    <ul>
                        {
                            ordersData.orders.map ((order) =>
                                <l1>
                                    <OrderItem order={order} />
                                </l1>
                            )
                        }
                    </ul>
                </>
            }
        </>
    );
}
