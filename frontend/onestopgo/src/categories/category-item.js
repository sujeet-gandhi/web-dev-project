import React from "react";
import {Link} from "react-router-dom";

const ONESTOPGO_API = process.env.REACT_APP_ONESTOPGO_API_BASE;

const CategoryItem = ({category: category}) => {
    return (
        <div className="col-4 wd-small-padding">
            <Link to={'/category/'+category.id} className="wd-remove-text-decoration">
                <div className="card">
                    <div className="card-image">
                        <img width={400} height={200} src={ONESTOPGO_API + "/" + category.imageUrl}/>
                        <p className="card-title fw-bold mb-5">{category.name} </p>
                    </div>
                </div>
            </Link>
        </div>

    );
};
export default CategoryItem;