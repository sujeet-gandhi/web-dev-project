import React from "react";

const StoreItem = ({store}) => {
    if (!store) return null;
    return (
        <li className="list-group-item">
            <div className="row">
                <div>
                    <img className="rounded-circle" width={150} height={150} src={store.imageUrl} alt={store.name}/>
                </div>
            </div>
        </li>
    );
};
export default StoreItem;