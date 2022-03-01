import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export default function PrivateRouter({ component: Component }) {
    const auth = useSelector(state => state.auth)
    if (auth.token) {
        return <Component />
    }
    return <Navigate to={"/login"} />
}

