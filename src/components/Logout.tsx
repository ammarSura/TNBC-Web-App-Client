import { Button, HStack, Spinner, Text } from "@chakra-ui/react"
import { useAuth } from "../contexts/Auth"
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export const Logout = () => {
    const { logout, user } = useAuth()
    const navigate = useNavigate();
    return (
        <>
        {user ? <Text>Hi {user?.name}! You are logged in</Text> : <Spinner />}
        <HStack>
            <Button onClick={() => {
                navigate('/image-selection')
            }}>
                Start annotating images!
            </Button>
            <Button onClick={() => {
                logout()
            }}>
                Logout
            </Button>
        </HStack>

        </>
    )
}
