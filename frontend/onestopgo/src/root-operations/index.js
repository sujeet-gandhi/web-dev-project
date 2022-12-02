import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {StoreItemDetails} from "../store/store-item-details";
import {createStoreThunk, getStoresThunk} from "../store/store-thunk";
import {createUserThunk} from "../user/user-thunk";
import {createCategoriesThunk} from "../categories/category-thunk";

const RootOperations = () => {
    const {storeData, loading} = useSelector(state => state.store)
    const {userData, _} = useSelector(state => state.user)
    const dispatch = useDispatch();
    const [createStoreState, setCreateStoreState] = useState({});
    const [createStoreAdminState, setCreateStoreAdminState] = useState({});
    const [createCategoryState, setCreateCategoryState] = useState({});

    useEffect(() => {
        dispatch(getStoresThunk())
    }, [userData]);

    const handleDataEntryStore = ({target}) => {
        let val = target.value;
        let name = target.name;
        if (name === "imageUrl") {
            val = target.files[0]
            name = "image";
        }
        setCreateStoreState({
            ...createStoreState,
            [name]: val
        })
    }

    const handleDataEntryStoreAdmin = ({target}) => {
        let key = target.name;
        let val = target.value;
        if (key === "adminContact") {
            key = "contact";
        } else if (key === "adminAddress") {
            key = "address";
        }
        if (key === "imageUrl") {
            val = target.files[0]
            key = "image";
        }
        setCreateStoreAdminState({
            ...createStoreAdminState,
            [key]: val
        })
    }

    const handleDataEntryCreateCategory = ({target}) => {
        let val = target.value;
        let name = target.name;
        if (name === "imageUrl") {
            val = target.files[0]
            name = "image";
        }
        setCreateCategoryState({
            ...createCategoryState,
            [name]: val
        })
    }

    const handleCreateCategorySubmit = () => {
        dispatch(createCategoriesThunk(createCategoryState))
    }

    const handleCreateStoreSubmit = () => {
        dispatch(createStoreThunk(createStoreState))
    }

    const handleCreateStoreAdminSubmit = () => {
        dispatch(createUserThunk(createStoreAdminState))
    }

    return (
        <div className="mt-2">
            <div className="row">
                <div className="col-3 scrolling">
                    {loading && <h3>Loading ...</h3>}
                    {!loading &&
                        <>
                            <ul>
                                {storeData.map((store) => <StoreItemDetails key={store.id} store={store}/>)}
                            </ul>
                        </>
                    }
                </div>
                <div className="col-9">
                    <div className="border border-1 ">
                        <div className="ms-2 me-2 mt-2 mb-2 ">
                            <div className="fs-2 text-center ">
                                Create Store
                            </div>
                            <div className="input-field wd-top-margin-form ">
                                <input type="text" className="form-control text-bg-light" id="name" name="name"
                                       value={createStoreState.name}  onChange={handleDataEntryStore}/>
                                <label htmlFor="name">Name</label>
                            </div>
                            <div className="input-field mt-2">
                                <input type="text" className="form-control text-bg-light" id="location" name="location"
                                       value={createStoreState.location} onChange={handleDataEntryStore}/>
                                <label htmlFor="location">Location</label>
                            </div>
                            <div className="form-floating mt-2">
                                <select className="form-control text-bg-light" id="type" name="type"
                                        onChange={handleDataEntryStore}>
                                    <option value="" selected disabled hidden>Choose Type Here</option>
                                    <option value="SUPERMARKET">SUPERMARKET</option>
                                    <option value="GROCERY">GROCERY</option>
                                    <option value="HARDWARE">HARDWARE</option>
                                </select>
                                <label htmlFor="type">Type</label>
                            </div>
                            <div className="row mt-2">
                                <div className="col-6 form-floating">
                                    <input type="time" className="form-control text-bg-light" id="openingTime"
                                           name="openingTime"
                                           value={createStoreState.openingTime} onChange={handleDataEntryStore}/>
                                    <label htmlFor="openingTime">Opening Time</label>
                                </div>
                                <div className="col-6 form-floating">
                                    <input type="time" className="form-control text-bg-light" id="closingTime"
                                           name="closingTime"
                                           value={createStoreState.closingTime} onChange={handleDataEntryStore}/>
                                    <label htmlFor="closingTime">Closing Time</label>
                                </div>
                            </div>
                            <div>
                                <input type="file" className="form-control text-bg-light" id="imageUrl"
                                       name="imageUrl"
                                       onChange={handleDataEntryStore}/>
                                <label htmlFor="imageUrl">Store Image</label>
                            </div>
                            <div className="text-center">
                                <button className="btn waves-effect waves-light" type="submit" onClick={handleCreateStoreSubmit}>Create Store
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="mt-5 border border-1">
                        <div className="ms-2 me-2 mt-2 mb-2">
                            <div className="fs-2 text-center">
                                Create Store Admin
                            </div>
                            <div className="input-field ">
                                <input type="email" className="form-control text-bg-light" id="email" name="email"
                                       value={createStoreAdminState.email} onChange={handleDataEntryStoreAdmin}/>
                                <label htmlFor="email">Email</label>
                            </div>
                            <div className="input-field">
                                <input type="text" className="form-control text-bg-light" id="password" name="password"
                                       value={createStoreAdminState.password} onChange={handleDataEntryStoreAdmin}/>
                                <label htmlFor="password">Password</label>
                            </div>
                            <div className="input-field">
                                <input type="text" className="form-control text-bg-light" id="adminAddress"
                                       name="adminAddress"
                                       value={createStoreAdminState.address} onChange={handleDataEntryStoreAdmin}/>
                                <label htmlFor="adminAddress">Address</label>
                            </div>
                            <div className="input-field mt-2">
                                <input type="text" className="form-control text-bg-light" id="adminContact"
                                       name="adminContact"
                                       value={createStoreAdminState.contact} onChange={handleDataEntryStoreAdmin}/>
                                <label htmlFor="adminContact">Admin Contact</label>
                            </div>
                            {!loading &&
                                <div className="form-floating mt-2">
                                    <select className="form-control text-bg-light" id="storeId" name="storeId"
                                            onChange={handleDataEntryStoreAdmin}>
                                        <option value="" selected disabled hidden>Choose Store Here</option>
                                        {
                                            storeData.map((store) =>
                                                <option value={store.id}>{store.name}
                                                </option>)
                                        }
                                    </select>
                                    <label htmlFor="storeId">Store</label>
                                </div>
                            }
                            <div>
                                <input type="file" className="form-control text-bg-light mt-2" id="storeAdminImage"
                                       name="imageUrl"
                                       onChange={handleDataEntryStoreAdmin}/>
                                <label htmlFor="storeAdminImage">Store Admin Image</label>
                            </div>
                            <div className="text-center">
                                <button className="btn waves-effect waves-light" onClick={handleCreateStoreAdminSubmit}>Create Store Admin</button>
                            </div>
                        </div>
                    </div>

                    <div className="mt-5 border border-1">
                        <div className="ms-2 me-2 mt-2 mb-2">
                            <div className="fs-2 text-center">
                                Create Category
                            </div>
                            <div className="input-field wd-top-margin-form">
                                <input type="text" className="form-control text-bg-light" id="categoryName" name="name"
                                       value={createCategoryState.name} onChange={handleDataEntryCreateCategory}/>
                                <label htmlFor="categoryName">Name</label>
                            </div>
                            <div className="input-field wd-top-margin-form">
                                <input type="text" className="form-control text-bg-light" id="categoryDes" name="description"
                                       value={createCategoryState.description} onChange={handleDataEntryCreateCategory}/>
                                <label htmlFor="categoryDes">Description</label>
                            </div>
                            <div>
                                <input type="file" className="form-control text-bg-light" id="categoryImageUrl"
                                       name="imageUrl"
                                       onChange={handleDataEntryCreateCategory}/>
                                <label htmlFor="categoryImageUrl">Category Image URL</label>
                            </div>
                            <div className="text-center">
                                <button className="btn waves-effect waves-light" onClick={handleCreateCategorySubmit}>Create Category</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default RootOperations;
