import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import Lottie from "lottie-react";
import notFound from "../lottie/nothingFound.json";

export const NotFoundView = ({text}) => {

    return (
        <>
            <div className={'container w-75'}>
                <center>
                    <Lottie width={100} animationData={notFound} loop={true} />
                    <h3>{text}</h3>
                </center>
            </div>
        </>
    );
}