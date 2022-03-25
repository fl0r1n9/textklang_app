import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {poems} from "../data/poems"
import Highlighter from "react-highlight-words";

import {Stack} from "@mui/material";
import Grid from "@mui/material/Grid";


export default function ContentPage(props) {

    //parameters destructured
    const {id, setId, searchInput, setValue, json, TabPanel, canvasActive, setCanvasActive} = props;


    let displayText;


    //find and display texts, old
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


    let tokenStream = [];
    let lineLength = 0
    let lineLengths = []

    for (const token of json.tokens) {
        if (token.tokenString === ".") {
            tokenStream[tokenStream.length - 1] = tokenStream.slice(-1)[0].concat(".")
        } else if (token.tokenString === ",") {
            tokenStream[tokenStream.length - 1] = tokenStream.slice(-1)[0].concat(",")
        } else {
            tokenStream.push(token.tokenString)
            lineLength++
        }
        if (token.newline === "1") {
            lineLengths.push(lineLength)
            lineLength = 0
        }

    }

    return (
        //TODO: optimize: spawns DOMNesting error, align screen-scrolling containers better?*/
        <TabPanel value={0} index={0}>
            <Box>
                <h3> {id[0] + " - " + id[1]}</h3>

                <style>
                    {`#preline2 {
          white-space: pre-line;
          font-style: calibri;
           font-size: 15px;
           color:black;
        }`}
                </style>

                <p id="preline2">
                    {lineLengths.map(wordInLine => {
                        return <Grid container columnSpacing={1} sx={{justifyContent: 'center'}}>
                            {Array.from(Array(wordInLine).keys()).map(() => {
                                return <Grid item><Stack sx={{flexDirection: "column", display: "inline-flex"}}>
                                    {canvasActive ? <div style={{
                                        height: "17px", width: "2px", border: "1px dotted black"
                                    }}/> : ""}
                                    <span key="1"
                                          style={{
                                              font: "arial",
                                              fontFamily: "sans-serif",
                                              cursor: 'pointer',
                                          }}
                                          onClick={() => console.log("Do something fancy with clickable sampas")}>
                                                 {tokenStream.shift()}
                                             </span>
                                </Stack></Grid>

                            })}</Grid>
                    })}


                </p>


                <Button variant="contained" onClick={() => {
                    setId(null);
                    setValue(0)
                    setCanvasActive(false)
                }}>Zurück</Button>

            </Box>
        </TabPanel>
        // https://www.npmjs.com/package/react-diff-viewer <ReactDiffViewer oldValue={oldCode} newValue={newCode} splitView={true} />

    );

}

