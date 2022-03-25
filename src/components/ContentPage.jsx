import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {poems} from "../data/poems"
import Highlighter from "react-highlight-words";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import {Howl} from "howler";
import {Stack} from "@mui/material";


export default function ContentPage(props) {

    //parameters destructured
    const {id, setId, searchInput, setValue, json, TabPanel, canvasActive} = props;

    const sound = new Howl({
        src: ["https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"], html5: true, //      preload: true
    })


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
    for (const token of json.tokens) {
        if (token.newline !== "1") {
            tokenStream.push(token.tokenString + " ")
        } else {
            tokenStream.push(token.tokenString + "\n")
        }

    }



    return (
        //TODO: optimize: spawns DOMNesting error, align screen-scrolling containers?*/
        <TabPanel value={0} index={0}>
            <Box>

                {/*//TODO: better positioning or somewhere else*/}
                <h3> {id[0] + " - " + id[1]}
                    <PlayArrowIcon style={{cursor: 'pointer'}} onClick={() => sound.play()}/>
                    <PauseIcon style={{cursor: 'pointer'}} onClick={() => sound.pause()}/></h3>


                <style>
                    {`#preline {
          white-space: pre-line;
          font-style: calibri;
           font-size: 15px;
           color:black;
        }`}
                </style>

                {/*TODO: add canvas if prosody tab is shown, improve highlighting*/}
                <p style={{whiteSpace:"pre-line"}}> {tokenStream.map((wort, index) => {
                    return (
                    <span
                        style={{
                            cursor: 'pointer',
                            color: wort.toLowerCase() === searchInput.toLowerCase() ? 'green' : 'black'
                        }}
                        onClick={() => console.log(index)}>{wort}</span>
                        )
                        {/*<Stack sx={{flexDirection: "column", display: "inline-flex"}}>
                        canvasActive ? <Canvas draw={draw}
                                               style={{border: '1px dotted black', width: "30px"}} /> : ""*/}
                })}</p>


                <Button variant="contained" onClick={() => {
                    setId(null);
                    setValue(0)
                }}>Zurück</Button>

            </Box>
        </TabPanel>
        // https://www.npmjs.com/package/react-diff-viewer <ReactDiffViewer oldValue={oldCode} newValue={newCode} splitView={true} />

    );

}

