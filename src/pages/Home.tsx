import { Box, Button, Center, Heading, Text, VStack } from '@chakra-ui/react'
import { Login } from '../components/Login'
import { signInWithGoogle } from '../utils/firebase'
import request from 'axios'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/Auth'
import { Logout } from '../components/Logout'
import { useEffect } from 'react'
import axios from "../utils/axios-init";


export default () => {
    const { isAuthenticated, logout } = useAuth()
    const loggedIn = isAuthenticated
    return(
        <Box>
            <Heading>TNBC Web App Client</Heading>

        {!loggedIn ?
            <Login/>
        :
            <Logout/>
        }
        </Box>
    )
}
