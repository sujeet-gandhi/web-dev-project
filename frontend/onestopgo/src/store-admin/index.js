import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {createProductThunk, getAllProductsOfStoreAdminThunk, updateProductThunk} from "../products/product-thunk";
import {getHomeDataThunk} from "../home/home-thunk";
import {getUserDataThunk} from "../login/login-thunk";

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

    return (
        <>
            <div className="mt-2">
                <div className="row">
                    {
                        loading &&
                        <h1>Loading...</h1>
                    }
                    {
                        !loading &&
                        <>
                            <div className="col-3">
                                {
                                    productLoading && <h1>Products Loading...</h1>
                                }
                                {
                                    !productLoading &&
                                    <div className="mt-5">
                                        {
                                            productData.map((each) => <div className="border border-1">
                                                <div>Name : {each.product.name}</div>
                                                <div>Price : {each.product.price}</div>
                                                <div>Item Quantity : {each.product.quantity}</div>
                                                <div>Quantity At Store : {each.quantity} : <button
                                                    className="rounded-pill"
                                                    onClick={() => handleQuantityIncrement(each.product.id, 10)}>+10</button>
                                                </div>
                                                <img width={150} height={150}
                                                     src={ONESTOPGO_API + "/" + each.product.imageUrl}
                                                     alt={each.product.name}/>
                                            </div>)
                                        }
                                    </div>
                                }
                            </div>
                            <div className="col-9">
                                <div className="mt-5 border border-1">
                                    <div className="ms-2 me-2 mt-2 mb-2">
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
                                            <button className="rounded-pill w-50"
                                                    onClick={handleCreateProductSubmit}>Create
                                                Product
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    }
                </div>
            </div>
        </>
    );
}

export default StoreAdmin;