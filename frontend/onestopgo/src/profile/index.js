import React, {useEffect} from "react";
import "./index.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMapMarkerAlt, faPhone} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router";
import {getUserDataThunk, getUserSafeDetailsThunk} from "../login/login-thunk";
import Loader from "../components/loader";

const ONESTOPGO_API = process.env.REACT_APP_ONESTOPGO_API_BASE;

const ProfileComponent = () => {

    const {loggedIn, loggedInUser, safeDetailsUserLoading, safeDetailsUser} = useSelector(state => state.login)
    const {userId} = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUserDataThunk())
        dispatch(getUserSafeDetailsThunk(userId))
    }, [])

    const checkExistingUser = () => {
        return loggedInUser && safeDetailsUser && safeDetailsUser.id === loggedInUser.id;
    }


    if (safeDetailsUserLoading)
        return <Loader/>

    return (
        <>
            <div className="card">
                <div className="row center">
                    <div className="rounded-circle">
                        {safeDetailsUser.imageUrl &&
                            <img className="rounded-circle wd-border"
                                 src={ONESTOPGO_API + "/" + safeDetailsUser.imageUrl} width={250} height={250}
                                 alt={'profile-pic'}/>}
                        {!safeDetailsUser.imageUrl &&
                            <img className="rounded-circle wd-border"
                                 src={ONESTOPGO_API + "/images/user/empty_profile.jpg"} width={250} height={250}
                                 alt={'profile-pic'}/>}
                    </div>
                    {checkExistingUser() && <Link to="/edit-profile">
                        <button className="btn btn-outline-dark rounded-pill wd-top-bottom-small-border">Edit Profile
                        </button>
                    </Link>}
                    <span className="wd-profile-name">{safeDetailsUser.name}</span>
                    {checkExistingUser() && <span className="text-secondary wd-profile-email-font-size">{loggedInUser.email}</span>}
                    <div className={'row wd-top-bottom-medium-border'}>
                        {checkExistingUser() && <div className={'col-sm'}>
                            <a href="#" className="text-secondary wd-remove-link-text-decor">
                                <FontAwesomeIcon className="wd-right-margin" icon={faMapMarkerAlt}/>
                                <span className="wd-reaction-count">{loggedInUser.address}</span>
                            </a>
                        </div>}
                        {checkExistingUser() && <div className={'col-sm'}>
                            <a href="#" className="text-secondary wd-remove-link-text-decor">
                                <FontAwesomeIcon className="wd-right-margin" icon={faPhone}/>
                                <span className="wd-reaction-count">Contact at {loggedInUser.contact}</span>
                            </a>
                        </div>}
                    </div>
                    {!safeDetailsUserLoading && safeDetailsUser && safeDetailsUser.favourites && safeDetailsUser.favourites.stores &&
                        <p>Favorite Stores :
                            {
                                safeDetailsUser.favourites.stores.map((each) =>
                                    <Link style={{marginLeft:10}} to={"/stores/" + each[1]}>
                                        <img width={40} height={40} src={ONESTOPGO_API + "/" + each[2]} alt="" className="circle"/>
                                    </Link>
                                )


                            }
                        </p>
                    }
                </div>
            </div>
        </>
    );
};
export default ProfileComponent;