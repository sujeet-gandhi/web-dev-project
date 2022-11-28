import React from "react";
import {addToCartThunk} from "../cart/cart-thunk";
import {useDispatch} from "react-redux";

const ONESTOPGO_API = process.env.REACT_APP_ONESTOPGO_API_BASE;

const ProductItem = ({product, storeId}) => {

    const dispatch = useDispatch();

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
        <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-6 col-sm-6">
            <div className="card">
                <div className="card-image">
                    <img height={200} src={ONESTOPGO_API + "/" + product.imageUrl} className={'fw-bolder'} alt={product.name}/>
                        <span className="card-title fw-bolder">{product.name}</span>
                        <a onClick={handleAddToCartClick} className="btn-floating halfway-fab waves-effect waves-light teal"><i
                            className="material-icons">add_shopping_cart</i></a>
                </div>
                <div className="card-content">
                    <p><span className={'fw-bold'}>{product.name} <span className={'fw-lighter'}> · {product.type}</span> </span></p>
                    <p><span className={'fw-bold'}>${product.price} / <span className={'fw-lighter'}>{product.quantity} {product.unit}</span> </span></p>
                </div>
            </div>
        </div>
    );
};
export default ProductItem;