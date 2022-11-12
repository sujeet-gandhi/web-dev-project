import React from "react";
import CategoryItem from "./category-item";

const CategoriesList = ({categoriesArray}) => {
    return(
        <div className="col">
            <ul className="wd-category-list">
                {
                    categoriesArray.map (
                        category =>
                            <CategoryItem key={category.id}  category={category}/>
                    )
                }
            </ul>
        </div>
    );
};
export default CategoriesList;