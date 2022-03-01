import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CommentDetail from "./CommentDetail";
import FormComment from "./FormComment";
import Loading from "../loader/Loading";

export default function PostById() {
    const postId = useSelector(state => state.post)
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
                        <Link className="btn" to="/posts">Back To Posts</Link>
                        <div className="post bg-white p-1 my-1">
                            <div>
                                <Link style={{ textDecoration: "none" }} to={`/developers/${postId?.post?.user}`}>
                                    <img className="round-img" src={postId?.post?.avatar} alt="" />
                                    <h4>{postId?.post?.name}</h4>
                                </Link>
                            </div>
                            <div>
                                <p className="my-1">{postId?.post?.text}</p>
                                <p className="post-date">Posted on {postId?.post?.date}</p>
                            </div>
                        </div>
                        <div className="post-form">
                            <div className="bg-primary p">
                                <h3>Leave a Comment</h3>
                            </div>

                            <FormComment />
                            <CommentDetail />
                        </div>
                    </section > : <Loading />
            }
        </>

    )




}
