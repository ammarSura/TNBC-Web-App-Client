import { signInWithGoogle } from "../utils/firebase";
import { Box, Button, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/Auth";
import { useContext } from "react";
import axios from "../utils/axios-init";


export const Login = () => {
    const { loginWithIdToken } = useAuth()
    // const axios = useAxios()

    return (
        <Box>
            <Text>
                Login using google
            </Text>
        <Button colorScheme='green' variant={'solid'} onClick={async() => {
            const idToken = await signInWithGoogle()
            loginWithIdToken(idToken)
        }}>
            Log In
        </Button>
        </Box>
    )
}
