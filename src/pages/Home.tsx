import { Box, Center, Heading, Text, VStack } from '@chakra-ui/react'
import { LoginButton } from '../components/LoginButton'


export default () => {
    return(
        <Center alignContent={'center'}>
            <VStack>
                <Heading>TNBC Web App Client</Heading>
                <Text>Log in with Google to access testing portal</Text>
                <LoginButton/>
            </VStack>
            
                

        </Center>
    )
}