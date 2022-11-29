import React from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";
import request from 'axios'
import { LoginButton } from './LoginButton';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import { ChakraProvider } from '@chakra-ui/react'
import ImageSelection from './pages/ImageSelection';


const router = createBrowserRouter([
  {
    path: '/home',
    element: <Home/>,
  },
  {
    path: '/image-selection',
    element: <ImageSelection/>,
  }
])
  


function App() {
  return (
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>

  );
}

export default App;
