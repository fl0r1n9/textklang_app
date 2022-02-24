import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {poems} from "../data/poems"
import Highlighter from "react-highlight-words";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';


export default function ContentPage(props) {

    //all parameters destructured
    const {id, setId, searchInput} = props;

    let displayText;

    //TODO:implement
    function playFile() {
    }

    function pauseFile() {
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

    return (
        <Box>
            <h3>{id[0] + " - " + id[1]}
                <PlayArrowIcon style={{cursor: 'pointer'}} onClick={playFile}/>
                <PauseIcon style={{cursor: 'pointer'}} onClick={pauseFile}/>
            </h3>
            <style>
                {`#preline {
          white-space: pre-line;
        }`}
            </style>
            <p id="preline">
                {/*//TODO: optimize: Highlighter redundant attributes */}
                <Highlighter
                    searchWords={[searchInput]}
                    autoEscape={true}
                    textToHighlight={displayText}
                >{displayText}</Highlighter>
            </p>


            <Button variant="contained" onClick={() => setId(null)}>Zurück</Button>

        </Box>
        // https://www.npmjs.com/package/react-diff-viewer <ReactDiffViewer oldValue={oldCode} newValue={newCode} splitView={true} />

    );

}

