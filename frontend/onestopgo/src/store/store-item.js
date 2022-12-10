import React from "react";
import {useNavigate} from "react-router";

const ONESTOPGO_API = process.env.REACT_APP_ONESTOPGO_API_BASE;

const StoreItem = ({store}) => {

    const nav = useNavigate();

    const handleOnStoreClicked = () => {
        nav("/stores/" + store.id)
    }

    if (!store) return null;
    return (
        <div className="col-6" style={{cursor: 'pointer'}}>
            <a>
                <div className="card wd-remove-text-decoration"  onClick={handleOnStoreClicked}>
                    <div className="card-content center white-text wd-category-text">
                        <img width={100} height={100} className={'rounded-circle border-3 wd-margin-bottom'} src={ONESTOPGO_API + "/" + store.imageUrl}/>
                        <p className="card-title fw-bolder black-text">{store.name}</p>
                        <p className="green-text">
                            {store.openingTime} - {store.closingTime}<br/>
                            <span className="card-title text-secondary">
                                        {store.type}
                                    </span>
                        </p>
                    </div>
                </div>
            </a>
        </div>
    );
};
export default StoreItem;