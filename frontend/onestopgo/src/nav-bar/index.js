import React from "react";
import {useNavigate} from "react-router";

const NavBar = ({links}) => {
    const nav = useNavigate();
    return (
        <nav>
            <div className="nav-wrapper teal">
                <a onClick={() => nav('/')} className="brand-logo center"><img width={75} height={75} src={'../../images/shop.jpg'}/></a>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    {
                        links.map((each) => <li onClick={() => nav('/' + each.link)}><a>{each.name}</a></li>)
                    }

                </ul>
            </div>
        </nav>
    );
}

export default NavBar;