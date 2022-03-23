import React, { useRef, useEffect } from 'react'

const Canvas = props => {

    const {draw, parentHeight, parentWidth} = props
    const canvasRef = useRef(null)

    useEffect(() => {

        const canvas = canvasRef.current
        const context = canvas.getContext('2d')
        //TODO: get size from span
        canvas.style.width ='100%';
        canvas.style.height='100%';
        canvas.width  = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;

        draw(context)
    }, [draw])




    return <canvas ref={canvasRef} {...props}/>
}

export default Canvas