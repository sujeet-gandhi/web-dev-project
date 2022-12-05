import {useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";
import {getOrderListThunk} from "./orders-thunk";
import Loader from "../components/loader";
import {OrderItem} from "./order-item";
import {getUserDataThunk} from "../login/login-thunk";

export const OrdersComponents = () => {
    const {ordersData, loading} = useSelector(state => state.order)
    const {loggedIn, loggedInUser} = useSelector(state => state.login)
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(getOrderListThunk())
        dispatch(getUserDataThunk())
    }, []);

    if (!ordersData) return null;
    return (
        <>
            {loading && <Loader/>}
            {!loading &&
                <>
                    <center>
                        <h1>Your OneStopGo Orders</h1>
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
