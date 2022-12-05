import {useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";
import {getOrderListThunk} from "./orders-thunk";
import Loader from "../components/loader";
import {OrderItem} from "./order-item";

export const OrdersComponents = () => {
    const {ordersData, loading} = useSelector(state => state.order)
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(getOrderListThunk())
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
