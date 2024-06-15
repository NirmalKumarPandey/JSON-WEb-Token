import React from 'react'
import TopNavigation from "./TopNavigation";
import { useSelector } from 'react-redux';

function Dashboard() {
    let storeObj = useSelector((store) => {
        return store;
    })
    return (
        <div>
            <TopNavigation />
            <h2>Dashboard</h2>
            <h2>Welcome {storeObj.userDetails.firstName} {storeObj.userDetails.lastName}</h2>
            <img alt='' src={`http://localhost:4567/${storeObj.userDetails.profilePic}`}></img>
        </div>
    )
}

export default Dashboard