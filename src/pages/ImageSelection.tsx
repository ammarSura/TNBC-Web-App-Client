import { useEffect, useState } from "react"
import { ImageCanvas } from "../components/ImageCanvas"
import request from 'axios'
import { ImageDisplay } from "../components/ImageDisplay"
import { Button, ButtonGroup } from '@chakra-ui/react'
export default () => {
    const [value, setValue] = useState(0)
    const [images, setImages] = useState<{
        url: string;
        id: string;
    }[]>([])

    const [coors, setCoors] = useState<{
        id: string;
        x: number;
        y: number;
    }[]>([])

    const [data, setData] = useState<{
        id: string;
        x: number;
        y: number;
        src: string;
    }[]>([])
    useEffect(() => {
        const token = localStorage.getItem('accessToken')
        const header = `${token}`;
        request.get('http://localhost:3001/images', { headers: { Authorization: header }}).then(({data}) => {
            const { images } = data
            setImages(images)
        })
    }, [])
    useEffect(() => {
        const token = localStorage.getItem('accessToken')
        const header = `${token}`;
        if(images.length > 0) {
            console.log(images)

            const coordinateMap = images.map(({id, url}) => {
                console.log(id, url)
                return request.get(`http://localhost:3001/coordinates/${id}`, { headers: { Authorization: header }})
                    .then(({ data }) => {
                        const { x, y } = data
                        return {
                            x, y, id, src: url
                        }
                    })
            })

            Promise.all(coordinateMap).then((data) => {
                setData(data)
            })
            
        }
  
    }, [images])

    return(
        <>
            <ImageDisplay 
                images={data}
                imageWidth={200} 
                value={value}
                setValue={setValue}
            />
            <Button colorScheme='green' variant={'solid'}>Submit</Button>
        </>
        
    )
}