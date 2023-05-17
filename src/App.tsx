import React from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";
import request from 'axios'
import { BrowserRouter, createBrowserRouter, Navigate, Route, Router, RouterProvider, Routes } from 'react-router-dom';
import Home from './pages/Home';
import { Box, ChakraProvider } from '@chakra-ui/react'
import ImageSelection from './pages/ImageSelection';
import { createContext } from 'react';
import AuthProvider from './contexts/Auth';

function App() {
  
  return (
    <ChakraProvider>
        <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Navigate to="/home"/>}/>
            <Route path="/home" element={<Home/>}/>
            <Route path="/image-selection" element={<ImageSelection/>}/>
          </Routes>
          </AuthProvider>
        </BrowserRouter>
    </ChakraProvider>
  )
}

export default App;
