import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {poems} from "../data/poems"
import Highlighter from "react-highlight-words";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import {Howl} from "howler";

export default function ContentPage(props) {

    //all parameters destructured
    const {id, setId, searchInput, setValue} = props;

    const sound = new Howl({
        src: ["https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"], html5: true, //      preload: true
    })


    let displayText;


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

    return (<Box>
            {/*//TODO: better positioning*/}
            <h3>{id[0] + " - " + id[1]}
                <PlayArrowIcon style={{cursor: 'pointer'}} onClick={() => sound.play()}/>
                <PauseIcon style={{cursor: 'pointer'}} onClick={() => sound.pause()}/>
            </h3>
            <style>
                {`#preline {
          white-space: pre-line;
        }`}
            </style>
            <p id="preline">
                <Highlighter
                    searchWords={[searchInput]}
                    autoEscape={true}
                    textToHighlight={displayText}
                >{displayText}</Highlighter>

            </p>

            {/*<p id="preline"> {displayText.split(' ').map((wort, index) => {
                return <span  style={{color: wort.toLowerCase() === searchInput ? 'green' : 'black'}}
                             onClick={() => console.log(index)}>{wort}</span>
            })}</p>*/}


            <Button variant="contained" onClick={() => {
                setId(null);
                setValue(0)
            }}>Zurück</Button>

        </Box>
        // https://www.npmjs.com/package/react-diff-viewer <ReactDiffViewer oldValue={oldCode} newValue={newCode} splitView={true} />

    );

}

