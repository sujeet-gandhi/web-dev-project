import React from "react";
import CartItem from "./cart-item";

const CartList = ({cartItems}) => {
    if (!cartItems) return null;
    console.log(cartItems);

    return(
        <div>
            <ul className={'collection'}>
                {
                    cartItems.map ((cartItem) => <CartItem cartItem={cartItem}/>)
                }
            </ul>
        </div>
    );
};
export default CartList;