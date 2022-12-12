import React from "react";
import {addToCartThunk} from "../cart/cart-thunk";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router";

const ONESTOPGO_API = process.env.REACT_APP_ONESTOPGO_API_BASE;

const ProductItem = ({product, storeId, userType}) => {

    const dispatch = useDispatch();
    const nav = useNavigate();

    const handleOnProductClicked = () => {
        nav("/products/detail/" + product.id)
    }

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
        <div style={{cursor: 'pointer'}} className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
            <div className="card">
                <div className="card-image">
                    <img onClick={handleOnProductClicked} width={300} height={300} src={ONESTOPGO_API + "/" + product.imageUrl} className={'fw-bolder'} alt={product.name}/>
                    {
                        (userType === "USER") && <a onClick={handleAddToCartClick} className="btn-floating halfway-fab waves-effect waves-light teal"><i
                            className="material-icons">add_shopping_cart</i></a>
                    }
                </div>
                <div onClick={handleOnProductClicked} className="card-content">
                    <p><span className={'card-title fw-bold'}>{product.name} </span></p>
                    <p><span className={'fw-bold'}>${product.price} / <span className={'fw-lighter'}>{product.quantity} {product.unit}</span> </span></p>
                </div>
            </div>
        </div>
    );
};
export default ProductItem;