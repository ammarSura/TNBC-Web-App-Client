import { useState, useEffect, useRef } from "react";

type ImageCanvasProps = {
    src: string;
    x: number;
    y: number;
    color?: string;
    xOffset?: number;
}
export const ImageCanvas = ({
    src,
    x,
    y,
    color,
    xOffset=0
    }: ImageCanvasProps) => {
    const width = useRef(0);
    const height = useRef(0)
    useEffect(() => {
        const doc = document.getElementById(src) as HTMLCanvasElement
        const ctx = doc.getContext('2d')
        const img = new Image()
        img.src = src;
        img.addEventListener("load", e => {
            ctx!.drawImage(img, xOffset, 0)
            ctx!.fillStyle = color || 'rgba(0,225,225,0.5)'
            ctx!.fillRect(x, y, x, y)
            console.log(x, y)
        });
       
      }, [src, x, y])
    return (
        <canvas id={src} width={200} height={200} style={{ border: "1px solid #000" }}/>
    )
}