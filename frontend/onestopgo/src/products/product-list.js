import React from "react";
import ProductItem from "./product-item";

const ProductList = ({productArray}) => {
    if (!productArray) return null;
    return(
        <div className="col m3 l2">
            <ul className="list-group wd-horizontal-list">
                {
                    productArray.map ((product) => <ProductItem key={product.id} product={product}/>)
                }
            </ul>
        </div>
    );
};
export default ProductList;