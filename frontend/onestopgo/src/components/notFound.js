import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import Lottie from "lottie-react";
import notFound from "../lottie/nothingFound.json";

export const NotFoundView = () => {

    return (
        <>
            <div className={'container w-75'}>
                <center>
                    <Lottie width={100} animationData={notFound} loop={true} />
                    <h3>Could not find what you were looking for</h3>
                </center>
            </div>
        </>
    );
}