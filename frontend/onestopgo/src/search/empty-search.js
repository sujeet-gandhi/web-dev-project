import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import Lottie from "lottie-react";
import search from "../lottie/search.json";

export const EmptySearchView = () => {

    return (
        <div className={'container w-75'}>
            <center>
                <Lottie width={100} animationData={search} loop={true} />
                <h3>Search for Products, Stores and Categories</h3>
            </center>
        </div>
    );
}