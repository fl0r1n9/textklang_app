import React, { useRef, useEffect } from 'react'

const Canvas = props => {

    const {draw} = props
    const canvasRef = useRef(null)

    useEffect(() => {

        const canvas = canvasRef.current
        const context = canvas.getContext('2d')
        //TODO: get size from span -> offsetWidth? or https://stackoverflow.com/questions/118241/calculate-text-width-with-javascript

        draw(context)
    }, [draw])




    return <canvas ref={canvasRef} {...props}/>
}

export default Canvas