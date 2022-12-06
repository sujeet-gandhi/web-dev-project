import React from "react";
import ProductItem from "./product-item";

const ProductList = ({storeItemQuantityArray}) => {
    if (!storeItemQuantityArray) return null;
    console.log(storeItemQuantityArray)
    return(
        <div className="row">
            {
                storeItemQuantityArray.map ((storeItemQuantity) =>
                    <ProductItem key={storeItemQuantity.id} storeId={storeItemQuantity.storeId} product={storeItemQuantity.product}/>
                )
            }
        </div>
    );
};
export default ProductList;