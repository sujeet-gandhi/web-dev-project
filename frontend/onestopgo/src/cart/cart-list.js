import React from "react";
import CartItem from "./cart-item";

const CartList = ({cartItems, userType}) => {
    if (!cartItems) return null;
    console.log(cartItems);

    const uniqueStoreNames = new Set();
    cartItems.forEach((each) => uniqueStoreNames.add(each.storeName))

    const storeAndStoreCartItems = {}
    uniqueStoreNames.forEach((eachStore) => {
        cartItems.forEach((eachCartItem) => {
            if (eachCartItem.storeName === eachStore) {
                if (eachStore in storeAndStoreCartItems) {
                    storeAndStoreCartItems[eachStore].push(eachCartItem)
                } else {
                    storeAndStoreCartItems[eachStore] = [eachCartItem]
                }
            }
        })
    })

    return (
        <div>
            <ul className={'collection'}>
                {
                    (userType === "USER") &&
                    Object.entries(storeAndStoreCartItems)
                        .map(([key, val]) => <>
                            <li className="collection-item fw-bolder">{key}</li>
                            {val.map((each) => <CartItem cartItem={each} orderState={'IN_CART'}/>)}
                            </>)
                }
            </ul>
        </div>
    );
};
export default CartList;