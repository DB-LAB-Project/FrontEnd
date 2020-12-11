import React, {Fragment} from "react";
import "./home.css"
import { Link, withRouter } from "react-router-dom";
import {isAuthenticated, signout} from "../auth/helper";

const currentTab = (history, path) => {
    if(history.location.pathname === path) {
        return "nav-item active";
    }
    else {
        return "nav-item";
    }
}

const Menu = ({history}) => (
    <div>
        <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
            <Link to='/'>
                <a className="navbar-brand">Learning Management System</a>
            </Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse"
                    data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false"
                    aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarCollapse">
                <ul className="navbar-nav ml-auto">
                    <li className={currentTab(history, '/')}>
                        <Link className="nav-link" to="/">Home </Link>
                    </li>
                    {isAuthenticated() && isAuthenticated().user.role === 0 && (
                        <li className={currentTab(history, '/user/dashboard')}>
                            <Link className="nav-link" to="/user/dashboard">My Dashboard</Link>
                        </li>
                    )}
                    {isAuthenticated() && isAuthenticated().user.role === 1 && (
                        <li className={currentTab(history, '/admin/dashboard')}>
                            <Link className="nav-link" to="/admin/dashboard">My Dashboard</Link>
                        </li>
                    )}
                    <li className={currentTab(history, '/contact-us')}>
                        <Link className="nav-link" to="/contact-us">Contact Us<span className="sr-only">(current)</span></Link>
                    </li>
                    <li className={currentTab(history, '/about-us')}>
                        <Link className="nav-link" to="/about-us">About Us</Link>
                    </li>
                    {!isAuthenticated() && (
                        <Fragment>
                            <li className={currentTab(history, '/signin')}>
                                <Link className="nav-link" to="/signin">Signin</Link>
                            </li>
                            <li className={currentTab(history, '/signup')}>
                                <Link className="nav-link" to="/signup">Signup</Link>
                            </li>
                        </Fragment>
                    )}
                    {isAuthenticated() && (
                        <li className={currentTab(history, '/signout')}>
                            <Link className="nav-link text-warning" onClick={() => {
                                signout(() => {
                                    history.push("/");
                                });
                            }}>Signout</Link>
                        </li>
                    )}
                </ul>
            </div>
        </nav>

    </div>
);

export default withRouter(Menu);
