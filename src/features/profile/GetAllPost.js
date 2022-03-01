import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, } from "react-router-dom";
import { addLike, getAllPost, getPostById, deletePost, unLike } from "./postSlice";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { authUser } from "../auth/authSlice";

export default function GetAllPost() {

    const auth = useSelector(state => state.auth)
    const post = useSelector(state => state.post)
    // const [loading, setLoading] = useState(undefined)

    const dispatch = useDispatch()

    useEffect(() => {

        dispatch(authUser())
        dispatch(getAllPost())


    }, [])
    const removePost = (id) => {
        dispatch(deletePost(id))
        dispatch(toast("Post removed"))
    }
    const onClick = (id) => {
        dispatch(getPostById(id))
    }
    const AddLike = (id) => {
        dispatch(addLike(id))
        setTimeout(() => {
            dispatch(getAllPost())
        }, 500);
    }
    const UnLike = (id) => {
        dispatch(unLike(id))
        setTimeout(() => {
            dispatch(getAllPost())
        }, 500);
    }
    return (
        <>

            <section className="container">
                <ToastContainer />
                <div>
                    {post?.posts?.map((item, index) => {
                        return (
                            <div className="posts" key={index} >
                                <div className="post bg-white p-1 my-1">
                                    <div><Link style={{ textDecoration: "none" }} to={`/developers/${item?.user}`}>
                                        <img className="round-img" src={item?.avatar} alt="" />
                                        <h4>{item?.name}</h4>
                                    </Link>
                                    </div>
                                    <div>
                                        <p className="my-1">{item?.text}</p>
                                        <p className="post-date">Posted on {item?.date}</p>
                                        <button onClick={() => AddLike(item._id)} type="button" className="btn btn-light">
                                            <i className="fas fa-thumbs-up"></i>
                                            {item?.likes.length > 0 ? (<span>{item?.likes?.length}</span>) : ''}
                                        </button>
                                        <button onClick={() => UnLike(item._id)} type="button" className="btn btn-light">
                                            <i className="fas fa-thumbs-down"></i>
                                        </button>
                                        <Link onClick={() => onClick(item._id)} className="btn btn-primary" to={`/posts/${item._id}`}>Discussion {item?.comments.length > 0 ? (<span style={{ backgroundColor: "#fff", borderRadius: "50%", color: "#333", padding: "2px" }}>{item?.comments?.length}</span>) : ''} </Link>
                                        {item.user === auth.user._id ? (<button onClick={() => removePost(item._id)} type="button" className="btn btn-danger"><i className="fas fa-times"></i></button>) : ''}

                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </section>

        </>

    )


}


