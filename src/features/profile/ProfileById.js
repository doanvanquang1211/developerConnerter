import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams, } from "react-router-dom";
import Loading from "../loader/Loading";
import { getProfileById } from "./profileSlice";



export default function ProfileById() {
    const params = useParams()
    let id = params.profilebyid
    const profileById = useSelector(state => state.profile)
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(undefined)

    useEffect(() => {
        setTimeout(() => {
            setLoading(true)
        }, 1000);
        dispatch(getProfileById(id))
    }, [])
    return (
        <>
            {
                loading ?


                    <section className="container">
                        <Link className="btn btn-light" to="/developers">Back To Profiles</Link>
                        <div className="profile-grid my-1">
                            <div className="profile-top bg-primary p-2">
                                <img className="round-img my-1" src={profileById?.profileId?.user?.avatar} alt="" />
                                <h1 className="large">{profileById?.profileId?.user?.name}</h1>
                                <p className="lead">{profileById?.profileId?.status} <span> at {profileById?.profileId?.company}</span></p>
                                <p><span>{profileById?.profileId?.location} </span></p>
                                <div className="icons my-1">
                                    <a href="https://ntq.com.vn" target="_blank" rel="noopener noreferrer"><i className="fas fa-globe fa-2x"></i></a>
                                </div>
                            </div>
                            <div className="profile-about bg-light p-2">
                                <h2 className="text-primary">Skill Set</h2>
                                <div className="skills">
                                    {profileById?.profileId?.skills?.map((item, index) => {
                                        return (<div className="p-1" key={index}><i className="fas fa-check"></i> {item}</div>)
                                    })}

                                </div>
                            </div>
                            <div className="profile-exp bg-white p-2">
                                <h2 className="text-primary">Experience</h2>

                                {profileById?.profileId?.experience?.length > 0 ? profileById?.profileId?.experience?.map((item, index) => {
                                    return (<ul className="profile-exp bg-white p-2">
                                        <li className="text-primary" key={index}><i className="fas fa-check"></i>
                                            Title :{item?.title}
                                        </li>
                                        <li className="text-primary" key={index}><i className="fas fa-check"></i>
                                            Compan: {item?.company}
                                        </li>
                                        <li className="text-primary" key={index}><i className="fas fa-check"></i>
                                            Location: {item?.location}
                                        </li>
                                        <li className="text-primary" key={index}><i className="fas fa-check"></i>
                                            From: {item?.from}
                                        </li>
                                        <li className="text-primary" key={index}><i className="fas fa-check"></i>
                                            To: {item?.to}
                                        </li>
                                    </ul>
                                    )
                                }) : (<h4>No experience credentials</h4>)}
                            </div>
                            <div className="profile-edu bg-white p-2">
                                <h2 className="text-primary">Education</h2>
                                {profileById?.profileId?.education?.length > 0 ? profileById?.profileId?.education?.map((item, index) => {
                                    return (<ul className="profile-exp bg-white p-2">
                                        <li className="text-primary" key={index}><i className="fas fa-check"></i>
                                            School :{item?.school}
                                        </li>
                                        <li className="text-primary" key={index}><i className="fas fa-check"></i>
                                            Degree: {item?.degree}
                                        </li>
                                        <li className="text-primary" key={index}><i className="fas fa-check"></i>
                                            Fieldofstudy: {item?.fieldofstudy}
                                        </li>
                                        <li className="text-primary" key={index}><i className="fas fa-check"></i>
                                            From: {item?.from}
                                        </li>
                                        <li className="text-primary" key={index}><i className="fas fa-check"></i>
                                            To: {item?.to}
                                        </li>
                                    </ul>
                                    )
                                }) : (<h4>No Education credentials</h4>)}
                            </div>
                        </div>
                    </section> : <Loading />
            }
        </>

    )




}


