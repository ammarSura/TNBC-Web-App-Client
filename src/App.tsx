import React from "react";
import { Router, RouteComponentProps } from "@reach/router";
import "./styles.css";
// import { BrowserRouter as Router, Route } from 'react-router-dom';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";
import request from 'axios';
import Home from "./Pages/Home";
import LoginButton from './Pages/LoginButton';

const RouterPage = (
  props: { pageComponent: JSX.Element } & RouteComponentProps
) => props.pageComponent;

function App() {
  return (
    <div className="app">
      <Router>
        <RouterPage path="/" pageComponent={<LoginButton/>} />
      </Router>
    </div>
    
  );
}

export default App;

// import React from 'react';
// import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
// import { initializeApp } from "firebase/app";
// import request from 'axios'
// import LoginButton from './Pages/LoginButton';
// import "./styles.css";

// function App() {
//   return (
//     <div>
//       <h1>hello</h1>
//       {/* <LoginButton/> */}
//     </div>
   
//   );
// }

// export default App;