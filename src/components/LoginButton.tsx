import { signInWithGoogle } from "../utils/firebase";
import request from 'axios'

export const LoginButton = () => {

    return (
        <button onClick={async() => {
            const idToken = await signInWithGoogle()
            console.log(idToken);
            await request.post('http://localhost:3000/login', { idToken })
            console.log('Logged in!')
        }}>
            Sign In
        </button>
    )
    
}