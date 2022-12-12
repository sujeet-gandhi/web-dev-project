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
                    <ul className="left">
                        <li>
                            <a onClick={() => nav('/')} className={'center'}><img width={65} height={65}
                                                                                  src={'../../images/onestopgologo.png'}/></a>
                        </li>
                        <li>
                            <div className="left row">
                                <form onSubmit={handleOnSearchSubmit} className="ms-2">
                                    <div className="col-xl-12 col-lg-12 col-md-8 cool-sm-8 wd-searchbar rounded-pill">
                                        <input onChange={handleChange} placeholder="Search OneStopGo"
                                               className="bg-white form-control ps-5 rounded-pill"/>
                                    </div>
                                </form>
                            </div>
                        </li>
                    </ul>
                    {loggedIn &&
                        <ul className="right">
                            {(loggedInUser.type === "USER") &&
                                links.map((each) =>
                                    <li className={'hide-on-med-and-down'} onClick={() => nav('/' + each.link)}>
                                        <a data-toggle="tooltip" data-placement="top" title={each.name}>
                                            <i className="tiny material-icons">{each.icon}</i>
                                        </a>
                                    </li>
                                )
                            }
                            {loggedInUser.imageUrl &&
                                <li onClick={() => nav('/profile/' + loggedInUser.id)} className="me-1 waves-effect waves-light" data-toggle="tooltip" data-placement="top" title="profile">
                                    <img width={50} height={50} src={ONESTOPGO_API + "/" + loggedInUser.imageUrl} className="rounded-pill mb-2 hide-on-med-and-down"/>
                                </li>}
                            {!loggedInUser.imageUrl &&
                                <li onClick={() => nav('/profile/' + loggedInUser.id)} className="me-1 waves-effect waves-light" data-toggle="tooltip" data-placement="top" title="profile">
                                    <img width={50} height={50} src={ONESTOPGO_API + "/images/user/empty_profile.jpg"} className="rounded-pill mb-2 hide-on-med-and-down"/>
                                </li>}
                            <li onClick={() => nav('/logout')}><a
                                className="waves-effect waves-light btn light-blue ms-2">Logout</a></li>
                        </ul>
                    }
                    {
                        !loggedIn &&
                        <ul className="right">
                            <li onClick={() => nav('/login')}><a
                                className="waves-effect waves-light btn light-blue">Login</a></li>
                        </ul>
                    }
                </div>
            </nav>
        </div>
    );
}

export default NavBar;