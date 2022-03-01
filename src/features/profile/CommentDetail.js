import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteComment } from './postSlice';
import { ToastContainer, toast } from 'react-toastify';

function CommentDetail() {
    const postId = useSelector(state => state.post)
    const auth = useSelector(state => state.auth)

    const dispatch = useDispatch()
    const onClick = (postId, post) => {
        dispatch(deleteComment({ postId, post }))
        dispatch(toast("Comment removed"))
    }
    return (
        <div className="comments">
            <ToastContainer />
            {postId?.post?.comments?.map((item, index) => {
                return (
                    <div className="post bg-white p-1 my-1" key={index}>
                        <div>
                            <Link style={{ textDecoration: "none" }} to={`/developers/${item?.user}`}>
                                <img className="round-img" src={item?.avatar} alt="" />
                                <h4>{item?.name}</h4>
                            </Link>
                        </div>
                        <div>
                            <p className="my-1">{item?.text}</p>
                            <p className="post-date">Posted on {item?.date}</p>
                            {item.user == auth.user._id ? (<button onClick={() => onClick(postId?.post?._id, item?._id)} type="button" className="btn btn-danger"><i className="fas fa-times"></i></button>) : ''}
                        </div>
                    </div>

                )
            })}

        </div>
    );
}

export default CommentDetail;