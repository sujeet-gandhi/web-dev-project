import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeftLong} from "@fortawesome/free-solid-svg-icons";
import React from "react";

const ProfileHeader = ({profile}) => {
    return (
        <div className="row wd-div-padding">
            <div className="col-auto">
                <FontAwesomeIcon className="align-self-center wd-margin-top-small" icon={faArrowLeftLong}/>
            </div>
            <div className="col-10">
                <span className="fw-bold wd-profile-name">{profile.firstName} {profile.lastName}</span>
                <div className="text-secondary">{profile.tuitsCount} Tuits</div>
            </div>
        </div>
    );
};
export default ProfileHeader;