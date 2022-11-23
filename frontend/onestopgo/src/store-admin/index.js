import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {getStoresThunk} from "../store/store-thunk";
import {createProductThunk} from "../products/product-thunk";

const StoreAdmin = () => {
    const {homeData, loading} = useSelector(state => state.home)
    const [createProductState, setCreateProductState] = useState({
        storeId: 9, // walmart
        inStock: true,
    });
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getStoresThunk())
    }, []);


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

    const handleCreateProductSubmit = () => {
        dispatch(createProductThunk(createProductState));
    }

    return (
        <>
            {
                loading &&
                <h1>Loading...</h1>
            }
            {
                !loading &&
                <>
                    <div className="mt-5 border border-1">
                        <div className="ms-2 me-2 mt-2 mb-2">
                            <div className="fs-2 text-center">
                                Create Store Admin
                            </div>
                            <div className="form-floating mt-2">
                                <input type="text" className="form-control text-bg-light" id="name" name="name"
                                       value={createProductState.name} onChange={handleProductDataEntry}/>
                                <label htmlFor="name">Name</label>
                            </div>
                            <div className="form-floating mt-2">
                                <input type="text" className="form-control text-bg-light" id="description" name="description"
                                       value={createProductState.description} onChange={handleProductDataEntry}/>
                                <label htmlFor="description">Description</label>
                            </div>
                            <div className="form-floating mt-2">
                                <input type="text" className="form-control text-bg-light" id="unit" name="unit"
                                       value={createProductState.unit} onChange={handleProductDataEntry}/>
                                <label htmlFor="unit">Unit</label>
                            </div>
                            <div className="form-floating mt-2">
                                <input type="number" className="form-control text-bg-light" id="quantity" name="quantity"
                                       value={createProductState.quantity} onChange={handleProductDataEntry}/>
                                <label htmlFor="quantity">Quantity</label>
                            </div>
                            <div className="form-floating mt-2">
                                <input type="number" className="form-control text-bg-light" id="price" name="price"
                                       value={createProductState.price} onChange={handleProductDataEntry}/>
                                <label htmlFor="price">Price</label>
                            </div>
                            <div className="form-floating mt-2">
                                <select className="form-control text-bg-light" id="type" name="type"
                                        onChange={handleProductDataEntry}>
                                    <option value="" selected disabled hidden>Choose Category Here</option>
                                    {
                                        homeData.categories.map((category) =>
                                            <option value={category.id}>{category.name}
                                            </option>)
                                    }
                                </select>
                                <label htmlFor="type">Type</label>
                            </div>
                            <div className="form-floating mt-2">
                                <input type="number" className="form-control text-bg-light" id="storeQuantity" name="storeQuantity"
                                       value={createProductState.storeQuantity} onChange={handleProductDataEntry}/>
                                <label htmlFor="storeQuantity">Store Quantity</label>
                            </div>
                            <div>
                                <input type="file" className="form-control text-bg-light" id="imageUrl"
                                       name="imageUrl"
                                       onChange={handleProductDataEntry}/>
                                <label htmlFor="imageUrl">Product Image</label>
                            </div>
                            <div className="text-center">
                                <button className="rounded-pill w-50" onClick={handleCreateProductSubmit}>Create Product Admin</button>
                            </div>
                        </div>
                    </div>
                </>
            }
        </>
    );
}

export default StoreAdmin;