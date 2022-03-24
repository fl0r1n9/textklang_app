import * as React from "react";
import {VictoryAxis, VictoryChart, VictoryLabel, VictoryLine} from "victory";
import Canvas from './Canvas';
import {Stack} from "@mui/material";
import Grid from "@mui/material/Grid";

export default function ProsodyTab(props) {

    const {json, setCanvasActive} = props;


    const draw = (ctx) => {
        ctx.moveTo(0,0)
        ctx.lineTo(ctx.canvas.width,ctx.canvas.height)
        ctx.stroke()
        setCanvasActive(true);
    }

    let lineLength = 0
    let lineLengths = []
    let sampaStream = [];

    for (const token of json.tokens) {

        if (!isNaN(token.syllableCount)) {
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

    function renderPlots(tokenNo) {

        const DataLabel = props => {
            const x = props.scale.x(props.x);
            const y = props.scale.y(props.y);
            return <VictoryLabel {...props} x={x} y={y}/>
        };

        //TODO: filter out non-relevant curves & determine min/max


        let min = 0;
        let max;


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
                    return <Grid container columnSpacing={0} sx={{justifyContent:'center'}}>
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
