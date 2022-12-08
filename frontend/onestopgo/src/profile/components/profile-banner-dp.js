import React from "react";
import {Link} from "react-router-dom";
import "../index.css"

const ProfileBannerDp = ({profile}) => {
    return (
        <div className="wd-margin-bottom-large">
            <div className="row">
                <div>
                    <img src={`/images/${profile.bannerPicture}`} width="100%" height="350px" alt={'Banner Picture'}/>
                </div>

                <div className="rounded-circle wd-overlap-profile">
                    <img className="rounded-circle wd-overlap-profile wd-border"
                         src={`/images/${profile.profilePicture}`} width={150} alt={'profile-pic'}/>
                </div>

                <div className={'wd-div-padding'}>
                    <Link to="/tuiter/edit-profile">
                        <button className="btn btn-outline-dark rounded-pill wd-override-overlap float-end">Edit Profile
                        </button>
                    </Link>

                </div>
            </div>
        </div>
    );
};
export default ProfileBannerDp;