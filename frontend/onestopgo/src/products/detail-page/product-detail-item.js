import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addToCartThunk} from "../../cart/cart-thunk";
import {useLocation} from "react-router";
import {getUserDataThunk} from "../../login/login-thunk";

const ONESTOPGO_API = process.env.REACT_APP_ONESTOPGO_API_BASE;

const ProductDetailItem = () => {
    const [product, setProduct] = useState(null);
    const {loggedIn, loggedInUser} = useSelector(state => state.login)
    const [storeId, setStoreId] = useState(0);
    const dispatch = useDispatch();
    const location = useLocation();

    useEffect(() => {
        setProduct(location.state.product);
        dispatch(getUserDataThunk())
    }, []);

    const handleAddToCartClick = () => {
        console.log("AddToCart Clicked")
        const orderItemQuantity = {
            orderItemQuantityId : null,
            storeId: storeId,
            quantity: 1,
            productId: product.id.toString()
        }
        dispatch(addToCartThunk(orderItemQuantity))
    }

    if (!product) return null;
    return (
        <div>
            <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12">
                <div className="card">
                    <div className="card-image">
                        <img width={400} height={600} src={ONESTOPGO_API + "/" + product.imageUrl} className={'fw-bolder'} alt={product.name}/>
                    </div>
                </div>

                <div className="card">
                    <div className="card-content row">
                        <div className={'w-75'}>
                            <p><span className={'card-title fw-bolder'}>{product.name}</span></p>
                            <p><span className={'card-title fw-lighter'}>{product.type}</span></p>
                            <p><span className={'card-title fw-bold'}>${product.price} / <span className={'fw-lighter'}>{product.quantity} {product.unit}</span> </span></p>
                        </div>
                        <div className={'w-25'}>
                            {
                                (loggedIn && loggedInUser.type === "USER") && <a onClick={handleAddToCartClick} className="btn-floating btn-large waves-effect waves-light teal right"><i
                                    className="material-icons">add_shopping_cart</i></a>
                            }
                        </div>
                    </div>
                </div>

                <div className="card">
                    <div className="card-content">
                        <p><span className={'card-title'}>{product.description}</span></p>
                    </div>
                </div>



            </div>
        </div>
    );
};
export default ProductDetailItem;