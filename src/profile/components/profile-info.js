import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBirthdayCake, faCalendar, faMapMarkerAlt} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import moment from "moment/moment";

const ProfileInfo = ({profile}) => {
    return (
        <div className={'wd-div-padding'}>
            <div className="row">
                <span className="fw-bolder wd-profile-name">{profile.firstName} {profile.lastName}</span>
                <span className="text-secondary wd-margin-bottom-small">{profile.handle}</span>
                <span className="text-body wd-margin-bottom-small">{profile.bio}</span>
                <div className="wd-margin-bottom-small">
                    <ul className="wd-profile-stats">
                        <li>
                            <a href="src/profile/components/profile-info#" className="wd-remove-link-text-decor wd-reaction-count">
                                <FontAwesomeIcon className="wd-right-margin" icon={faMapMarkerAlt}/>
                                <span className="wd-reaction-count">{profile.location}</span>
                            </a>
                        </li>
                        <li>
                            <a href="src/profile/components/profile-info#" className="wd-remove-link-text-decor wd-reaction-count">
                                <FontAwesomeIcon className="wd-right-margin" icon={faBirthdayCake}/>
                                <span className="wd-reaction-count">Born {moment(profile.dateOfBirth).format("MMMM Do, YYYY")}</span>
                            </a>
                        </li>
                        <li>
                            <a href="src/profile/components/profile-info#" className="wd-remove-link-text-decor wd-reaction-count">
                                <FontAwesomeIcon className="wd-right-margin" icon={faCalendar}/>
                                <span className="wd-reaction-count">Joined {moment(profile.dateJoined).format("MMM, YYYY")}</span>
                            </a>
                        </li>
                    </ul>
                </div>

                <span className="text-secondary wd-followers-count"><span
                    className="fw-bold text-black wd-right-margin">{profile.followingCount}</span> Following
                            <span className="fw-bold text-black wd-right-margin wd-margin-left-smaller">{profile.followersCount}</span> Followers</span>

            </div>
        </div>
    );
};
export default ProfileInfo;