import { signInWithGoogle } from "../utils/firebase";
import request from 'axios'
import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";


export const LoginButton = () => {
    const navigate = useNavigate();
    return (
        <Button colorScheme='green' variant={'solid'} onClick={async() => {
            const idToken = await signInWithGoogle()
            const { data: { accessToken } } = await request.post('http://localhost:3001/login', { idToken })
            localStorage.setItem('accessToken', JSON.stringify(accessToken))
            navigate('/image-selection')
        }}>
            Log In
        </Button>
    )
}