import React from "react";
import StoreItem from "./store-item";

const StoreList = ({storeArray}) => {
    if (!storeArray) return null;
    return(
        <div className="row">
            {
                storeArray.map ((store) =>
                    <StoreItem key={store.id} store={store}/>)
            }
            {/*<ul className="center wd-category-list">*/}
            {/*</ul>*/}
        </div>
    );
};
export default StoreList;