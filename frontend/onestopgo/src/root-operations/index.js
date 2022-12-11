import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {StoreItemDetails} from "../store/store-item-details";
import {createStoreThunk, getStoresThunk} from "../store/store-thunk";
import {createUserThunk} from "../user/user-thunk";
import {createCategoriesThunk} from "../categories/category-thunk";
import LocationPicker from "../store-map/location-picker";
import {MDBInput} from "mdb-react-ui-kit";
import {getUserDataThunk} from "../login/login-thunk";
import {LoginSuggest} from "../components/login-prompt";
import {UnauthorisedView} from "../components/unauthorised";
import Loader from "../components/loader";

const RootOperations = () => {
    const {storeData, loading} = useSelector(state => state.store)
    const {userData, _} = useSelector(state => state.user)
    const dispatch = useDispatch();
    const [createStoreState, setCreateStoreState] = useState({
        location: "USE LOCATION PICKER BELOW"
    });
    const [createStoreAdminState, setCreateStoreAdminState] = useState({});
    const [createCategoryState, setCreateCategoryState] = useState({});
    const {loggedIn, loggedInUser, safeDetailsUserLoading, safeDetailsUser} = useSelector(state => state.login)

    useEffect(() => {
        dispatch(getUserDataThunk())
        dispatch(getStoresThunk())
    }, [userData]);

    const handleLocationPick = (map, event, clickDetails) => {
        setCreateStoreState({
            ...createStoreState,
            location: clickDetails.latLng.lat().toString().slice(0, 9) + " " + clickDetails.latLng.lng().toString().slice(0, 9)
        })
    }

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

    if (loading) return <Loader />
    else if (!loggedIn) return <div style={{marginTop:80}}> <LoginSuggest pageName={'root operations'}/> </div>
    else if (loggedIn && loggedInUser.type !== 'ROOT') return <div style={{marginTop:80}}> <UnauthorisedView/> </div>

    return (
        <div className="mt-2">
            <div className="row">
                <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12">
                    <div className="border border-1 ">
                        <div className="ms-2 me-2 mt-2 mb-2 ">
                            <div className="fs-2 text-center ">
                                Create Store
                            </div>
                            <MDBInput wrapperClass='mb-4' placeholder={'Store Name'} label='Name' type='text' id="name" name="name"
                                      value={createStoreState.name} onChange={handleDataEntryStore}/>

                            <div className="input-field mt-2">
                                <input type="button" className="form-control text-bg-light" id="location" name="location"
                                       value={createStoreState.location} disabled/>
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
                                <button className="btn waves-effect waves-light teal white-text" type="submit"
                                        onClick={handleCreateStoreSubmit}>Create Store
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="mt-5 border border-1">
                        <div className="ms-2 me-2 mt-2 mb-2">
                            <div className="fs-2 text-center">
                                Create Store Admin
                            </div>

                            <MDBInput wrapperClass='mb-4' placeholder={'Secret Password for admin'} label='Email' type='email' id="email" name="email"
                                      value={createStoreAdminState.email} onChange={handleDataEntryStoreAdmin}/>

                            <MDBInput wrapperClass='mb-4' placeholder={'Secret Password for admin'} label='Password' type='password' id="password" name="password"
                                      value={createStoreAdminState.password} onChange={handleDataEntryStoreAdmin}/>

                            <MDBInput wrapperClass='mb-4' placeholder={'Admin\'s Address'} label='Address' type='text' id="adminAddress" name="adminAddress"
                                      value={createStoreAdminState.address} onChange={handleDataEntryStoreAdmin}/>

                            <MDBInput wrapperClass='mb-4' placeholder={'Phone Number'} label='Admin Contact' type='tel' id="adminContact" name="adminContact"
                                      value={createStoreAdminState.contact} onChange={handleDataEntryStoreAdmin}/>

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
                                <button className="btn waves-effect waves-light teal white-text"
                                        onClick={handleCreateStoreAdminSubmit}>Create Store Admin
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="mt-5 border border-1">
                        <div className="ms-2 me-2 mt-2 mb-2">
                            <div className="fs-2 text-center">
                                Create Category
                            </div>
                            <MDBInput wrapperClass='mb-4' placeholder={'eg. Grocery'} label='Name' type='text' id="categoryName" name="name"
                                      value={createCategoryState.name} onChange={handleDataEntryCreateCategory}/>

                            <MDBInput wrapperClass='mb-4' placeholder={'eg. Short description'} label='Description' type='text' id="categoryDes" name="description"
                                      value={createCategoryState.description} onChange={handleDataEntryCreateCategory}/>

                            <div>
                                <input type="file" className="form-control text-bg-light" id="categoryImageUrl"
                                       name="imageUrl"
                                       onChange={handleDataEntryCreateCategory}/>
                                <label htmlFor="categoryImageUrl">Category Image URL</label>
                            </div>
                            <div className="text-center">
                                <button className="btn waves-effect waves-light teal white-text"
                                        onClick={handleCreateCategorySubmit}>Create Category
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="mt-4">
                        <div className="ms-2 me-2 mt-2 mb-2">
                            <div className="fs-2 text-center">
                                For Picking Location of Store
                                <LocationPicker clickFunction={handleLocationPick}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-3 scrolling hide-on-med-and-down">
                    {loading && <Loader/>}
                    {!loading &&
                        <>
                            <ul>
                                {storeData.map((store) => <StoreItemDetails key={store.id} store={store}/>)}
                            </ul>
                        </>
                    }
                </div>
            </div>
        </div>
    );
}

export default RootOperations;
