import React from "react";
import {Link} from "react-router-dom";

const ONESTOPGO_API = process.env.REACT_APP_ONESTOPGO_API_BASE;

const CategoryItem = ({category: category}) => {
    return (
            <div className="col-sm">
                <Link to={'/category/'+category.id}>
                    <div className="card teal wd-remove-text-decoration">
                        <div className="card-content center white-text wd-category-text">
                            <span className="card-title fw-bold">{category.name}</span>
                            <span>{category.description}</span>
                        </div>
                    </div>
                </Link>
            </div>
    );
};
export default CategoryItem;