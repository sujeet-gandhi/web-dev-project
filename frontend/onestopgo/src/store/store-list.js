import React from "react";
import StoreItem from "./store-item";

const StoreList = ({storeArray}) => {
    if (!storeArray) return null;
    return(
        <div className="col m3 l2">
            <ul className="wd-horizontal-list center">
                {
                    storeArray.map ((store) => <StoreItem key={store.id} store={store}/>)
                }
            </ul>
        </div>
    );
};
export default StoreList;