import React from "react";
import {Link} from "react-router-dom";

const ONESTOPGO_API = process.env.REACT_APP_ONESTOPGO_API_BASE;

const CategoryItem = ({category: category}) => {
    return (
        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
            <Link to={'/category/'+category.id} className="wd-remove-text-decoration">
                <div className="card">
                    <div className="card-image">
                        <img className="img-fluid" src="/images/stock-grocery.jpeg"/>
                        <span className="card-title fw-bold mb-5">{category.name} </span>
                        <span className="card-title">{category.description}</span>
                    </div>
                </div>
            </Link>
        </div>

    );
};
export default CategoryItem;