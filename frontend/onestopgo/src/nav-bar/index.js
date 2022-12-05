import React, {useState} from "react";
import {useNavigate} from "react-router";

const ONESTOPGO_API = process.env.REACT_APP_ONESTOPGO_API_BASE;

const NavBar = ({links, userData}) => {
    const nav = useNavigate();
    const [searchText, setSearchText] = useState("");

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
                                        {/*<i className="grey-text material-icons prefix rounded-pill">search</i>*/}
                                        {/*<i className="bi bi-search position-absolute wd-nudge-up"></i>*/}
                                    </div>
                                </form>
                            </div>
                        </li>
                    </ul>
                    <ul className="right hide-on-med-and-down">
                        {
                            links.map((each) => <li onClick={() => nav('/' + each.link)}><a>{each.name}</a></li>)
                        }
                        {userData && userData.imageUrl &&
                            <li onClick={() => nav('/profile')} className="me-2 waves-effect waves-light"><img width={50}
                                                                                                               height={50}
                                                                                                               src={ONESTOPGO_API + "/" + userData.imageUrl}
                                                                                                               className="circle"/>
                            </li>}
                        {userData && !userData.imageUrl &&
                            <li onClick={() => nav('/profile')} className="me-2 waves-effect waves-light"><img width={50}
                                                                                                               height={50}
                                                                                                               src={ONESTOPGO_API + "/images/user/empty_profile.jpg"}
                                                                                                               className="circle"/>
                            </li>}
                        {!userData && <li onClick={() => nav('/login')}><a
                            className="waves-effect waves-light btn light-blue">Login</a></li>}
                    </ul>
                </div>
            </nav>
        </div>
    );
}

export default NavBar;