import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, } from "react-router-dom";
import { addEducation } from "./profileSlice";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const initState = {
    school: "",
    degree: "",
    fieldofstudy: "",
    from: '',
    to: ""

}

export default function AddEducation() {
    const profile = useSelector(state => state.profile)
    const [current, setCurrent] = useState(false)
    const [formData, setFormData] = useState(initState)
    const { school, degree, fieldofstudy, from, to } = formData
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const onChange = (e) => {
        console.log(e.target.value);
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
        dispatch(addEducation({ formData, navigate }))
        dispatch(toast("Education Added"))

    }
    return (
        <section className="container">
            <h1 className="large text-primary">Add Your Education</h1>
            <p className="lead"><i className="fas fa-code-branch"></i> Add any school or bootcamp that you have attended</p>
            <small>* = required field</small>
            <ToastContainer />
            <form className="form" onSubmit={onSubmit}>
                <div className="form-group" >
                    <input onChange={onChange} value={school} type="text" placeholder="* School or Bootcamp" name="school" required="" />
                </div>
                <div className="form-group">
                    <input onChange={onChange} value={degree} type="text" placeholder="* Degree or Certificate" name="degree" required="" />
                </div>
                <div className="form-group">
                    <input onChange={onChange} value={fieldofstudy} type="text" placeholder="Field of Study" name="fieldofstudy" />
                </div>
                <div className="form-group">
                    <h4>From Date:</h4>

                    <input onChange={onChange} type="date" name="from" value={from} />

                </div>
                <div className="form-group" >
                    <p><input type="checkbox" name="current" onChange={onChangeCurent} value={current} /> Current School</p>
                </div>
                <div className="form-group">
                    <h4>To Date</h4>
                    <input disabled={current} onChange={onChange} type="date" name="to" value={to} />
                </div>
                <div className="form-group">
                    <textarea name="description" cols="30" rows="5" placeholder="Program Description"></textarea>
                </div>
                <input type="submit" className="btn btn-primary my-1" />
                <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
            </form>
        </section >
    )
}
