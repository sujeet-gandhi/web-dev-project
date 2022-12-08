import {useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";
import {useNavigate} from "react-router";
import {getCartThunk, placeOrderThunk} from "./cart-thunk";
import CartList from "./cart-list";
import Loader from "../components/loader";
import {getUserDataThunk} from "../login/login-thunk";
import {LoginSuggest} from "../components/login-prompt";

export const CartComponent = () => {
    const {cartData, loading} = useSelector(state => state.cart)
    const {loggedIn, loggedInUser} = useSelector(state => state.login)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCartThunk())
        dispatch(getUserDataThunk())
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

    if (!loggedIn) return <LoginSuggest pageName={'Shopping Cart'} />;
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
