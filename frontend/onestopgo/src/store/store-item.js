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
                    <div className="card-content center white-text">
                        <img width={100} height={100} className={'rounded-circle border border-1'} src={ONESTOPGO_API + "/" + store.imageUrl}/>
                        <p className="card-title fw-bolder black-text">{store.name}</p>
                        <span className="text-secondary">
                                        {store.type}
                                    </span>
                        <p className="green-text">
                            {store.openingTime} - {store.closingTime}<br/>
                        </p>
                    </div>
                </div>
            </a>
        </div>
    );
};
export default StoreItem;