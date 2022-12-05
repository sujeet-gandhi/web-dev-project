import {useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";
import {useNavigate} from "react-router";
import {getCartThunk, placeOrderThunk} from "./cart-thunk";
import CartList from "./cart-list";
import Loader from "../components/loader";

export const CartComponent = () => {
    const {cartData, loading} = useSelector(state => state.cart)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCartThunk())
    }, []);

    const nav = useNavigate()

    const handleOnOrdersClicked = () => {
        nav('/orders')
    }

    const handleOnCheckoutClicked = () => {
        console.log('Placing order for: '+cartData.cart.id.toString())
        dispatch(placeOrderThunk(cartData.cart.id.toString()))
        handleOnOrdersClicked()
    }

    if (!cartData) return null;
    return (
        <>
            {loading && <Loader/>}
            {!loading &&
                <div className={'card wd-cart-item'}>
                    <CartList cartItems={cartData.cart.items} />
                    <div>
                        <button onClick={handleOnCheckoutClicked} className="btn waves-effect waves-light teal white-text wd-margin-top-bottom right" type="submit" name="action">
                            Checkout <i className="material-icons right">shopping_cart</i>
                        </button>
                    </div>
                </div>
            }
        </>
    );
}
