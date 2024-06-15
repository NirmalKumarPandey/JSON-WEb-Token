import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom';

function Signup() {
    let firstInputRef = useRef();
    let lastInputRef = useRef();
    let ageInputRef = useRef();
    let emailInputRef = useRef();
    let passwordInputRef = useRef();
    let mobileInputRef = useRef();
    let profilePicInputRef = useRef();


    let [profilePic, setProfilePic] = useState([]);

    let onSignup = async () => {

        let myHeader = new Headers();

        let dataTosend = {
            firstName: firstInputRef.current.value,
            lastName: lastInputRef.current.value,
            age: ageInputRef.current.value,
            email: emailInputRef.current.value,
            password: passwordInputRef.current.value,
            mobile: mobileInputRef.current.value,
            profilePic: profilePicInputRef.current.value,
        }
        myHeader.append("content-type", "application/json");

        let reqOptions = {
            method: "POST",
            headers: myHeader,
            body: JSON.stringify(dataTosend),
        }
        let JSONData = await fetch("http://localhost:4567/register", reqOptions);
        let JSOData = await JSONData.json();
        alert(JSOData.msg);
        console.log(JSOData);
    }
    let onSignupUsingUrlEncoded = async () => {
        alert("Signup Using Url Encoded");
        let myHeader = new Headers();
        myHeader.append("content-type", "application/x-www-form-urlencoded");
        let dataToSend = new URLSearchParams();
        dataToSend.append("firstName", firstInputRef.current.value);
        dataToSend.append("lastName", lastInputRef.current.value);
        dataToSend.append("age", ageInputRef.current.value);
        dataToSend.append("email", emailInputRef.current.value);
        dataToSend.append("password", passwordInputRef.current.value);
        dataToSend.append("mobile", mobileInputRef.current.value);
        dataToSend.append("profilePic", profilePicInputRef.current.value);
        let reqOption = {
            method: "POST",
            headers: myHeader,
            body: dataToSend,
        }
        let JSONData = await fetch("http://localhost:4567/register", reqOption);
        let JSOData = await JSONData.json();
        console.log(JSOData);

    }
    let onSignupUsingFormData = async () => {
        alert("Sending Form data");
        let dataToSend = new FormData();
        dataToSend.append("firstName", firstInputRef.current.value);
        dataToSend.append("lastName", lastInputRef.current.value);
        dataToSend.append("age", ageInputRef.current.value);
        dataToSend.append("email", emailInputRef.current.value);
        dataToSend.append("password", passwordInputRef.current.value);
        dataToSend.append("mobile", mobileInputRef.current.value);
        for (let i = 0; i < profilePicInputRef.current.files.length; i++) {
            dataToSend.append("profilePic", profilePicInputRef.current.files[i]);
        }

        let reqOption = {
            method: "POST",
            body: dataToSend,
        }
        let JSONData = await fetch("http://localhost:4567/register", reqOption);
        let JSOData = await JSONData.json();
        console.log(JSOData);
    }

    return (
        <div className='App'>
            <form>
                <div>
                    <label>First Name</label>
                    <input ref={firstInputRef}></input>
                </div>
                <div>
                    <label>Last Name</label>
                    <input ref={lastInputRef}></input>
                </div>
                <div>
                    <label>Age</label>
                    <input ref={ageInputRef}></input>
                </div>
                <div>
                    <label>Email</label>
                    <input ref={emailInputRef}></input>
                </div>
                <div>
                    <label>Password</label>
                    <input ref={passwordInputRef}></input>
                </div>
                <div>
                    <label>Mobile</label>
                    <input ref={mobileInputRef}></input>
                </div>
                <div>
                    <label>Profile Pic</label>
                    <input ref={profilePicInputRef} type='file' accept='image/*' onChange={(eo) => {
                        let selectedPicPath = URL.createObjectURL(eo.target.files[0])
                        setProfilePic(selectedPicPath);
                    }}></input>
                    <br></br>
                    <img alt='' src={profilePic} className='profilePicPreview'></img>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                    <button type='button' onClick={() => onSignup('json')}>Signup (JSON)</button>
                    <button type='button' onClick={() => onSignupUsingUrlEncoded()}>Signup (URL Encoded)</button>
                    <button type='button' onClick={() => onSignupUsingFormData()}>Signup (Form Data)</button>
                </div>

            </form>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <Link to="/">Login</Link>
        </div>
    )
}

export default Signup