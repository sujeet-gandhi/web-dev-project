import {useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";
import {useNavigate} from "react-router";
import {getOrderListThunk} from "./orders-thunk";
import Loader from "../components/loader";
import {OrderItem} from "./order-item";

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
                    <nav>
                        <div className="nav-wrapper teal">
                            <a href="#" className="brand-logo center"><img width={75} height={75} src={'../../images/shop.jpg'}/></a>
                            <ul id="nav-mobile" className="left hide-on-med-and-down">
                                <li onClick={handleOnHomeClicked}><a href="#">Home</a></li>
                            </ul>
                        </div>
                    </nav>
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
