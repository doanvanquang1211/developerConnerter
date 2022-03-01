import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, navigate } from 'react-router-dom';
import { getLoggedProfile } from './../features/profile/profileSlice';
import { deleteTask1, deleteTask2 } from "./../features/profile/profileSlice";
import { authUser, deleteAccount } from './../features/auth/authSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactLoading from 'react-loading';
import Loading from "../features/loader/Loading";

export default function Dashboard() {
    const profile = useSelector(state => state.profile)
    const [loading, setLoading] = useState(undefined)
    const dispatch = useDispatch()
    const navigate = useNavigate
    useEffect(() => {
        setTimeout(() => {
            setLoading(true)
        }, 1000);

        dispatch(getLoggedProfile())


    }, [])

    const deleteExperience = (id) => {
        dispatch(deleteTask1(id))
        dispatch(toast("Education Added"))

    }
    const deleteEducation = (id) => {
        dispatch(deleteTask2(id))
        dispatch(toast("Experience Removed"))

    }
    const onClick = () => {
        alert("Are you sure? This can NOT be undone!")
        dispatch((deleteAccount(navigate)))
    }
    if (!profile.data) {
        return (
            <Fragment>

                <p>Bạn chưa update profile,vui lòng cập nhật</p>
                <Link className="btn btn-primary" to={"/create-profile"}>
                    Create Profile
                </Link>
            </Fragment>
        )

    } else {
        return (
            <>
                {
                    loading ?

                        <section className="container">
                            <h1 className="large text-primary">Dashboard</h1>
                            <p className="lead">
                                <i className="fas fa-user"></i> Welcome {profile.data?.user?.name}
                            </p>
                            <div className="dash-buttons">
                                <Link to="/editprofile" className="btn btn-light">
                                    <i className="fas fa-user-circle text-primary"></i> Edit Profile
                                </Link>
                                <Link to="/addexperience" className="btn btn-light">
                                    <i className="fab fa-black-tie text-primary"></i> Add Experience
                                </Link>
                                <Link to="/addeducation" className="btn btn-light">
                                    <i className="fas fa-graduation-cap text-primary"></i> Add Education
                                </Link>
                            </div>
                            <h2 className="my-2">Experience Credentials</h2>
                            <ToastContainer />
                            <table className="table" >
                                <thead>
                                    <tr>
                                        <th>Company</th>
                                        <th className="hide-sm">Title</th>
                                        <th className="hide-sm">Years</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                {profile.data.experience.map((item, index) => {

                                    const { company, title, from, to } = item

                                    return (

                                        <tbody key={index}>
                                            <tr className="hide-sm" >
                                                <td>{company}</td>
                                                <td className="hide-sm">{title}</td>
                                                <td className="hide-sm">{from} - {to}</td>
                                                <td>
                                                    <button onClick={() => deleteExperience(item._id)} className="btn btn-danger">Delete</button>
                                                </td>
                                            </tr>

                                        </tbody>

                                    )
                                })}
                            </table>
                            <h2 className="my-2">Education Credentials</h2>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>School</th>
                                        <th className="hide-sm">Degree</th>
                                        <th className="hide-sm">Years</th>
                                        <th />
                                    </tr>
                                </thead>
                                {profile.data.education.map((item, index) => {
                                    const { school, degree, from, to } = item
                                    return (
                                        <tbody key={index}>
                                            <tr>
                                                <td>{school}</td>
                                                <td className="hide-sm">{degree}</td>
                                                <td className="hide-sm">{from}  - {to}</td>
                                                <td>
                                                    <button onClick={() => deleteEducation(item._id)} className="btn btn-danger">Delete</button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    )
                                })
                                }
                            </table>
                            <div className="my-2">
                                <button onClick={onClick} className="btn btn-danger">
                                    <i className="fas fa-user-minus"></i>
                                    Delete My Account
                                </button>
                            </div>
                        </section > : <Loading />

                }
            </>

        );
    }

}
