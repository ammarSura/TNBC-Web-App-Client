import { useEffect, useState } from "react"
import { Button, Spinner, Image, Text, VStack, HStack } from '@chakra-ui/react'
import { useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/Auth"
import axios from "../utils/axios-init";
export default () => {
    const navigate = useNavigate();

    const { logout, accessToken, isAuthenticated, user } = useAuth()
    const [noMoreImages, setNoMoreImages] = useState(false)
    const [imageId, setImageId] = useState<string | null>(null)
    const [imageUrl, setImageUrl] = useState<string | null>(null)

    useEffect(() => {
        if(accessToken) {
            (async () => {
                const { data } = await axios.get('/image', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                })
                if(data.message) {
                    setNoMoreImages(true)
                } else if(data.imageId) {
                    console.log(data)
                    setImageId(data.imageId)
                    setImageUrl(data.url)
                }
            }
            )();
        }
    }, [accessToken, imageId, imageUrl])

    return(
        <VStack>

        {user ? <Text>Hi {user?.name}! You are logged in</Text> : <Spinner />}
        {noMoreImages ? <Text>No more images to annotate</Text> : null}
        {
            (imageId && imageUrl) ?
            <>
            <Image src={imageUrl}/>
            <Text>Image ID: {imageId}</Text>
            <HStack>
                <Button onClick={async() => {
                    await axios.post('/mask', {
                        imageId,
                    }, {
                        headers: {
                            Authorization: `Bearer ${accessToken}`
                        }
                    })

                    setImageId(null)
                    setImageUrl(null)
                }}>Save</Button>
            </HStack>

            </>

        : !noMoreImages ? <Spinner /> : null }

        </VStack>

    )
}
