import * as React from "react";
import {VictoryChart, VictoryLine} from "victory";
import Grid from "@mui/material/Grid";
import {styled} from "@mui/material/styles";
import Paper from "@mui/material/Paper";

export default function ProsodyTab(props) {

    const {json} = props;

    const Item = styled(Paper)(({theme}) => ({
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    let sentenceLength = 0
    let sentenceLengths = []
    for (const token of json.tokens) {

        sentenceLength++;
        if (token.newline === "1") {
            sentenceLengths.push(sentenceLength);
            sentenceLength = 0;
        }


    }


    function renderPlots() {


        return (


            <VictoryChart minDomain={{x: 0, y: 0}} maxDomain={{x: 1, y: 300}}>
                <VictoryLine data={[
                    {x: 0, y: (json.tokens[1].d - json.tokens[1].c1)},
                    {x: json.tokens[1].b, y: (json.tokens[1].d - json.tokens[1].c2)}
                ]}/>

            </VictoryChart>
        );

    }

//TODO: create components per line
    console.log(sentenceLengths);
    return (
        sentenceLengths.map(sentence => {

            return <Grid container columnSpacing={3}> {Array.from(Array(sentence).keys()).map(word => {
                return <Grid item>
                <Item>{word}</Item>
                {/*  TODO: for ContentPage:  <span>{word}</span>*/}
                </Grid>})}</Grid>
        })


    )
}
