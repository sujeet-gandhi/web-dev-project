import React, {useState} from "react";
import {useNavigate} from "react-router";
import {useSelector} from "react-redux";

const ONESTOPGO_API = process.env.REACT_APP_ONESTOPGO_API_BASE;

const NavBar = ({links, userData, loggedIn}) => {
    const nav = useNavigate();
    const [searchText, setSearchText] = useState("");
    console.log(userData, loggedIn)

    function handleChange(e) {
        setSearchText(e.target.value);
    }

    const handleOnSearchSubmit = () => {
        nav("/search", {
            state:
                {
                    searchTerm: searchText
                }
        })
    }

    return (
        <nav>
            <div className="nav-wrapper teal">
                <a onClick={() => nav('/')} className="brand-logo center"><img width={75} height={75}
                                                                               src={'../../images/shop.jpg'}/></a>
                <ul className="left hide-on-med-and-down">
                    <li>
                        <div className="left row">
                            <form onSubmit={handleOnSearchSubmit} className="ms-2">
                                <div className="input-field">
                                    <i className="grey-text material-icons prefix">search</i>
                                    <input placeholder="Search Store, Categories and Products"
                                           className="black-text" type="text" onChange={handleChange} required/>
                                </div>
                            </form>
                        </div>
                    </li>
                </ul>
                <ul className="right hide-on-med-and-down">
                    {
                        links.map((each) => <li onClick={() => nav('/' + each.link)}>
                                            <a data-toggle="tooltip" data-placement="top" title={each.name}>
                                                <i className="tiny material-icons">{each.icon}</i>
                                                </a>
                                            </li>)
                    }
                    {loggedIn && userData.imageUrl &&
                        <li onClick={() => nav('/profile')} className="me-1 waves-effect waves-light" data-toggle="tooltip" data-placement="top" title="profile"><img width={50}
                                                                                                           height={50}
                                                                                                           src={ONESTOPGO_API + "/" + userData.imageUrl}
                                                                                                           className="rounded-pill mb-2"/>
                        </li>}
                    {loggedIn && !userData.imageUrl &&
                        <li onClick={() => nav('/profile')} className="me-1 waves-effect waves-light" data-toggle="tooltip" data-placement="top" title="profile"><img width={50}
                                                                                                           height={50}
                                                                                                           src={ONESTOPGO_API + "/images/user/empty_profile.jpg"}
                                                                                                           className="rounded-pill mb-2"/>
                        </li>}
                    {!loggedIn && <li onClick={() => nav('/login')}><a
                        className="waves-effect waves-light btn light-blue">Login</a></li>}
                    {loggedIn && <li onClick={() => nav('/logout')}><a
                        className="waves-effect waves-light btn light-blue ms-2">Logout</a></li>}
                </ul>
            </div>
        </nav>
    );
}

export default NavBar;