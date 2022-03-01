import { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getAllProfile, getProfileById } from "./profileSlice";
import Loading from "react-loading";

export default function Developers() {
    const profiles = useSelector(state => state.profile)
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(undefined)

    useEffect(() => {
        setTimeout(() => {
            setLoading(true)

        }, 1000);
        dispatch(getAllProfile())
    }, [])
    const onClick = (id) => {
        dispatch(getProfileById(id))
    }

    return (
        <>
            {
                loading ?

                    <section className="container">
                        <h1 className="large text-primary">Developers</h1>
                        <p className="lead"><i className="fab fa-connectdevelop"></i> Browse and connect with developers</p>
                        <div className="profiles">
                            {profiles?.allProfile.map((item, index) => {
                                return (
                                    <div className="profile bg-light" key={index}>

                                        <img src={item.user.avatar} alt="" />
                                        <div>
                                            <h2>{item.user.name}</h2>
                                            <p>{item.status} <span> at{item.company}</span></p>
                                            <p className="my-1"><span>{item.location} </span></p>
                                            <Link onClick={() => onClick(item.user._id)} className="btn btn-primary" to={`/developers/${item.user._id}`}>View Profile</Link>
                                        </div>
                                        <ul>
                                            {item.skills.map((item, index) => {
                                                return (
                                                    <li className="text-primary" key={index}><i className="fas fa-check"></i> {item}</li>
                                                )
                                            })}
                                        </ul>
                                    </div>
                                )
                            })}
                        </div>
                    </section> : <Loading />

            }
        </>

    )
}

// }


