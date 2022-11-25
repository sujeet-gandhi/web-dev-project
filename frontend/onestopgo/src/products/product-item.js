import React from "react";

const ONESTOPGO_API = process.env.REACT_APP_ONESTOPGO_API_BASE;

const ProductItem = ({product}) => {
    if (!product) return null;
    // ONESTOPGO_API + "/" + product.imageUrl
    return (
        <li className="list-group-item wd-small-padding">
            <div className="row">
                <div>
                    <img className={'border-5'} width={180} height={180} src={'../images/shop.jpg'} alt={product.name}/>
                </div>
                <span className={'fw-bold'}>{product.name} <span className={'fw-lighter'}> · {product.type}</span> </span>
                <span className={'fw-bold'}>${product.price} / <span className={'fw-lighter'}>{product.quantity} {product.unit}</span> </span>
            </div>
            <a className="waves-effect waves-light btn">Add to Cart</a>
        </li>
    );
};
export default ProductItem;