import React from "react";
import {useDispatch} from "react-redux";
import {removeFromCartThunk, updateCartThunk} from "./cart-thunk";

const ONESTOPGO_API = process.env.REACT_APP_ONESTOPGO_API_BASE;

const CartItem = ({cartItem, orderState}) => {
    const dispatch = useDispatch();
    if (!cartItem) return null;

    function roundUpTwoPlaces(n) {
        return Math.round((n + Number.EPSILON) * 100) / 100
    }

    const handleRemoveCartClick = () => {
        console.log("Delete Invoked")
        dispatch(removeFromCartThunk(cartItem.id))
    }

    const handleIncreaseOneCount = () => {
        console.log("One Quantity Added Increased in Cart");
        const orderItemQuantity = {
            orderItemQuantityId : cartItem.id,
            quantity: cartItem.quantity + 1,
            productId: cartItem.product.id.toString()
        }
        dispatch(updateCartThunk(orderItemQuantity));
    }

    const handleDecreaseOneCount = () => {
        console.log("One Quantity Added Decreased in Cart");
        const orderItemQuantity = {
            orderItemQuantityId : cartItem.id,
            quantity: cartItem.quantity - 1,
            productId: cartItem.product.id.toString()
        }
        dispatch(updateCartThunk(orderItemQuantity));
    }

    return (
        <li className="collection-item avatar">
            <img src={ONESTOPGO_API + "/" + cartItem.product.imageUrl} alt="" className="circle"/>
                <span className={'title fw-bold'}>{cartItem.product.name}</span>
            <p>
                <span className={'fw-bold'}>${cartItem.product.price} per <span className={'fw-lighter'}>{cartItem.product.quantity} {cartItem.product.unit}</span> </span><br/>
                {orderState === 'IN_CART' && <span onClick={handleDecreaseOneCount} className={'btn teal white-text'}>-</span>} <span className={'fw-bolder'}>{cartItem.quantity}</span> {orderState === 'IN_CART' && <span onClick={handleIncreaseOneCount} className={'btn smaller teal white-text'}>+</span>} x {cartItem.product.price}$ = <span className={'fw-bolder'}>${roundUpTwoPlaces(cartItem.quantity * cartItem.product.price)}</span>
            </p>
            {orderState === 'IN_CART' && <a onClick={handleRemoveCartClick} href="#" className="secondary-content red-text"><i className="material-icons">remove_shopping_cart</i></a>}
        </li>
    );
};
export default CartItem;