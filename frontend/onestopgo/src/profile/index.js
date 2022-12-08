import React from "react";
import "./index.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMapMarkerAlt, faPhone} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";

const ONESTOPGO_API = process.env.REACT_APP_ONESTOPGO_API_BASE;

const ProfileComponent = () => {

    const {loggedIn, loggedInUser} = useSelector(state => state.login)

    if (!loggedIn) return <div className={'card'}><center><h2>Login to See Profile</h2></center></div>;

    console.log("Logged In User = " + JSON.stringify(loggedInUser, null, 4))
    return (
        <div className="card">
            <div className="row center">
                <div className="rounded-circle">
                    {loggedInUser.imageUrl &&
                    <img className="rounded-circle wd-border"
                         src={ONESTOPGO_API + "/" + loggedInUser.imageUrl} width={250} height={250} alt={'profile-pic'}/>}
                    {!loggedInUser.imageUrl &&
                    <img className="rounded-circle wd-border"
                         src={ONESTOPGO_API + "/images/user/empty_profile.jpg"} width={250} height={250} alt={'profile-pic'}/>}
                </div>
                <Link to="/tuiter/edit-profile">
                    <button className="btn btn-outline-dark rounded-pill wd-top-bottom-small-border">Edit Profile</button>
                </Link>
                <span className="wd-profile-name">{loggedInUser.name}</span>
                <span className="text-secondary wd-profile-email-font-size">{loggedInUser.email}</span>
                <div className={'row wd-top-bottom-medium-border'}>
                    <div className={'col-sm'}>
                        <a href="src/profile/components/profile-info#" className="text-secondary wd-remove-link-text-decor">
                            <FontAwesomeIcon className="wd-right-margin" icon={faMapMarkerAlt}/>
                            <span className="wd-reaction-count">{loggedInUser.address}</span>
                        </a>
                    </div>
                    <div className={'col-sm'}>
                        <a href="src/profile/components/profile-info#" className="text-secondary wd-remove-link-text-decor">
                            <FontAwesomeIcon className="wd-right-margin" icon={faPhone}/>
                            <span className="wd-reaction-count">Contact at {loggedInUser.contact}</span>
                        </a>
                    </div>
                </div>

            </div>
        </div>
    );
};
export default ProfileComponent;