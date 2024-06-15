import React, { useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";


function TopNavigation() {
    let navigate = useNavigate();
    let storeObj = useSelector((store) => {
        return store;
    });
    useEffect(() => {
        if (storeObj && storeObj.userDetails && storeObj.userDetails.email) {

        }
        else {
            navigate("/");
        }
    }, [navigate, storeObj]);
    return (
        <nav>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/task">Task</Link>
            <Link to="/editProfile">Edit Profile</Link>
            <Link to="/">Logout</Link>
        </nav>
    )
}

export default TopNavigation