import React from "react";

const ONESTOPGO_API = process.env.REACT_APP_ONESTOPGO_API_BASE;

const ProductItem = ({product}) => {
    if (!product) return null;
    return (
        <li className="list-group-item">
            <div className="row">
                <div>
                    <img width={150} height={150} src={ONESTOPGO_API + "/" + product.imageUrl} alt={product.name}/>
                </div>
                <p className={'fw-bold'}>{product.price}</p>
                <p className={'fw-bold'}>{product.name}</p>
                <p className={'fw-lighter'}>${product.type}</p>
                <p className={'fw-lighter'}>{product.quantity} {product.unit}</p>
            </div>
        </li>
    );
};
export default ProductItem;