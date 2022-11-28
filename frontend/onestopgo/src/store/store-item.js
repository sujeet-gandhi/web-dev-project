import React from "react";
import {Link} from "react-router-dom";

const ONESTOPGO_API = process.env.REACT_APP_ONESTOPGO_API_BASE;

const StoreItem = ({store}) => {
    if (!store) return null;
    return (
            <div className="col-xxl-2 col-xl-2 col-lg-2 col-md-6 col-sm-6">
                <div className="card-panel">
                    <Link to={'/store'}>
                        <div className={'col center'}>
                                <img width={100} height={100} className={'rounded-circle border-3 wd-margin-bottom'} src={ONESTOPGO_API + "/" + store.imageUrl}/>
                                <p className="card-title fw-bolder black-text">{store.name}</p>
                                <p className="green-text">
                                    {store.openingTime} - {store.closingTime}<br/>
                                    <span className="card-title text-secondary">
                                        {store.type}
                                    </span>
                                </p>
                            </div>
                    </Link>
                </div>
            </div>
    );
};
export default StoreItem;