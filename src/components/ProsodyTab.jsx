import * as React from "react";
import {VictoryAxis, VictoryChart, VictoryGroup, VictoryLabel, VictoryLine} from "victory";
import Grid from "@mui/material/Grid";
import {styled} from "@mui/material/styles";
import Paper from "@mui/material/Paper";

export default function ProsodyTab(props) {

    const {json} = props;


    const Item = styled(Paper)(({theme}) => ({
        ...theme.typography.body2, padding: theme.spacing(1), textAlign: 'center', color: theme.palette.text.secondary,
    }));

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


        let min = 80;
        let max;


        //TODO: optimize: replace with VictoryGroup, delete Axis and resize /
        return (
            <div style={{display: "inline-block", width: "fit-content", height: "fit-content"}}>
                <VictoryChart style={{parent: {maxWidth: "100%"}}} minDomain={{x: 0, y: 80}}
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
                            y={min}
                            text={json.tokens[tokenNo].sampa[value]}
                            style={{fontSize: 70}}

                        />

                    ))}

                </VictoryChart>
            </div>

        );


    }

    //TODO: for ContentPage:  <span>{word}</span> statt <Item>

    return (lineLengths.map(wordInLine => {
            return <div style={{flexDirection: 'row', display: 'inline-flex'}}>
                {Array.from(Array(wordInLine).keys()).map(() => {
                    return <div style={{flexDirection: 'row', display: 'inline-flex'}}>
                     <span>  {renderPlots(tokenNumbers.shift())} </span>

                    </div>
                })}</div>
        })

    )
}
