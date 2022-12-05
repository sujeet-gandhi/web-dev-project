import {useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";
import {getOrderListThunk} from "./orders-thunk";
import Loader from "../components/loader";
import {OrderItem} from "./order-item";
import NavBar from "../nav-bar";
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
            <NavBar links={[{link : '', name : 'Home'}]} userData={loggedInUser} loggedIn={loggedIn}/>
            {loading && <Loader/>}
            {!loading &&
                <>
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
