import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {updateProfile} from "../profile-reducer";
import {faClose} from "@fortawesome/free-solid-svg-icons";
import {useNavigate} from "react-router-dom";
import "../index.css"

const EditProfileComponent = () => {

    const profile = useSelector((state) => state.profile);
    const [profileState, setProfileState] = useState(profile);
    const initialData = profile
    const dispatch = useDispatch();

    const handleFieldChanges = (event) => {
        const jsonKey = event.target.id;
        const jsonValue = event.target.value;
        const updatedProfileJson = {
            ...profileState,
            [jsonKey]: jsonValue
        }
        setProfileState(updatedProfileJson);
    }

    const navigation = useNavigate();
    const onSaveClicked = () => {
        if (performValidation()) {
            dispatch(updateProfile(profileState));
            navigation("/tuiter/profile")
        }
    }

    const onCancelClicked = () => {
        dispatch(updateProfile(initialData))
        navigation("/tuiter/profile")
    }

    const performValidation = () => {
        console.log(profileState);
        if (profileState.firstName === '' || profileState.lastName === '' || profileState.location === ''
            || profileState.bio === '' || profileState.website === '' || profileState.dateOfBirth === '') {
            alert("One more fields are empty, kindly fill all details and retry.");
            return false;
        }

        return true;
    }

    return (
        <div className="wd-banner-image">
            <div className="col wd-margin-bottom-small wd-div-padding wd-div-padding-v">
                <FontAwesomeIcon
                    className="align-self-center"
                    icon={faClose} onClick={onCancelClicked}/>
                <span className="fw-bold wd-toolbar-header">Edit Profile</span>
                <button className="btn btn-dark rounded-pill float-end" onClick={onSaveClicked}>Save</button>
            </div>
            <div className="wd-margin-bottom-large">
                <div className="row">
                    <div>
                        <img src={`/images/${profile.bannerPicture}`} width="100%" height="350px" alt={'banner pic'}/>
                    </div>
                    <div className="rounded-circle wd-overlap-profile wd-border">
                        <img className="rounded-circle wd-overlap-profile wd-border"
                             src={`/images/${profile.profilePicture}`} width={150} alt={'profile pic'}/>
                    </div>
                </div>
            </div>
            <div className={'wd-div-padding'}>
                <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="firstName" name="firstName" placeholder="John"
                           defaultValue={profile.firstName} onChange={handleFieldChanges}/>
                    <label htmlFor="firstName">First Name</label>
                </div>

                <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="lastName" name="lastName" placeholder="Doe"
                           defaultValue={profile.lastName} onChange={handleFieldChanges}/>
                    <label htmlFor="lastName">Last Name</label>
                </div>

                <div className="form-floating mb-3">
                <textarea className="form-control" id="bio" name="bio"
                          placeholder="An extravagent description of yourself"
                          defaultValue={profile.bio} onChange={handleFieldChanges}/>
                    <label htmlFor="bio">Bio</label>
                </div>

                <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="location" name="location"
                           placeholder="Top of the world"
                           defaultValue={profile.location} onChange={handleFieldChanges}/>
                    <label htmlFor="location">Location</label>
                </div>

                <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="website" name="website" placeholder="www.google.com"
                           defaultValue={profile.website} onChange={handleFieldChanges}/>
                    <label htmlFor="website">Website</label>
                </div>

                <div className="form-floating mb-3">
                    <input type="date" className="form-control" id="dateOfBirth" name="dateOfBirth"
                           placeholder="1990-01-01"
                           defaultValue={profile.dateOfBirth} onChange={handleFieldChanges}/>
                    <label htmlFor="dateOfBirth">Date of Birth</label>
                </div>
            </div>
        </div>
    );
}
export default EditProfileComponent;