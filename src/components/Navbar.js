import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";


export default function Navbar() {
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);

    const authLink = (
        <ul>
            <li>
                <Link style={{ textDecoration: "none" }} to="/developers">Developers</Link>
            </li>
            <li>
                <Link style={{ textDecoration: "none" }} to="/dashboard"><i className="fas fa-user"></i> Dashboard</Link>
            </li>
            <li>
                <Link style={{ textDecoration: "none" }} to="/posts">Post</Link>
            </li>
            <li>
                <Link style={{ textDecoration: "none" }} onClick={() => { dispatch(logout()) }} to="/login" >
                    <i className="fas fa-sign-out-alt" />{" "}
                    <span className="hide-sm">Logout</span>
                </Link>
            </li>
        </ul>
    );
    const guesLink = (
        <ul >

            <li>
                <Link style={{ textDecoration: "none" }} to="/register">Register</Link>
            </li>
            <li>
                <Link style={{ textDecoration: "none" }} to="/login">Login</Link>
            </li>
        </ul>
    );
    return (
        <nav className="navbar bg-dark">
            <h1>
                <Link style={{ textDecoration: "none" }} to="/">
                    <i className="fas fa-code"></i> DevConnector
                </Link>
            </h1>
            <Fragment>{auth.token ? authLink : guesLink}</Fragment>
        </nav>
    );
}
