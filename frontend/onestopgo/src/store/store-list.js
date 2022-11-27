import React from "react";
import StoreItem from "./store-item";

const StoreList = ({storeArray}) => {
    if (!storeArray) return null;
    return(
        <div className="col">
            <ul className="wd-category-list">
                {
                    storeArray.map ((store) =>
                        <StoreItem key={store.id} store={store}/>)
                }
            </ul>
        </div>
    );
};
export default StoreList;