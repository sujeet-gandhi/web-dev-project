import {useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";
import {getHomeDataThunk} from "../home/home-thunk";
import {StoreItemDetails} from "../store/store-item-details";

const RootOperations = () => {
    const {homeData, loading} = useSelector(state => state.home)
    const dispatch = useDispatch();

    // useEffect(() => {
    //     dispatch(getHomeDataThunk())
    // }, []);

    return (
        <div className="mt-2">
            <div className="row">
                <div className="col-3 scrolling">
                    {loading && <h3>Loading ...</h3>}
                    {!loading &&
                        <>
                            <ul>
                                {homeData.stores.map((store) => <StoreItemDetails key={store.id} store={store}/>)}
                            </ul>
                        </>
                    }
                </div>
                <div className="col-9">
                    <div className="border border-1 ">
                        <div className="ms-2 me-2 mt-2 mb-2">
                            <div className="fs-2 text-center">
                                Create Store
                            </div>
                            <div className="form-floating wd-top-margin-form">
                                <input type="text" className="form-control text-bg-light" id="name" name="name"
                                       value=""/>
                                <label htmlFor="name">Name</label>
                            </div>
                            <div className="form-floating mt-2">
                                <input type="text" className="form-control text-bg-light" id="location" name="location"
                                       value=""/>
                                <label htmlFor="location">Location</label>
                            </div>
                            <div className="form-floating mt-2">
                                <select className="form-control text-bg-light" id="type" name="type">
                                    <option value="SUPERMARKET">SUPERMARKET</option>
                                    <option value="GROCERY">GROCERY</option>
                                    <option value="HARDWARE">HARDWARE</option>
                                </select>
                                <label htmlFor="type">Type</label>
                            </div>
                            <div className="form-floating mt-2">
                                <input type="time" className="form-control text-bg-light" id="openingTime"
                                       name="openingTime"
                                       value=""/>
                                <label htmlFor="openingTime">Opening Time</label>
                            </div>
                            <div className="form-floating mt-2">
                                <input type="time" className="form-control text-bg-light" id="closingTime"
                                       name="closingTime"
                                       value=""/>
                                <label htmlFor="closingTime">Closing Time</label>
                            </div>
                            <div>
                                <input type="file" className="form-control text-bg-light" id="storeImage"
                                       name="storeImage"/>
                                <label htmlFor="storeImage">Store Image</label>
                            </div>
                            <div className="text-center">
                                <button className="rounded-pill w-50">Create Store</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default RootOperations;
