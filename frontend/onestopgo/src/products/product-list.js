import React from "react";
import ProductItem from "./product-item";

const ProductList = ({storeItemQuantityArray, userType}) => {
    if (!storeItemQuantityArray) return null;
    console.log(storeItemQuantityArray)
    return(
        <div className="row">
            {
                storeItemQuantityArray.map ((storeItemQuantity) =>
                    <ProductItem key={storeItemQuantity.id} storeId={storeItemQuantity.storeId} product={storeItemQuantity.product} userType={userType}/>
                )
            }
        </div>
    );
};
export default ProductList;