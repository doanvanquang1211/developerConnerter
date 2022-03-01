import { useState, useEffect } from 'react';
import { Link, useNavigate, } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { editProfile, getLoggedProfile, } from "./profileSlice"
import { ToastContainer, toast } from 'react-toastify';

const initState = {
    bio: "",
    company: "",
    location: "",
    skills: [],
    status: "",
    website: "",
}
export default function EditProfile() {
    const profile = useSelector(state => state.profile)
    // console.log("l", profile);
    const [formData, setFormData] = useState(initState)
    const { bio, company, githubusername, location, skills, status, website } = formData
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onChange = (e) => {
        setFormData({
            ...formData, [e.target.name]: e.target.value
        })

    }

    // useEffect(() => {

    //     dispatch(getLoggedProfile())


    // }, [])
    const onSubmit = (e) => {
        e.preventDefault()
        dispatch(editProfile({ formData, navigate }))
        dispatch(toast("Profile Updated"))
    }

    return (
        <div>

            <div className="alert-wrapper"></div>
            <section className="container">
                <h1 className="large text-primary">Edit Your Profile</h1>
                <p className="lead"><i className="fas fa-user"></i> Add some changes to your profile</p>
                <small>* = required field</small>
                <ToastContainer />
                <form className="form" onSubmit={onSubmit}>
                    <div className="form-group">
                        <select name="status" value={status} onChange={onChange}>
                            <option>* Select Professional Status</option>
                            <option value="Developer">Developer</option>
                            <option value="Junior Developer">Junior Developer</option>
                            <option value="Senior Developer">Senior Developer</option>
                            <option value="Manager">Manager</option>
                            <option value="Student or Learning">Student or Learning</option>
                            <option value="Instructor">Instructor or Teacher</option>
                            <option value="Intern">Intern</option>
                            <option value="Other">Other</option>
                        </select>
                        <small className="form-text">Give us an idea of where you are at in your career</small>
                    </div>
                    <div className="form-group">
                        <input type="text" placeholder="Company" name="company" value={company} onChange={onChange} />
                        <small className="form-text">Could be your own company or one you work for</small>
                    </div>
                    <div className="form-group">
                        <input type="text" placeholder="Website" name="website" value={website} onChange={onChange} />
                        <small className="form-text">Could be your own or a company website</small>
                    </div><div className="form-group">
                        <input type="text" placeholder="Location" name="location" value={location} onChange={onChange} />
                        <small className="form-text">City &amp; state suggested (eg. Boston, MA)</small>
                    </div>
                    <div className="form-group">
                        <input type="text" placeholder="* Skills" name="skills" value={skills} onChange={onChange} />
                        <small className="form-text">Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)</small>
                    </div>
                    <div className="form-group">
                        <input type="text" placeholder="Github Username" name="githubusername" value={githubusername} onChange={onChange} />
                        <small className="form-text">If you want your latest repos and a Github link, include your username</small>
                    </div>
                    <div className="form-group"><textarea placeholder="A short bio of yourself" name="bio" value={bio} onChange={onChange}></textarea>
                        <small className="form-text">Tell us a little about yourself</small>
                    </div>
                    <div className="my-2"><button type="button" className="btn btn-light">Add Social Network Links</button>
                        <span>Optional</span>
                    </div><input type="submit" className="btn btn-primary my-1" />
                    <a className="btn btn-light my-1" href="/dashboard">Go Back</a>
                </form>

            </section>
        </div>
    );





}

