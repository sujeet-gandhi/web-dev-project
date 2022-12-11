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

    if (loading) return <Loader/>
    if (!loggedIn) return <LoginSuggest pageName={'Orders'}/>;
    if (!ordersData) return null;
    return (
        <>
            {loading && <Loader/>}
            {!loading &&
                <>
                    <center className={'wd-screen-top-lottie hide-on-med-and-down'}>
                        <div className={'container w-50 h-50 wd-screen-top-lottie'}>
                            <Lottie style={{marginTop:-110}} className={'w-50 h-50 wd-screen-top-lottie'} width={10} animationData={order} loop={false} />
                            <h2 style={{marginTop:-80, marginBottom:20}}>Your Orders</h2>
                        </div>
                    </center>
                    <ul style={{marginTop:20}} className={'wd-screen-top-lottie'}>
                        {
                            ordersData.orders.filter((order) => (loggedInUser.type !== "USER" || order.orderState !== 'IN_CART')).map ((order) =>
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
