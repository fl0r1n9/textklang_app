import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {poems} from "../data/poems"
import Highlighter from "react-highlight-words";

import {Stack} from "@mui/material";
import Grid from "@mui/material/Grid";


export default function ContentPage(props) {

    //parameters destructured
    const {id, setId, searchInput, setValue, json, TabPanel, canvasActive, setCanvasActive, setStart, setEnd} = props;


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
            tokenStream[tokenStream.length - 1][0] = tokenStream.slice(-1)[0][0].concat(".")
        } else if (token.tokenString === ",") {
            tokenStream[tokenStream.length - 1][0] = tokenStream.slice(-1)[0][0].concat(",")
        } else {
            tokenStream.push([token.tokenString, token.startTime, token.endTime])
            lineLength++
        }
        if (token.newline === "1") {
            lineLengths.push(lineLength)
            lineLength = 0
        }

    }

    return (//TODO: optimize: spawns DOMNesting error, align screen-scrolling containers better?*/
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
                    {lineLengths.map((wordInLine, index1) => {
                        return <Grid container columnSpacing={1} sx={{justifyContent: 'center'}}>
                            {Array.from(Array(wordInLine).keys()).map((value) => {
                                return <Grid item><Stack sx={{flexDirection: "column", display: "inline-flex"}}>
                                    {canvasActive ? <div style={{
                                        height: "20px", width: "2px"
                                    }}/> : ""}
                                    <span key={lineLengths.slice(0, index1).reduce((pv, cv) => pv + cv, 0) + value}
                                          style={{
                                              font: "arial", fontFamily: "sans-serif", cursor: 'pointer',
                                          }}
                                          onClick={/*get start and end time*/() => {
                                              setStart(tokenStream[lineLengths.slice(0, index1).reduce((pv, cv) => pv + cv, 0) + value][1]);
                                              setEnd(tokenStream[lineLengths.slice(0, index1).reduce((pv, cv) => pv + cv, 0) + value][2])
                                          }}>
                                          {tokenStream[lineLengths.slice(0,index1).reduce((pv,cv) => pv+cv,0) +value][0]}
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

                            )
                                ;

                            }

