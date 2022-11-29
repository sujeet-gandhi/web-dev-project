import React from "react";
import {useNavigate} from "react-router";

const ONESTOPGO_API = process.env.REACT_APP_ONESTOPGO_API_BASE;

const NavBar = ({links, userData}) => {
    const nav = useNavigate();
    return (
        <nav>
            <div className="nav-wrapper teal">
                <a onClick={() => nav('/')} className="brand-logo center"><img width={75} height={75} src={'../../images/shop.jpg'}/></a>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    {
                        links.map((each) => <li onClick={() => nav('/' + each.link)}><a>{each.name}</a></li>)
                    }
                    {userData && userData.imageUrl && <li className="me-2"><img width={50} height={50} src={ONESTOPGO_API + "/" + userData.imageUrl} className="circle"/></li>}
                    {userData && !userData.imageUrl && <li className="me-2"><img width={50} height={50} src={ONESTOPGO_API + "/images/user/empty_profile.jpg"} className="circle"/></li>}
                    {!userData && <li onClick={() => nav('/login')}><a className="waves-effect waves-light btn light-blue">Login</a></li>}
                </ul>
            </div>
        </nav>
    );
}

export default NavBar;