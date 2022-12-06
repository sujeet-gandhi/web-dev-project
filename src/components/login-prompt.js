import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import Lottie from "lottie-react";
import login from "../lottie/login.json";

export const LoginSuggest = ({pageName}) => {

    return (
        <>
            <div className={'container w-75'}>
                <center>
                    <Lottie width={100} animationData={login} loop={true} />
                    <h3>Login to view your {pageName}</h3>
                </center>
            </div>
        </>
    );
}