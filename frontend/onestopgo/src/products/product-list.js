import React from "react";
import ProductItem from "./product-item";

const ProductList = ({storeItemQuantityArray}) => {
    if (!storeItemQuantityArray) return null;
    console.log(storeItemQuantityArray)
    return(
        <div className="col">
            <ul className="wd-category-list">
                {
                    storeItemQuantityArray.map ((storeItemQuantity) =>
                        <ProductItem key={storeItemQuantity.id} storeId={storeItemQuantity.storeId} product={storeItemQuantity.product}/>
                    )
                }
            </ul>
        </div>
    );
};
export default ProductList;