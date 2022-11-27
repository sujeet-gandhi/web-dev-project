import React from "react";
import {useDispatch} from "react-redux";
import {removeFromCartThunk} from "./cart-thunk";

const ONESTOPGO_API = process.env.REACT_APP_ONESTOPGO_API_BASE;

const CartItem = ({cartItem, orderState}) => {
    const dispatch = useDispatch();
    if (!cartItem) return null;


    const handleRemoveCartClick = () => {
        console.log("Delete Invoked")
        dispatch(removeFromCartThunk(cartItem.id))
    }

    return (
        <li className="collection-item avatar">
            <img src={ONESTOPGO_API + "/" + cartItem.product.imageUrl} alt="" className="circle"/>
                <span className={'title fw-bold'}>{cartItem.product.name}</span>
            <p><span className={'fw-bold'}>${cartItem.product.price} / <span className={'fw-lighter'}>{cartItem.product.quantity} {cartItem.product.unit}</span> </span><br/>
                Total: {cartItem.quantity} x {cartItem.product.price}$ per {cartItem.product.quantity} {cartItem.product.unit} = <span className={'fw-bolder'}>${cartItem.quantity * cartItem.product.price}</span>
            </p>
            {orderState === 'IN_CART' && <a onClick={handleRemoveCartClick} href="#!" className="secondary-content red-text"><i className="material-icons">remove_shopping_cart</i></a>}
        </li>
    );
};
export default CartItem;