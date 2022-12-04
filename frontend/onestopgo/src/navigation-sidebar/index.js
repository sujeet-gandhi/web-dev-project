import React from "react";
import {Link} from "react-router-dom";
import {useLocation} from "react-router";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBicycle, faBookmark, faBoxes, faCartShopping, faHome, faUser} from "@fortawesome/free-solid-svg-icons";
import "./index.css"

const NavigationSidebar = () => {
    const {pathname} = useLocation();
    const paths = pathname.split('/')
    const active = paths[2];
    return (
        <div className="list-group">
            <Link to="/" className= {'list-group-item wd-sidenav-side-item'}>
                <FontAwesomeIcon className="wd-sidenav-icon" icon={faCartShopping}/> OneStopGo
            </Link>
            <Link to="/" className={`list-group-item wd-sidenav-side-item ${active === undefined ? 'teal' : ''}`}>
                <FontAwesomeIcon className="wd-sidenav-icon" icon={faHome}/> Home
            </Link>
            <Link to="/orders" className={`list-group-item wd-sidenav-side-item ${active === 'messages' ? 'teal' : ''}`}>
                <FontAwesomeIcon icon={faBoxes} className="wd-sidenav-icon" /> Orders
            </Link>
            <Link to="/cart" className={`list-group-item wd-sidenav-side-item ${active === 'bookmarks' ? 'teal' : ''}`}>
                <FontAwesomeIcon icon={faBookmark} className="wd-sidenav-icon" /> Stores
            </Link>
            <Link to="/tuiter/lists" className={`list-group-item wd-sidenav-side-item ${active === 'lists' ? 'teal' : ''}`}>
                <FontAwesomeIcon icon={faBicycle} className="wd-sidenav-icon" /> Products
            </Link>
            <Link to="/tuiter/profile"
                  className={`list-group-item wd-sidenav-side-item ${active === 'profile' || active === 'edit-profile' ? 'teal' : ''}`}>
                <FontAwesomeIcon icon={faUser} className="wd-sidenav-icon" /> Profile
            </Link>
        </div>
    );
};
export default NavigationSidebar;