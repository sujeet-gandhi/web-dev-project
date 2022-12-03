import React, {useState} from 'react';
import {
    MDBBtn,
    MDBCheckbox,
    MDBCol,
    MDBContainer,
    MDBInput,
    MDBRow,
    MDBTabs,
    MDBTabsContent,
    MDBTabsItem,
    MDBTabsLink,
    MDBTabsPane
} from 'mdb-react-ui-kit';
import {useDispatch, useSelector} from "react-redux";
import {logoutThunk} from "./logout-thunk";

export const Logout = () => {
    const dispatch= useDispatch();

    const handleSubmit = event => {
        console.log('handleSubmit ran');
        event.preventDefault();
        dispatch(logoutThunk());
    };
    return (
        <MDBContainer className="p-3 my-5 w-50">
            <MDBTabsContent>
                    <div className="text-center mb-3">
                        <p>Are you sure you want to log out?</p>
                    </div>

                    <MDBBtn onClick={handleSubmit} className="mb-4 w-100" style={{backgroundColor: "teal"}}>Log out</MDBBtn>
            </MDBTabsContent>
        </MDBContainer>
    );
}
