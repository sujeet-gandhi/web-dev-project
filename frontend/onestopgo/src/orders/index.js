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

    const mockUserData = () => {
        return {
            imageUrl: 'images/user/190015bd-511a-41f5-ac17-f401aef8df46.jpg'
        }
    }

    if (!ordersData) return null;
    return (
        <>
            <NavBar links={[{link : '', name : 'Home'}]} userData={mockUserData()}/>
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
