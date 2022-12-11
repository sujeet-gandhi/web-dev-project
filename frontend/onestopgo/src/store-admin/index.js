import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {createProductThunk, getAllProductsOfStoreAdminThunk, updateProductThunk} from "../products/product-thunk";
import {getHomeDataThunk} from "../home/home-thunk";
import {getUserDataThunk} from "../login/login-thunk";
import Loader from "../components/loader";
import {LoginSuggest} from "../components/login-prompt";
import {UnauthorisedView} from "../components/unauthorised";

const ONESTOPGO_API = process.env.REACT_APP_ONESTOPGO_API_BASE;

const StoreAdmin = () => {
    const {homeData, loading} = useSelector(state => state.home)
    const {productData, productLoading} = useSelector(state => state.product)
    const {loggedIn, loggedInUser} = useSelector(state => state.login)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getHomeDataThunk())
        dispatch(getUserDataThunk())
        dispatch(getAllProductsOfStoreAdminThunk())
    }, []);

    const [createProductState, setCreateProductState] = useState({
        inStock: true,
    });


    const handleProductDataEntry = ({target}) => {
        let val = target.value;
        let name = target.name;
        if (name === "imageUrl") {
            val = target.files[0]
            name = "image";
        }
        setCreateProductState({
            ...createProductState,
            [name]: val
        })
    }

    const handleQuantityIncrement = (id, incrementAmount) => {
        const incrementQuantityData = {
            productId: id,
            storeQuantity: incrementAmount
        }

        dispatch(updateProductThunk(incrementQuantityData))
    }

    const handleCreateProductSubmit = () => {
        dispatch(createProductThunk(createProductState));
    }

    if (loading) return <Loader />
    else if (!loggedIn) return <div style={{marginTop:80}}> <LoginSuggest pageName={'store admin operations'}/> </div>
    else if (loggedIn && loggedInUser.type !== 'STOREADMIN') return <div style={{marginTop:80}}> <UnauthorisedView/> </div>

    return (
        <>
            <div className="mt-2">
                <div className="row">
                    {
                        loading && <Loader/>
                    }
                    {
                        !loading &&
                        <>
                            <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12">
                                <div className="container border border-1 rounded-3" style={{padding: 20}}>
                                    <div className="fs-2 text-center">
                                        Create Product
                                    </div>
                                    <div className="form-floating mt-2">
                                        <input type="text" className="form-control text-bg-light" id="name"
                                               name="name"
                                               value={createProductState.name} onChange={handleProductDataEntry}/>
                                        <label htmlFor="name">Name</label>
                                    </div>
                                    <div className="form-floating mt-2">
                                        <input type="text" className="form-control text-bg-light" id="description"
                                               name="description"
                                               value={createProductState.description}
                                               onChange={handleProductDataEntry}/>
                                        <label htmlFor="description">Description</label>
                                    </div>
                                    <div className="form-floating mt-2">
                                        <input type="text" className="form-control text-bg-light" id="unit"
                                               name="unit"
                                               value={createProductState.unit} onChange={handleProductDataEntry}/>
                                        <label htmlFor="unit">Unit</label>
                                    </div>
                                    <div className="form-floating mt-2">
                                        <input type="number" className="form-control text-bg-light" id="quantity"
                                               name="quantity"
                                               value={createProductState.quantity}
                                               onChange={handleProductDataEntry}/>
                                        <label htmlFor="quantity">Quantity</label>
                                    </div>
                                    <div className="form-floating mt-2">
                                        <input type="number" className="form-control text-bg-light" id="price"
                                               name="price"
                                               value={createProductState.price} onChange={handleProductDataEntry}/>
                                        <label htmlFor="price">Price</label>
                                    </div>
                                    <div className="form-floating mt-2">
                                        <select className="form-control text-bg-light" id="type" name="type"
                                                onChange={handleProductDataEntry}>
                                            <option value="" selected disabled hidden>Choose Category Here</option>
                                            {
                                                homeData.categories.map((category) =>
                                                    <option value={category.name}>{category.name}
                                                    </option>)
                                            }
                                        </select>
                                        <label htmlFor="type">Type</label>
                                    </div>
                                    <div className="form-floating mt-2">
                                        <input type="number" className="form-control text-bg-light"
                                               id="storeQuantity"
                                               name="storeQuantity"
                                               value={createProductState.storeQuantity}
                                               onChange={handleProductDataEntry}/>
                                        <label htmlFor="storeQuantity">Store Quantity</label>
                                    </div>
                                    <div>
                                        <input type="file" className="form-control text-bg-light" id="imageUrl"
                                               name="imageUrl"
                                               onChange={handleProductDataEntry}/>
                                        <label htmlFor="imageUrl">Product Image</label>
                                    </div>
                                    <div className="text-center">
                                        <button className="btn teal w-50 text-white"
                                                onClick={handleCreateProductSubmit}>Add Product to Store
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-3 col-lg-3 hide-on-med-and-down">
                                {
                                    productLoading && <Loader/>
                                }
                                {
                                    !productLoading &&
                                    <div>
                                        {
                                            productData.map((each) =>
                                                <div>
                                                    <div className="card">
                                                        <div className="card-image">
                                                            <img height={200} src={ONESTOPGO_API + "/" + each.product.imageUrl} className={'fw-bolder'} alt={each.product.name}/>
                                                            <a title={'Add 1 to Quantity'} onClick={() => handleQuantityIncrement(each.product.id, 1)} className="btn-floating halfway-fab waves-effect waves-light teal"><i
                                                                className="material-icons">exposure_plus_1
                                                            </i></a>
                                                            <a title={'Minus 1 to Quantity'} onClick={() => handleQuantityIncrement(each.product.id, -1)} className="btn-floating halfway-fab waves-effect waves-light teal left"><i
                                                                className="material-icons">exposure_neg_1</i></a>
                                                        </div>
                                                        <div className="card-content">
                                                            <p><span className={'card-title fw-bold'}>{each.product.name} </span></p>
                                                            <textarea defaultValue={each.product.description} className={'card-subtitle'}/>
                                                            <br/>
                                                            <label className={'left'}> Price per {each.product.quantity} {each.product.unit} $<input id={'price'} type={'text'} maxLength={2} size={2} defaultValue={each.product.price}/> </label>

                                                            <label className={'right'}>Quantity At Store <input id={'quantity'} defaultValue={each.quantity}  maxLength={2} size={2}/></label>
                                                            <button className={'btn waves-effect waves-light teal text-white right'}>Save</button>
                                                        </div>
                                                    </div>
                                            </div>)
                                        }
                                    </div>
                                }
                            </div>
                        </>
                    }
                </div>
            </div>
        </>
    );
}

export default StoreAdmin;

// <div className="border border-1 rounded-3">
//     <div>Name : {each.product.name}</div>
//     <div>Price : {each.product.price}</div>
//     <div>Item Quantity : {each.product.quantity}</div>
//     <div>Quantity At Store : {each.quantity} : <button
//         className="rounded-pill btn btn-secondary"
//         >+10</button>
//     </div>
//     <img width={150} height={150}
//          src={ONESTOPGO_API + "/" + each.product.imageUrl}
//          alt={each.product.name}/>