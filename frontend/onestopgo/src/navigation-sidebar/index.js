import React from "react";
import {Link} from "react-router-dom";
import {useLocation} from "react-router";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faBicycle,
    faBoxes,
    faGears,
    faHome,
    faSearch,
    faStore,
    faStoreAlt,
    faUser
} from "@fortawesome/free-solid-svg-icons";
import "./index.css"
import {useSelector} from "react-redux";

const NavigationSidebar = () => {
    const {pathname} = useLocation();
    const paths = pathname.split('/')
    const active = paths[1];
    const {loggedIn, loggedInUser} = useSelector(state => state.login)
    return (
        <div className="card list-group wd-side-nav">
            <Link to="/" className={`list-group-item wd-sidenav-side-item ${active === '' ? 'teal' : ''}`}>
                <FontAwesomeIcon className="wd-sidenav-icon" icon={faHome}/> Home
            </Link>
            {
                loggedIn && loggedInUser.type === 'ROOT' &&
                <Link to="/root" className={`list-group-item wd-sidenav-side-item ${active === 'root' ? 'teal' : ''}`}>
                    <FontAwesomeIcon icon={faGears} className="wd-sidenav-icon" /> Root Operations
                </Link>
            }
            {
                loggedIn && loggedInUser.type === 'STOREADMIN' &&
                <Link to="/storeadmin" className={`list-group-item wd-sidenav-side-item ${active === 'storeadmin' ? 'teal' : ''}`}>
                    <FontAwesomeIcon icon={faStoreAlt} className="wd-sidenav-icon" /> Store Admin
                </Link>
            }
            <Link to="/search" className={`list-group-item wd-sidenav-side-item ${active === 'search' || active === 'results' ? 'teal' : ''}`}>
                <FontAwesomeIcon className="wd-sidenav-icon" icon={faSearch}/> Search
            </Link>
            {loggedIn &&
                <Link to="/orders" className={`list-group-item wd-sidenav-side-item ${active === 'orders' ? 'teal' : ''}`}>
                    <FontAwesomeIcon icon={faBoxes} className="wd-sidenav-icon" /> Orders
                </Link>
            }
            <Link to="/stores" className={`list-group-item wd-sidenav-side-item ${active === 'stores' ? 'teal' : ''}`}>
                <FontAwesomeIcon icon={faStore} className="wd-sidenav-icon" /> Stores
            </Link>
            <Link to="/products" className={`list-group-item wd-sidenav-side-item ${active === 'products' ? 'teal' : ''}`}>
                <FontAwesomeIcon icon={faBicycle} className="wd-sidenav-icon" /> Products
            </Link>
            {loggedIn
                &&
                <Link to={"/profile/" + loggedInUser.id}
                      className={`list-group-item wd-sidenav-side-item ${active === 'profile' || active === 'edit-profile' ? 'teal' : ''}`}>
                    <FontAwesomeIcon icon={faUser} className="wd-sidenav-icon" /> Profile
                </Link>
            }
        </div>
    );
};
export default NavigationSidebar;