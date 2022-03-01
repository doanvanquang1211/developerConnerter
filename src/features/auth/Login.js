import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { loginValue } from "./authSlice";
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Login() {
    const auth = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const [formData, setFormData] = useState({
        email: '',
        password: '',

    })

    const { email, password } = formData
    const onChange = (e) => {
        setFormData({
            ...formData, [e.target.name]: e.target.value
        })
    }


    const onSubmit = (e) => {
        e.preventDefault()
        dispatch(loginValue({ email, password }))
    }



    if (auth.token) {
        return <Navigate to="/dashboard" />
    }
    return (
        <section className="container">

            <h1 className="large text-primary">Sign In</h1>
            <p className="lead">
                <i className="fas fa-user"></i> Sign into Your Account
            </p>
            <form className="form" onSubmit={onSubmit}>
                <div className="form-group">
                    <input onChange={onChange} value={email} id="email" type="email" placeholder="Email Address" name="email" required />


                </div>

                <div className="form-group">
                    <input onChange={onChange} value={password} id="password" type="password" placeholder="Password" name="password" />

                </div>
                <p style={{ color: "red", fontSize: "20px", fontStyle: "italic" }}> {auth.errorPassword}</p>
                <input type="submit" className="btn btn-primary" value="Login" />
            </form>

            <p className="my-1">
                Don't have an account? <Link to="/register">Sign Up</Link>
            </p>
        </section>
    );
}