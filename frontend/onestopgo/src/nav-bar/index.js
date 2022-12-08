import React, {useState} from "react";
import {useNavigate} from "react-router";
import {useSelector} from "react-redux";

const ONESTOPGO_API = process.env.REACT_APP_ONESTOPGO_API_BASE;

const NavBar = ({links}) => {
    const nav = useNavigate();
    const [searchText, setSearchText] = useState("");
    const {loggedIn, loggedInUser} = useSelector(state => state.login)

    function handleChange(e) {
        setSearchText(e.target.value);
    }

    const handleOnSearchSubmit = () => {
        nav("/results/"+searchText);
    }

    return (
        <div>
            <nav>
                <div className="nav-wrapper teal">
                    <ul className="left hide-on-med-and-down">
                        <li>
                            <a onClick={() => nav('/')} className={'center'}><img width={65} height={65}
                                                                                  src={'../../images/onestopgologo.png'}/></a>
                        </li>
                        <li>
                            <div className="left row">
                                <form onSubmit={handleOnSearchSubmit} className="ms-2">
                                    <div className="col-12 wd-searchbar rounded-pill">
                                        <input onChange={handleChange} placeholder="Search OneStopGo"
                                               className="bg-white form-control ps-5 rounded-pill"/>
                                    </div>
                                </form>
                            </div>
                        </li>
                    </ul>
                    {loggedIn &&
                        <ul className="right hide-on-med-and-down">
                            {
                                links.map((each) =>
                                    <li onClick={() => nav('/' + each.link)}>
                                        <a data-toggle="tooltip" data-placement="top" title={each.name}>
                                            <i className="tiny material-icons">{each.icon}</i>
                                        </a>
                                    </li>
                                )
                            }
                            {loggedInUser.imageUrl &&
                                <li onClick={() => nav('/profile')} className="me-1 waves-effect waves-light" data-toggle="tooltip" data-placement="top" title="profile">
                                    <img width={50} height={50} src={ONESTOPGO_API + "/" + loggedInUser.imageUrl} className="rounded-pill mb-2"/>
                                </li>}
                            {!loggedInUser.imageUrl &&
                                <li onClick={() => nav('/profile')} className="me-1 waves-effect waves-light" data-toggle="tooltip" data-placement="top" title="profile">
                                    <img width={50} height={50} src={ONESTOPGO_API + "/images/user/empty_profile.jpg"} className="rounded-pill mb-2"/>
                                </li>}
                            <li onClick={() => nav('/logout')}><a
                                className="waves-effect waves-light btn light-blue ms-2">Logout</a></li>
                        </ul>
                    }
                    {
                        !loggedIn &&
                        <ul className="right hide-on-med-and-down">
                            <li onClick={() => nav('/login')}><a
                                className="waves-effect waves-light btn light-blue">Login</a></li>
                        </ul>
                    }
                    {
                        loggedIn && <>
                            {
                                (loggedInUser.type === "STOREADMIN") && <ul className="right hide-on-med-and-down">
                                    <li onClick={() => nav('/storeadmin')}><a
                                        className="waves-effect waves-light btn light-blue">Store Management</a></li>
                                </ul>
                            }
                            {
                                (loggedInUser.type === "ROOT") && <ul className="right hide-on-med-and-down">
                                    <li onClick={() => nav('/root')}><a
                                        className="waves-effect waves-light btn light-blue">Root Operations</a></li>
                                </ul>
                            }
                        </>
                    }
                </div>
            </nav>
        </div>
    );
}

export default NavBar;