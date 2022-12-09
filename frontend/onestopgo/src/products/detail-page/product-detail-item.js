import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router";
import {getProductFromIdThunk} from "../product-thunk";
import Loader from "../../components/loader";

const ONESTOPGO_API = process.env.REACT_APP_ONESTOPGO_API_BASE;

const ProductDetailItem = () => {
    const {singleProductLoading, singleProductData} = useSelector(state => state.product)
    const dispatch = useDispatch();
    const {productId} = useParams();

    useEffect(() => {
        console.log(productId)
        dispatch(getProductFromIdThunk(productId))
    }, []);

    return (<>
            {
                singleProductLoading && <Loader/>
            }

            {!singleProductLoading && <div>
                <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12">
                    <div className="card">
                        <div className="card-image">
                            <img width={400} height={600} src={ONESTOPGO_API + "/" + singleProductData.imageUrl}
                                 className={'fw-bolder'} alt={singleProductData.name}/>
                        </div>
                    </div>

                    <div className="card">
                        <div className="card-content row">
                            <div className={'w-75'}>
                                <p><span className={'card-title fw-bolder'}>{singleProductData.name}</span></p>
                                <p><span className={'card-title fw-lighter'}>{singleProductData.type}</span></p>
                                <p><span className={'card-title fw-bold'}>${singleProductData.price} / <span
                                    className={'fw-lighter'}>{singleProductData.quantity} {singleProductData.unit}</span> </span></p>
                            </div>
                        </div>
                    </div>

                    <div className="card">
                        <div className="card-content">
                            <p><span className={'card-title'}>{singleProductData.description}</span></p>
                        </div>
                    </div>


                </div>
            </div>
            }
        </>
    );
};
export default ProductDetailItem;