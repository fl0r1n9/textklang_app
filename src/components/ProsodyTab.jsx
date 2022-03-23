import * as React from "react";
import {VictoryAxis, VictoryChart, VictoryLabel, VictoryLine} from "victory";
import {poems} from "../data/poems";
import Canvas from './Canvas';
import Box from "@mui/material/Box";

export default function ProsodyTab(props) {

    const {json, id} = props;

    let displayText;

    const draw = (ctx) => {
        ctx.fillStyle = '#000000'
        ctx.borderColor = '#FFFFFF'
        //ctx.beginPath()
        //ctx.arc(50, 100, 20, 0, 2 * Math.PI)
        ctx.fill()
    }

    //find and display texts
    for (const key in poems) {

        if (poems[key].title === id[1]) {
            if (poems[key].text === "") {
                displayText = "Text nicht in der Datenbank";
            } else {
                displayText = poems[key].text;

            }
            break;
        }
    }

    let lineLength = 0
    let lineLengths = []
    let tokenNumbers = []
    for (const token of json.tokens) {

        if (!isNaN(token.syllableCount)) {
            lineLength++;
            tokenNumbers.push(json.tokens.indexOf(token))
        }
        if (token.newline === "1") {
            lineLengths.push(lineLength);
            lineLength = 0;
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
                {`#preline2 {
          white-space: pre-line;
          font-style: calibri;
          font-size: 15px;
          color:black;
        }`}
            </style>
            <p> {displayText.split(' ').map((wort, index) => {
                return( <div style={{width:"fit-content", height:"fit-content", border:'1px dotted black'}}>
                   <Canvas draw={draw} style={{border:'1px dotted black'}}/>
                <span style={{font: "arial", fontFamily: "sans-serif", cursor: 'pointer'}}
                             onClick={() => console.log(index)}>{wort + " "}</span>
                </div>)
            })}</p>
        </div>
    )
}
