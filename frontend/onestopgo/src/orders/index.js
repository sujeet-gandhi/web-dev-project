import {useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";
import {useNavigate} from "react-router";
import {getOrderListThunk} from "./orders-thunk";
import Loader from "../components/loader";
import {OrderItem} from "./order-item";
import NavBar from "../nav-bar";

export const OrdersComponents = () => {
    const {ordersData, loading} = useSelector(state => state.order)
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(getOrderListThunk())
    }, []);

    const nav = useNavigate()

    const handleOnOrderClicked = () => {
        nav('/orderDetails')
    }

    const handleOnHomeClicked = () => {
        nav('/')
    }

    if (!ordersData) return null;
    return (
        <>
            {loading && <Loader/>}
            {!loading &&
                <>
                    <NavBar links={[{link : '', name : 'Home'}]}/>
                    <h1>Your OneStopGo Orders</h1>
                    <ul>
                        {
                            ordersData
                                .orders.map ((order) =>
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
