import React, {useState} from "react";
import "./index.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBirthdayCake, faCalendar, faMapMarkerAlt} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";

const ONESTOPGO_API = process.env.REACT_APP_ONESTOPGO_API_BASE;

const ProfileComponent = () => {
    const profile = () => {
        return {
            imageUrl: 'images/user/190015bd-511a-41f5-ac17-f401aef8df46.jpg',
            email: 'arnold@onestopgo',
            name: 'Arnold Shivajinagar',
            password: 'arnold789',
            address: 'Boston, MA',
            contact: '+12345'
        }
    }

    const [localUserData, setLocalUserData] = useState(profile());

    return (
        <div className="card">
            <div className="row center">
                <div className="rounded-circle">
                    <img className="rounded-circle wd-border"
                         src={ONESTOPGO_API + "/" + localUserData.imageUrl} width={250} height={250} alt={'profile-pic'}/>
                </div>
                <Link to="/tuiter/edit-profile">
                    <button className="btn btn-outline-dark rounded-pill wd-top-bottom-small-border">Edit Profile</button>
                </Link>
                <span className="fw-bolder wd-profile-name">{localUserData.name}</span>
                <span className="text-secondary ">{localUserData.email}</span>
                <span className="text-body wd-margin-bottom-small wd-top-bottom-small-border">{localUserData.email}</span>
                <div className={'row'}>
                    <div className={'col-sm'}>
                        <a href="src/profile/components/profile-info#" className="wd-remove-link-text-decor wd-reaction-count">
                            <FontAwesomeIcon className="wd-right-margin" icon={faMapMarkerAlt}/>
                            <span className="wd-reaction-count">{localUserData.address}</span>
                        </a>
                    </div>
                    <div className={'col-sm'}>
                        <a href="src/profile/components/profile-info#" className="wd-remove-link-text-decor wd-reaction-count">
                            <FontAwesomeIcon className="wd-right-margin" icon={faBirthdayCake}/>
                            <span className="wd-reaction-count">Born {localUserData.address}</span>
                        </a>
                    </div>
                    <div className={'col-sm'}>
                        <a href="src/profile/components/profile-info#" className="wd-remove-link-text-decor wd-reaction-count">
                            <FontAwesomeIcon className="wd-right-margin" icon={faCalendar}/>
                            <span className="wd-reaction-count">Joined {localUserData.contact}</span>
                        </a>
                    </div>
                </div>

            </div>
        </div>
    );
};
export default ProfileComponent;