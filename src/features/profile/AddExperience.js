import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { addExperience } from "./profileSlice";
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
const initState = {
    title: "",
    company: "",
    location: "",
    from: "",
    to: "",
}


export default function AddExperience() {
    const profile = useSelector(state => state.profile)
    const [current, setCurrent] = useState(false)
    const [formData, setFormData] = useState(initState)
    const { title, company, location, from, to } = formData
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const onChange = (e) => {
        setFormData({
            ...formData, [e.target.name]: e.target.value
        })
    }
    const onChangeCurent = (e) => {
        setCurrent(!current)
    }
    const onSubmit = (e) => {
        e.preventDefault()

        var a = new Date(from);
        var b = new Date(to);

        var DateA = Date.UTC(a.getFullYear(), a.getMonth() + 1, a.getDate());
        var DateB = Date.UTC(b.getFullYear(), b.getMonth() + 1, b.getDate());

        if (parseFloat(DateA) > parseFloat(DateB)) {

            dispatch(toast("From date is required and needs to be from the past"))
        }
        dispatch(addExperience({ formData, navigate }))
        dispatch(toast("Experience Added"))

    }

    return (
        <section className="container">
            <h1 className="large text-primary">Add An Experience</h1>
            <p className="lead"><i className="fas fa-code-branch"></i> Add any developer/programming positions that you have had in the past</p>
            <small>* = required field</small>

            <ToastContainer />
            <form className="form" onSubmit={onSubmit}>
                <div className="form-group">
                    <input onChange={onChange} type="text" placeholder="* Job Title" name="title" required="" value={title} />
                </div>
                <div className="form-group">
                    <input onChange={onChange} type="text" placeholder="* Company" name="company" required="" value={company} />
                </div>
                <div className="form-group"><input onChange={onChange} type="text" placeholder="Location" name="location" value={location} />
                </div>
                <div className="form-group">
                    <h4>From Date</h4>

                    <input onChange={onChange} type="date" name="from" value={from} />
                </div>
                <div className="form-group">
                    <p>
                        <input type="checkbox" name="current" onChange={onChangeCurent} value={current} /> Current Job</p>
                </div>
                <div className="form-group">
                    <h4>To Date</h4>
                    <input disabled={current} onChange={onChange} type="date" name="to" value={to} />
                </div>
                <div className="form-group">
                    <textarea name="description" cols="30" rows="5" placeholder="Job Description"></textarea>
                </div>
                <input type="submit" className="btn btn-primary my-1" />

                <Link className="btn btn-light my-1" to={"/dashboard"}>Go Back</Link>
            </form>

        </section>
    );
}
