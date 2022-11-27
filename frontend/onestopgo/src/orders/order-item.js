import CartItem from "../cart/cart-item";
import React from "react";

export const OrderItem = ({order}) => {

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
                            order.items.map ((cartItem) => <CartItem cartItem={cartItem}/>)
                        }
                    </ul>
                </div>
            </div>
        </div>
    </div>
}


