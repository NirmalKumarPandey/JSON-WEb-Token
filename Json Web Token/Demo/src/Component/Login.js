import React, { useRef, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

function Login() {

    let emailInputRef = useRef();
    let passwordInputRef = useRef();
    let dispatch = useDispatch();

    let navigate = useNavigate();

    let validateToken = async () => {
        let dataToSend = new FormData();
        dataToSend.append("token", localStorage.getItem("token"));

        let reqOption = {
            method: "POST",
            body: dataToSend,
        }
        let JSONData = await fetch("http://localhost:4567/validateToken", reqOption);
        let JSOData = await JSONData.json();
        console.log(JSOData);
        // Copy this code...................

        if (JSOData.status === "success") {
            dispatch({ type: "login", data: JSOData.data });
            navigate("/dashboard");
        }
        else {
            alert(JSOData.msg);
        }
    }

    let validateLogin = async () => {
        let dataToSend = new FormData();
        dataToSend.append("email", emailInputRef.current.value);
        dataToSend.append("password", passwordInputRef.current.value);
        let reqOption = {
            method: "POST",
            body: dataToSend,
        }
        let JSONData = await fetch("http://localhost:4567/login", reqOption);
        let JsoData = await JSONData.json();
        if (JsoData.status === "success") {
            // Want to store credential into local Storage
            //   localStorage.setItem("email", emailInputRef.current.value);
            //   localStorage.setItem("password", passwordInputRef.current.value);

            // Want to store credential into local storage
            // Now , I do not want to store username and password into local storage. Instead , we store token.
            localStorage.setItem("token", JsoData.data.token);
            // Now , I do not want to store username and password into local storage. Instead , we store token.
            dispatch({ type: "login", data: JsoData.data });
            navigate("/dashboard");
        }
        else {
            alert(JsoData.msg);
        }
        console.log(JsoData);
    }
    useEffect(() => {
        // Auto login work properly.....
        emailInputRef.current.value = localStorage.getItem("email");
        passwordInputRef.current.value = localStorage.getItem("password");
        validateLogin();

        // I wanted to send token , when token exist and 
        // When we send this token Server recieve this token.
        //After That , You sholud Decript it.
        //  if (localStorage.getItem("token")) {
        //      validateToken();
        //   }

    }, []);

    return (
        <div className='App'>
            <form>
                <h2>Login Page</h2>

                <div>
                    <label>Email</label>
                    <input ref={emailInputRef}></input>
                </div>
                <div>
                    <label>Password</label>
                    <input ref={passwordInputRef}></input>
                </div>

                <div>
                    <button type='button' onClick={() => validateLogin()}>Login</button>
                </div>

            </form>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <Link to="/signup">Signup</Link>
        </div>
    )
}

export default Login