import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addComment } from './postSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const initState = {
    text: ''
}
function FormComment() {
    const postId = useSelector(state => state.post)
    const [formData, setFormData] = useState(initState)
    const { text } = formData
    const dispatch = useDispatch()

    const onChange = (e) => {
        console.log(e.target.value);
        setFormData({

            ...formData, [e.target.name]: e.target.value
        })
    }
    const onSubmit = (postId) => (e) => {
        e.preventDefault()
        dispatch(addComment({ postId, formData }))
        setFormData({ text: '' })
        dispatch(toast("Comment Added"))
    }

    return (
        <section>
            <ToastContainer />
            <form className="form my-1" onSubmit={onSubmit(postId?.post?._id)}>
                <textarea value={text} onChange={onChange} name="text" cols="30" rows="5" placeholder="Comment the post" required=""></textarea>
                <input type="submit" className="btn btn-dark my-1" value="Submit" />
            </form>

        </section>
    );
}

export default FormComment;