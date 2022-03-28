import * as React from "react";
import {Stack} from "@mui/material";
import Grid from "@mui/material/Grid";
import {useEffect, useRef} from "react";

export default function ProsodyTab(props) {

    const {selectedPoem} = props;

    let lineLength = 0
    let lineLengths = []
    let sampaStream = []

    //TODO: account for false syllable counts
    //get all sampa strings, relevant painte values & lineLenghts for rendering
    for (const token of selectedPoem.tokens) {
        if (!isNaN(token.syllableCount)) {
            for (let i = 0; i < token.sampa.length; i++) {
                if (token.b[i] > 0 && token.stress[i] === 1 && (token.c1[i] >= 50 || token.c2[i] >= 50)) {
                    sampaStream.push([token.sampa[i], true, token.b[i], token.c1[i], token.c2[i], token.d[i]]);
                    lineLength++;
                } else {
                    sampaStream.push([token.sampa[i], false]);
                    lineLength++;
                }
            }
        }
        if (token.newline === "1") {
            lineLengths.push(lineLength)
            lineLength = 0
        }
    }

    //determine min&max values
    let maxes = []
    let mins1 = []
    let mins2 = []

    for (const token of selectedPoem.tokens) {
        maxes = maxes.concat(token.d)
        mins1 = mins1.concat(token.c1)
        mins2 = mins2.concat(token.c2)
    }

    const max = maxes.filter(d => !isNaN(d)).reduce((prev, curr) => {
        return (prev > curr) ? prev : curr
    })
    const min = Math.min(maxes.filter(d => !isNaN(d)).map((item, index) => {
        return item - mins1.filter(c1 => !isNaN(c1))[index]
    }).reduce((prev, curr) => {
        return (prev < curr) ? prev : curr
    }), maxes.filter(d => !isNaN(d)).map((item, index) => {
        return item - mins2.filter(c2 => !isNaN(c2))[index]
    }).reduce((prev, curr) => {
        return (prev < curr) ? prev : curr
    }))

    //custom Canvas component
    const Canvas = props => {

        const {coordinates} = props

        const canvasRef = useRef(null)

        const adapter = 150 / (max - min)

        //ctx.canvas.width: 300 & ctx.canvas.height: 150
        const draw = ctx => {
            ctx.moveTo(0, ctx.canvas.height - (coordinates[5] - coordinates[3] - min) * adapter)
            ctx.lineTo(ctx.canvas.width / 2, ctx.canvas.height - (coordinates[5] - min) * adapter)
            ctx.moveTo(ctx.canvas.width / 2, ctx.canvas.height - (coordinates[5] - min) * adapter)
            ctx.lineTo(ctx.canvas.width, ctx.canvas.height - (coordinates[5] - coordinates[4] - min) * adapter)
            ctx.lineWidth = 10
            ctx.stroke()
        }

        useEffect(() => {

            const canvas = canvasRef.current
            const context = canvas.getContext('2d')
            //TODO: optimize: get size from span -> offsetWidth or https://stackoverflow.com/questions/118241/calculate-text-width-with-javascript
            draw(context)
        })


        return <canvas ref={canvasRef} {...props}/>
    }


    return (<div>
        <style>
            {`#preline {
          white-space: pre-line;
          font-style: calibri;
           font-size: 15px;
           color:black;
        }`}
        </style>
        <p id="preline">
            {lineLengths.map(wordInLine => {
                return <Grid container columnSpacing={0} sx={{justifyContent: 'center'}}>
                    {Array.from(Array(wordInLine).keys()).map(() => {
                        return <Grid item><Stack sx={{flexDirection: "column", display: "inline-flex"}}>
                            {/*div = dummy canvas, if paintE parameters not relevant*/}
                            {sampaStream[0][1] ? <Canvas coordinates={sampaStream[0]}
                                                         style={{
                                                             height: "20px",
                                                             width: Math.max(20, (sampaStream[0][0].length * 10)).toString() + "px"
                                                         }}/> : <div style={{
                                height: "20px", width: Math.max(20, (sampaStream[0][0].length * 10)).toString() + "px"
                            }}/>}
                            <span style={{
                                font: "arial", fontFamily: "sans-serif", cursor: 'pointer'
                            }}
                                  onClick={() => console.log("Do something fancy with clickable sampas")}>
                                                 {sampaStream.shift()[0]}
                                             </span>
                        </Stack></Grid>

                    })}</Grid>
            })}


        </p>
    </div>)
}
