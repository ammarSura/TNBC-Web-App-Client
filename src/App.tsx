import React from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";
import request from 'axios'
import { LoginButton } from './LoginButton';

function App() {
  return (
    <LoginButton/>
  );
}

export default App;
