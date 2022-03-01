import React, { useState, useEffect } from "react";
import Loading from "../loader/Loading";
import CreatePost from "./CreatePost";
import GetAllPost from "./GetAllPost";

export default function Post() {
    const [loading, setLoading] = useState(undefined)
    useEffect(() => {
        setTimeout(() => {
            setLoading(true)
        }, 1000);
    }, [])
    return (
        <>
            {

                loading ?

                    <section className="container">

                        <h1 className="large text-primary">Posts</h1>
                        <p className="lead">
                            <i className="fas fa-user" /> Welcome to the community
                        </p>
                        <CreatePost />
                        <GetAllPost />

                    </section> : <Loading />
            }
        </>

    )

}
