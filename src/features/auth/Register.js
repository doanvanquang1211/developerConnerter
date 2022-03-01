
import { Link, Navigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { setAlert } from "../alert/alertSlice";
import { registerUser } from "../auth/authSlice";





export default function Register() {
    const dispatch = useDispatch()
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        password2: ""
    })
    const { name, email, password, password2 } = formData

    const onChange = (e) => {
        setFormData({
            ...formData, [e.target.name]: e.target.value
        })
    }

    const onSubmit = (e) => {
        e.preventDefault()


        if (email && password !== password2) {

            dispatch(setAlert({ msg: "Vui lòng nhập pass khớp", alertType: "danger" }))
        } else {
            dispatch(registerUser({ name, email, password }))
        }
    }
    const auth = useSelector(state => state.auth)
    if (auth.token) {
        return <Navigate to="/dashboard" />
    }
    return (
        <section className="container">

            <h1 className="large text-primary">Sign Up</h1>
            <p className="lead">
                <i className="fas fa-user"></i> Create Your Account
            </p>

            <form className="form" onSubmit={onSubmit} >
                <div className="form-group"> <input onChange={onChange} value={name} type="text" placeholder="Name" name="name" required />
                </div>
                <div className="form-group">
                    <input onChange={onChange} value={email} type="email" placeholder="Email Address" name="email" />
                    <small className="form-text">
                        This site uses Gravatar so if you want a profile image, use a
                        Gravatar email
                    </small>
                </div>
                <div className="form-group"> <input onChange={onChange} value={password} type="password" placeholder="Password" name="password" minLength="6" />
                </div>
                <div className="form-group">
                    <input onChange={onChange} value={password2} type="password" placeholder="Confirm Password" name="password2" minLength="6" />
                </div>
                <p style={{ color: "red", fontSize: "20px", fontStyle: "italic" }}> {auth.errorRegister}</p>
                <input type="submit" className="btn btn-primary" value="Register" />
            </form>
            <p className="my-1">
                Already have an account? <Link to="/login">Sign In</Link>
            </p>
        </section>
    );
}

