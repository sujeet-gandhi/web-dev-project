import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import Lottie from "lottie-react";
import loader from "../lottie/loader.json";

function Loader() {
    return (
        <>
            <div className={'container w-50'}>
                <center>
                    <Lottie width={100} animationData={loader} loop={true} />
                </center>
            </div>
        </>
    );

}

export default Loader