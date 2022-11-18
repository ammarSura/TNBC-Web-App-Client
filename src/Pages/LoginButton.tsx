import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithGoogle } from "../utils/firebase";
import request from 'axios';
import { useAuthState } from "react-firebase-hooks/auth";
import '../styles.css';

function LoginButton (){
    return (
        <div className="login"> 
            <div className="login__container">
                <h1>Welcome.</h1>
                <button className="login-btn" onClick={signInWithGoogle}>Sign In</button>
                {/* <button className="login-button" onClick={async() => {
                    const idToken = await signInWithGoogle()
                    console.log(idToken);
                    await request.post('http://localhost:3000/login', { idToken })
                    console.log('Logged in!')
                }}> */}
                {/* Sign in with Google
                </button> */}
            </div>
        </div>
    )
}

export default LoginButton;