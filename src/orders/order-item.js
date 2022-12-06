import CartItem from "../cart/cart-item";
import React from "react";

export const OrderItem = ({order}) => {

    const uniqueStoreNames = new Set();
    order.items.forEach((each) => uniqueStoreNames.add(each.storeName))

    const storeAndStoreOrderItems = {}
    uniqueStoreNames.forEach((eachStore) => {
        order.items.forEach((eachCartItem) => {
            if (eachStore in storeAndStoreOrderItems) {
                storeAndStoreOrderItems[eachStore].push(eachCartItem)
            } else {
                storeAndStoreOrderItems[eachStore] = [eachCartItem]
            }
        })
    })

    return <div className="row">
        <div className="col s12 m6">
            <div className="card teal">
                <div className={'card-content white-text'}>
                    <span className="card-title fw-bolder">Order #{order.id}</span>
                    <p>Details </p>
                    <span className={'fw-bolder card-title'}>Order is {order.orderState.toString().toLowerCase()}</span>
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


