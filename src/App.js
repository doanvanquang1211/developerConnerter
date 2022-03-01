import logo from './logo.svg';
import './App.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Landing from './components/Landing';
import Register from './features/auth/Register';
import Login from './features/auth/Login';
import Alert from './features/alert/Alert';
import Dashboard from './components/Dashboard';
import EditProfile from './features/profile/EditProfile';
import AddExperience from './features/profile/AddExperience';
import PrivateRouter from './components/PrivateRouter';
import CreateProfile from './features/profile/CreateProfile';
import AddEducation from './features/profile/AddEducation';
import Developers from './features/profile/Developers';
import ProfileById from './features/profile/ProfileById';
import Post from './features/profile/Post';
import PostById from './features/profile/PostById';
import Loading from './features/loader/Loading';


function App() {
  return (

    <Router>
      <Navbar />
      <Alert />
      {/* <Loading /> */}
      <Routes>

        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<PrivateRouter component={Dashboard} />} />
        <Route path="/editprofile" element={<PrivateRouter component={EditProfile} />} />
        <Route path="/addexperience" element={<PrivateRouter component={AddExperience} />} />
        <Route path="/addeducation" element={<PrivateRouter component={AddEducation} />} />
        <Route path="/posts" element={<PrivateRouter component={Post} />} />
        <Route path="/posts/:postbyid" element={<PostById />} />
        <Route path="/create-profile" element={<CreateProfile />} />
        <Route path="/developers" element={<Developers />} ></Route>
        <Route path="/developers/:profilebyid" element={<ProfileById />} />
      </Routes>
    </Router>
  );
}

export default App;
