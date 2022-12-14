import React, {useEffect, useState} from "react";
import "../index.css"
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router";
import {getUserDataThunk, updateUserThunk} from "../../login/login-thunk";
import {MDBInput} from "mdb-react-ui-kit";
import {UnauthorisedView} from "../../components/unauthorised";

const ONESTOPGO_API = process.env.REACT_APP_ONESTOPGO_API_BASE;

const EditProfileComponent = () => {

    const {loggedIn, loggedInUser} = useSelector(state => state.login)
    const [profilePic, setImage] = useState(null)
    const dispatch = useDispatch();
    const nav = useNavigate();
    let updatedUser = {...loggedInUser};

    useEffect(() => {
        dispatch(getUserDataThunk())
    }, [])

    const handleFieldChanges = (event) => {
        let jsonKey = event.target.id;
        let jsonValue = event.target.value;
        updatedUser = {
            ...updatedUser,
            [jsonKey]: jsonValue
        }
    }

    const updateProfile = () => {
        if (profilePic !== null) {
            updatedUser = {
                ...updatedUser,
                image: profilePic
            }
        }
        dispatch(updateUserThunk(updatedUser))
        // nav('/profile/' + updatedUser.id)
    }

    if (!loggedIn) return <UnauthorisedView/>

    return (
        <>
            <div className="card center">
                <div className="row center" style={{padding: 30}}>
                    <div className="rounded-circle">

                        {updatedUser.imageUrl &&
                            <img className="rounded-circle wd-border"
                                 src={ONESTOPGO_API + "/" + updatedUser.imageUrl} width={250} height={250}
                                 alt={'profile-pic'}/>}

                        {!updatedUser.imageUrl &&
                            <img className="rounded-circle wd-border"
                                 src={ONESTOPGO_API + "/images/user/empty_profile.jpg"} width={250} height={250}
                                 alt={'profile-pic'}/>}

                    </div>

                    <MDBInput wrapperClass='mb-4' label='Profile Picture' type='file' onChange={event => setImage(event.target.files[0])}/>

                    <div className="form-floating mb-3 w-50">
                        <input type="text" className="form-control" id="name" name="name" placeholder="John Doe"
                               defaultValue={updatedUser.name} onChange={handleFieldChanges}/>
                        <label htmlFor="name">Name</label>
                    </div>
                    <div className="form-floating mb-3 w-50">
                        <input type="text" className="form-control" id="email" name="email" placeholder="john.doe@onestopgo.com"
                               defaultValue={updatedUser.email} onChange={handleFieldChanges}/>
                        <label htmlFor="email">Email</label>
                    </div>
                    <div className="form-floating mb-3 w-50">
                        <input type="text" className="form-control" id="address" name="address" placeholder="NYC, NY, USA"
                               defaultValue={updatedUser.address} onChange={handleFieldChanges}/>
                        <label htmlFor="address">Address</label>
                    </div>
                    <div className="form-floating mb-3 w-50">
                        <input type="tel" className="form-control" id="contact" name="contact" placeholder="XXX-XXX-XXXX"
                               defaultValue={updatedUser.contact} onChange={handleFieldChanges}/>
                        <label htmlFor="address">Contact</label>
                    </div>

                    <div onClick={updateProfile} style={{cursor:'pointer'}}>
                        <button className="btn btn-outline-dark rounded-pill wd-top-bottom-small-border">Save</button>
                    </div>
                </div>
            </div>
        </>
    );
};
export default EditProfileComponent;