import { ImageCanvas } from "./ImageCanvas";
import { Box, HStack, Radio, RadioGroup } from '@chakra-ui/react'

type Image = {
    src: string;
    x: number;
    y: number;
}

type ImageDisplayProps = {
    images: Image[];
    color?: string;
    imageWidth: number;
    offset?: number;
    value: number;
    setValue: (value: number) => void;
}

export const ImageDisplay = ({
    images,
    color,
    imageWidth,
    offset=0,
    value,
    setValue
}: ImageDisplayProps) => {

    const returnedImages = images.map((image, i) => <Box>
        <Radio value={i}></Radio>
        <ImageCanvas src={image.src} x={image.x} y={image.y} color={color}/>
        </Box>)
    return (
        <RadioGroup onChange={(e) => setValue(parseInt(e))} value={value}>
        <HStack>
            {returnedImages}          
        </HStack>
        </RadioGroup>
    )
    
    
}