import React, { useState } from "react";
import { useDispatch, useSelector, } from 'react-redux';
import { updatePost, } from "./postSlice";
import { addExperience } from "./profileSlice";
import { ToastContainer, toast } from 'react-toastify';

const initState = {
    text: ''
}
export default function CreatePost() {
    const post = useSelector(state => state.post)

    const [formData, setFormData] = useState(initState)
    const { text } = formData
    const dispatch = useDispatch()

    const onChange = (e) => {
        setFormData({
            ...formData, [e.target.name]: e.target.value
        })
    }
    const onSubmit = (e) => {
        e.preventDefault()
        dispatch(updatePost({ formData }))
        setFormData({ text: '' })
        dispatch(toast("Post created"))
    }

    return (
        <div className='post-form'>
            <div className='bg-primary p'>
                <h3>Say Something...</h3>
            </div>
            <form
                className='form my-1' onSubmit={onSubmit}>
                <textarea
                    name='text' cols='30' rows='5' placeholder='Create a post' value={text} onChange={onChange} required />
                <input type='submit' className='btn btn-dark my-1' value='Submit' />
            </form>
            <ToastContainer />
        </div>
    )
}
