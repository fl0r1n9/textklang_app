import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Highlighter from "react-highlight-words";
import {Stack, Tooltip} from "@mui/material";
import Grid from "@mui/material/Grid";


export default function ContentPage(props) {

    //parameters destructured
    const {
        selectedPoem,
        setSelectedPoem,
        searchInput,
        searchFilter,
        setValue,
        TabPanel,
        canvasActive,
        setCanvasActive,
        setStart,
        setEnd
    } = props;

    let tokenStream = [];
    let lineLength = 0
    let lineLengths = []

    //define text to be displayed
    for (const token of selectedPoem.tokens) {
        if (token.tokenString === ".") {
            tokenStream[tokenStream.length - 1][0] = tokenStream.slice(-1)[0][0].concat(".")
        } else if (token.tokenString === ",") {
            tokenStream[tokenStream.length - 1][0] = tokenStream.slice(-1)[0][0].concat(",")
        } else if (token.tokenString === ";") {
            tokenStream[tokenStream.length - 1][0] = tokenStream.slice(-1)[0][0].concat(";")
        } else if (token.tokenString === "!") {
            tokenStream[tokenStream.length - 1][0] = tokenStream.slice(-1)[0][0].concat("!")
        } else {
            tokenStream.push([token.tokenString, token.startTime, token.endTime])
            lineLength++
        }
        if (token.newline === "1") {
            lineLengths.push(lineLength)
            lineLength = 0
        }

    }

    //get index of spans by lineLenghts
    let spanIndex
    const getIndex = (l, i, v) => {
        spanIndex = l.slice(0, i).reduce((pv, cv) => pv + cv, 0) + v
        return spanIndex
    }

    function isHighlighted(l,i,v){
        return tokenStream[getIndex(l, i, v)][0].toLowerCase() === searchInput
    }

    return (//TODO: optimize: DOMNesting error, align screen-scrolling containers better?*/
        <TabPanel value={0} index={0}>
            <Box>
                <h3> {selectedPoem.author + " - " + selectedPoem.title}</h3>

                <p id="preline2" style={{whiteSpace: "pre-line",fontStyle: 'calibri', fontSize: '15px'}}>
                    {lineLengths.map((wordInLine, index) => {
                        return <Grid container columnSpacing={1} sx={{justifyContent: 'center'}}>
                            {Array.from(Array(wordInLine).keys()).map((value) => {
                                /*Stack canvas (if selected in prosody tab) and spans including text*/
                                return <Grid item> <Stack
                                    sx={{flexDirection: "column", display: "inline-flex", cursor: "pointer"}}>
                                    {canvasActive ? <div style={{
                                        height: "20px", width: "2px"
                                    }}/> : ""}
                                    <Tooltip title="Abspielen" placement="top">
                                    <span id={getIndex(lineLengths, index, value)}
                                          style={{color: isHighlighted(lineLengths, index, value) ? 'blue': 'black'}}>
                                        <Highlighter
                                            searchWords={(searchFilter === 'all' || searchFilter === 'text') ? [searchInput] : []}
                                            autoEscape={true}
                                            textToHighlight={tokenStream[getIndex(lineLengths, index, value)][0]}
                                            onClick={ /*get start and end time of clicked token*/ () => {
                                                setStart(tokenStream[getIndex(lineLengths, index, value)][1])
                                                props.setWordClicked(!props.wordClicked)
                                                setEnd(tokenStream[getIndex(lineLengths, index, value)][2])
                                            }}
                                        >
                                        {tokenStream[spanIndex][0]}
                                             </Highlighter>
                                              </span>
                                    </Tooltip>

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

