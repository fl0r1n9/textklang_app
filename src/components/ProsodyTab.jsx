import * as React from "react";
import {VictoryAxis, VictoryChart, VictoryLabel, VictoryLine} from "victory";
import Canvas from './Canvas';
import {Stack} from "@mui/material";
import Grid from "@mui/material/Grid";

export default function ProsodyTab(props) {

    const {json, setCanvasActive} = props;

    //TODO: set false when Component is inactive
    setCanvasActive(true);

    let lineLength = 0
    let lineLengths = []
    let sampaStream = [];



    //get all sampa strings & lineLenghts
    for (const token of json.tokens) {
        if (!isNaN(token.syllableCount)) {
            //TODO: fori filter out non-relevant curves -> dummy canvas
            for (const sampa of token.sampa) {
                sampaStream.push(sampa);
                lineLength++;
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






    const draw = (ctx) => {
        ctx.moveTo(0, 0)
        ctx.lineTo(ctx.canvas.width, ctx.canvas.height)
        ctx.stroke()
    }


    function renderPlots(tokenNo) {

        const DataLabel = props => {
            const x = props.scale.x(props.x);
            const y = props.scale.y(props.y);
            return <VictoryLabel {...props} x={x} y={y}/>
        };

        //TODO: optimize: replace with VictoryGroup, delete Axis and resize /
        return (
            <div style={{display: "inline-block", width: "fit-content", height: "fit-content"}}>
                <VictoryChart style={{parent: {maxWidth: "100%"}}} minDomain={{x: 0, y: 0}}
                              maxDomain={{x: json.tokens[tokenNo].syllableCount, y: 300}}>
                    <VictoryAxis style={{
                        axis: {stroke: "transparent"},
                        ticks: {stroke: "transparent"},
                        tickLabels: {fill: "transparent"}
                    }}/>
                    {Array.from(Array(json.tokens[tokenNo].syllableCount).keys()).map((value) => (
                        <VictoryLine data={[
                            {
                                x: value,
                                y: (json.tokens[tokenNo].d[value] - json.tokens[tokenNo].c1[value])
                            }, {
                                x: Math.abs(json.tokens[tokenNo].b[value] - Math.trunc(json.tokens[tokenNo].b[value])) + value,
                                y: json.tokens[tokenNo].d[value]
                            }, {
                                x: value + 1,
                                y: (json.tokens[tokenNo].d[value] - json.tokens[tokenNo].c2[value])
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

    return (
        <div>
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
                                    <Canvas draw={draw}
                                            style={{
                                                border: '1px dotted black',
                                                height: "20px",
                                                width: Math.max(20, (sampaStream[0].length * 10)).toString() + "px"
                                            }}/>
                                    <span key="1"
                                          style={{
                                              border: '1px dotted black',
                                              font: "arial",
                                              fontFamily: "sans-serif",
                                              cursor: 'pointer'
                                          }}
                                          onClick={() => console.log("")}>
                                                 {sampaStream.shift()}
                                             </span>
                                </Stack></Grid>

                            }
                        )}</Grid>
                })}


            </p>
        </div>
    )
}
