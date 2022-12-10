import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import Lottie from "lottie-react";
import noAccess from "../lottie/noaccess.json";

export const UnauthorisedView = () => {

    return (
        <>
            <div className={'container w-75'}>
                <center>
                    <Lottie width={100} animationData={noAccess} loop={true} />
                    <h3>You are not authorised to view this page</h3>
                </center>
            </div>
        </>
    );
}