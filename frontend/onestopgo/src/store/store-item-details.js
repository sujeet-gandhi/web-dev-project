import React from "react";

const ONESTOPGO_API = process.env.REACT_APP_ONESTOPGO_API_BASE;


export const StoreItemDetails = ({store}) => {
    return (
        <div className="row">
            <div className="card">
                <div className="card-image">
                    <img src={ONESTOPGO_API + "/" + store.imageUrl}/>
                </div>
                <div className="card-content">
                    <div className="fs-5 fw-bold">
                        {store.name}
                    </div>
                    <div >
                        <i className="material-icons me-1 tiny text-danger">location_on</i>{store.location}
                    </div>
                    <div >
                        <i className="material-icons me-1 tiny">store</i>{store.type}
                    </div>
                    <div >
                        <ul>
                            {store.storeAdmins && store.storeAdmins.map((each) =>
                                <li><i className="material-icons me-1 tiny">mail</i>{each.email}</li>)}
                        </ul>
                    </div>
                </div>
            </div>
        </div>

    );
}

