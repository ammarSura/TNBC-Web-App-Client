import { useState, useEffect, useRef } from "react";

type ImageCanvasProps = {
    src: string;
    x: number;
    y: number;
    color?: string;
}
export const ImageCanvas = ({
    src,
    x,
    y,
    color,
    }: ImageCanvasProps) => {
    const [width, setWidth] = useState(0)
    const [height, setHeight] = useState(0)
    const canvas = useRef();

    useEffect(() => {
        const doc = document.getElementById('canvas') as HTMLCanvasElement
        const ctx = doc.getContext('2d')
        const img = new Image()
        img.src = src;
        img.onload = () => {
            ctx!.drawImage(img, 0, 0)
            ctx!.fillStyle = color || 'rgba(0,225,225,0.5)'
            ctx!.fillRect(0, 0, x, y)
            console.log('drawn', x, y)
            setWidth(img.width)
            setHeight(img.height) 
        }
       
      }, [])

      console.log(width, height)
    return (
        <canvas id="canvas" width={width} height={height} style={{ border: "1px solid #d3d3d3" }}/>
    )
}