import CartItem from "../cart/cart-item";
import React from "react";
import {cancelOrderThunk, deliverOrderThunk} from "./orders-thunk";
import {useDispatch} from "react-redux";
import {Link} from "react-router-dom";

export const OrderItem = ({order, userType}) => {

    const dispatch = useDispatch();

    const handleCancelOrder = () => {
        dispatch(cancelOrderThunk(order));
    }

    const handleDeliverOrder = () => {
        dispatch(deliverOrderThunk(order));
    }

    const uniqueStoreNames = new Set();
    order.items.forEach((each) => uniqueStoreNames.add(each.storeName))

    const storeAndStoreOrderItems = {}
    uniqueStoreNames.forEach((eachStore) => {
        order.items.forEach((eachCartItem) => {
            if (eachCartItem.storeName === eachStore) {
                if (eachStore in storeAndStoreOrderItems) {
                    storeAndStoreOrderItems[eachStore].push(eachCartItem)
                } else {
                    storeAndStoreOrderItems[eachStore] = [eachCartItem]
                }
            }
        })
    })

    return <div className="row">
        <div className="col s12 m6">
            <div className="card teal">
                <div className={'card-content white-text'}>
                    <span className="card-title fw-bolder">Order #{order.id}</span>
                    {order.orderState === 'PLACED' &&
                        <a onClick={handleCancelOrder} href="#"
                           className="secondary-content white-text right"><i className="material-icons">cancel</i>
                        </a>
                    }

                    <p>Details </p>
                    <span className={'fw-bolder card-title'}>Order is {order.orderState.toString().toLowerCase()}</span>
                    {
                        (userType === "ROOT" || userType === "STOREADMIN") &&
                        <>
                            {
                                (order.orderState === "PLACED") &&
                                <div className="fw-bolder card-title">
                                    <button className="btn btn-secondary" onClick={handleDeliverOrder}>Mark as Delivered
                                    </button>
                                </div>
                            }
                            <div className="fw-bold fs-5 card-title">
                                Customer Id : <Link to={'/profile/' + order.userId} className="text-white">{order.userEmail}</Link>
                            </div>
                        </>
                    }
                    <h4 className={'right'}>Total: ${order.orderTotal}</h4>
                </div>
                <div className={'card-action'}>
                    <ul className={'collection'}>
                        {
                            Object.entries(storeAndStoreOrderItems)
                                .map(([key, val]) => <>
                                    <li className="collection-item fw-bolder">{key}</li>
                                    {val.map((each) => <CartItem cartItem={each}/>)}
                                </>)
                        }
                    </ul>
                </div>
            </div>
        </div>
    </div>
}


