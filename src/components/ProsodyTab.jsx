import * as React from "react";
import {VictoryAxis, VictoryChart, VictoryLabel, VictoryLine} from "victory";
import {Stack} from "@mui/material";
import Grid from "@mui/material/Grid";
import {useEffect, useRef} from "react";

export default function ProsodyTab(props) {

    const {json, setCanvasActive} = props;


    let lineLength = 0
    let lineLengths = []
    let sampaStream = []
    let isRelevant = []


    //TODO: account for false syllable counts
    //get all sampa strings & lineLenghts
    for (const token of json.tokens) {
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

    for (const token of json.tokens) {
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

//TODO: set false when Component is inactive -> useEffect
    setCanvasActive(true);


    const Canvas = props => {

       const {coordinates} = props

        const canvasRef = useRef(null)

        //canvas.width: 300 & canvas.height: 150
        const draw = ctx => {
            ctx.moveTo(0, coordinates[5]-coordinates[3])
            ctx.lineTo(coordinates[2], coordinates[5])
            ctx.moveTo(ctx.canvas.width/2, coordinates[5])
            ctx.lineTo(ctx.canvas.width, coordinates[5]-coordinates[4])

            //console.log(coordinates[2], coordinates[5], max, min)


            ctx.lineWidth = 10
            ctx.stroke()
        }

        useEffect(() => {

            const canvas = canvasRef.current
            const context = canvas.getContext('2d')
            //TODO: get size from span -> offsetWidth? or https://stackoverflow.com/questions/118241/calculate-text-width-with-javascript
            draw(context)
        }, [draw])


        return <canvas ref={canvasRef} {...props}/>
    }




    function renderPlots(tokenNo) {

        const DataLabel = props => {
            const x = props.scale.x(props.x);
            const y = props.scale.y(props.y);
            return <VictoryLabel {...props} x={x} y={y}/>
        };

        //TODO: optimize: replace with VictoryGroup, delete Axis and resize /
        return (<div style={{display: "inline-block", width: "fit-content", height: "fit-content"}}>
                <VictoryChart style={{parent: {maxWidth: "100%"}}} minDomain={{x: 0, y: 0}}
                              maxDomain={{x: json.tokens[tokenNo].syllableCount, y: 300}}>
                    <VictoryAxis style={{
                        axis: {stroke: "transparent"}, ticks: {stroke: "transparent"}, tickLabels: {fill: "transparent"}
                    }}/>
                    {Array.from(Array(json.tokens[tokenNo].syllableCount).keys()).map((value) => (<VictoryLine data={[{
                            x: value, y: (json.tokens[tokenNo].d[value] - json.tokens[tokenNo].c1[value])
                        }, {
                            x: Math.abs(json.tokens[tokenNo].b[value] - Math.trunc(json.tokens[tokenNo].b[value])) + value,
                            y: json.tokens[tokenNo].d[value]
                        }, {
                            x: value + 1, y: (json.tokens[tokenNo].d[value] - json.tokens[tokenNo].c2[value])
                        }

                        ]}
                        />


                    ))}
                    {Array.from(Array(json.tokens[tokenNo].syllableCount).keys()).map((value) => (

                        <DataLabel
                            x={value + 0.25}
                            y={min + 1}
                            text={json.tokens[tokenNo].sampa[value]}
                            style={{fontSize: 70}}

                        />

                    ))}

                </VictoryChart>
            </div>

        );


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
                                                             border: '1px dotted black',
                                                             height: "20px",
                                                             width: Math.max(20, (sampaStream[0][0].length * 10)).toString() + "px"
                                                         }}/> : <div style={{
                                height: "20px", width: Math.max(20, (sampaStream[0][0].length * 10)).toString() + "px"
                            }}/>}
                            <span key="1"
                                  style={{
                                      border: '1px dotted black',
                                      font: "arial",
                                      fontFamily: "sans-serif",
                                      cursor: 'pointer'
                                  }}
                                  onClick={() => console.log("")}>
                                                 {sampaStream.shift()[0]}
                                             </span>
                        </Stack></Grid>

                    })}</Grid>
            })}


        </p>
    </div>)
}
