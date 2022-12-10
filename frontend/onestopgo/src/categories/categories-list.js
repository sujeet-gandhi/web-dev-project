import React from "react";
import CategoryItem from "./category-item";

const CategoriesList = ({categoriesArray}) => {
    return(
        <div className="row">
            {
                categoriesArray.map(
                    category =>
                        <CategoryItem key={category.id}  category={category}/>
                )
            }
        </div>
    );
};
export default CategoriesList;