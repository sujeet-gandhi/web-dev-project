import React from "react";
import {Link} from "react-router-dom";

const ONESTOPGO_API = process.env.REACT_APP_ONESTOPGO_API_BASE;

const CategoryItem = ({category: category}) => {
    return (
            <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                <Link to={'/category/'+category.id}>
                    <div className="card teal lighten-2 wd-remove-text-decoration">
                        <div className="card-content center white-text wd-category-text">
                            <img src={ONESTOPGO_API + "/" + category.imageUrl} className="mh-100 mw-100 rounded rounded-circle"/>
                            <span className="card-title fw-bold">{category.name}</span>
                            <span>{category.description}</span>
                        </div>
                    </div>
                </Link>
            </div>
    );
};
export default CategoryItem;