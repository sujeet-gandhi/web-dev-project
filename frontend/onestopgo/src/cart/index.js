import {useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";
import {getCartThunk, placeOrderThunk} from "./cart-thunk";
import CartList from "./cart-list";
import Loader from "../components/loader";
import {getUserDataThunk} from "../login/login-thunk";
import {LoginSuggest} from "../components/login-prompt";
import {NotFoundView} from "../components/notFound";

export const CartComponent = () => {
    const {cartData, loading} = useSelector(state => state.cart)
    const {loggedIn, loggedInUser} = useSelector(state => state.login)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCartThunk())
        dispatch(getUserDataThunk())
    }, []);

    const handleOnCheckoutClicked = () => {
        console.log('Placing order for: ' + cartData.cart.id.toString())
        dispatch(placeOrderThunk(cartData.cart.id.toString()))
    }

    if (loading) return <Loader/>
    if (!loading && loggedIn && cartData.cart.items.length === 0) return <NotFoundView text={'No Items in your cart'}/>
    else if (!loggedIn) return <LoginSuggest pageName={'Shopping Cart'}/>

    return (
        <>
            {loggedIn && loggedInUser.type === "USER" &&
                <div className={'card wd-cart-item'}>
                    <CartList cartItems={cartData.cart.items} userType={loggedInUser.type}/>
                    {
                        (loggedInUser.type === "USER") &&
                        <div>
                            <h4 className={'right'}>Total: ${cartData.cart.orderTotal}</h4>
                        </div>
                    }
                    <div>
                        {
                            (loggedInUser.type === "USER") &&
                            <button onClick={handleOnCheckoutClicked} className="btn waves-effect waves-light teal white-text wd-margin-top-bottom right" type="submit" name="action">
                                Checkout <i className="material-icons right">shopping_cart</i>
                            </button>
                        }
                    </div>
                </div>
            }
        </>
    );
}
