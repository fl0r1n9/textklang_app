import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Highlighter from "react-highlight-words";
import {Stack} from "@mui/material";
import Grid from "@mui/material/Grid";


export default function ContentPage(props) {

    //parameters destructured
    const {
        selectedPoem, setSelectedPoem, searchInput, setValue, TabPanel, canvasActive, setCanvasActive, setStart, setEnd
    } = props;

    let tokenStream = [];
    let lineLength = 0
    let lineLengths = []

    for (const token of selectedPoem.tokens) {
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

    let spanIndex
    const getIndex = (l, i, v) => {
        spanIndex = l.slice(0, i).reduce((pv, cv) => pv + cv, 0) + v
        return spanIndex
    }

    return (//TODO: optimize: spawns DOMNesting error, align screen-scrolling containers better?*/
        <TabPanel value={0} index={0}>
            <Box>
                <h3> {selectedPoem.author + " - " + selectedPoem.title}</h3>

                <style>
                    {`#preline2 {
          white-space: pre-line;
          font-style: calibri;
           font-size: 15px;
           color:black;
        }`}
                </style>

                <p id="preline2">
                    {lineLengths.map((wordInLine, index) => {
                        return <Grid container columnSpacing={1} sx={{justifyContent: 'center'}}>
                            {Array.from(Array(wordInLine).keys()).map((value) => {
                                return <Grid item><Stack sx={{flexDirection: "column", display: "inline-flex"}}>
                                    {canvasActive ? <div style={{
                                        height: "20px", width: "2px"
                                    }}/> : ""}
                                    <Highlighter
                                        searchWords={[searchInput]}
                                        autoEscape={true}
                                        textToHighlight={tokenStream[getIndex(lineLengths, index, value)][0]}
                                    >
                                    <span id={getIndex(lineLengths, index, value)}
                                          style={{
                                              font: "arial",
                                              fontFamily: "sans-serif",
                                              cursor: 'pointer',
                                              color: tokenStream[spanIndex][0].toLowerCase() === searchInput ? 'black' : 'black'
                                          }}
                                          onClick={/*get start and end time*/() => {
                                              setStart(tokenStream[spanIndex][1]);
                                              props.setWordClicked(!props.wordClicked)
                                              setEnd(tokenStream[spanIndex][2])
                                              console.log(spanIndex)
                                          }}>

                                          {tokenStream[spanIndex][0]}
                                              </span>
                                    </Highlighter>
                                </Stack></Grid>

                            })}</Grid>
                    })}


                </p>


                <Button variant="contained" onClick={() => {
                    setSelectedPoem(null);
                    setValue(0)
                    setCanvasActive(false)
                }}>Zurück</Button>

            </Box>
        </TabPanel>
        // https://www.npmjs.com/package/react-diff-viewer <ReactDiffViewer oldValue={oldCode} newValue={newCode} splitView={true} />

    );

}

