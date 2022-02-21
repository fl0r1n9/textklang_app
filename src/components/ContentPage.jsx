import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {poems} from "../data/poems"


export default function ContentPage(props) {

    //all parameters destructured
    const {id,setId} = props;

    let displayText;

    for (const key in poems) {
        if (props.id[1] === poems[key].title) {
            displayText = poems[key].text;
        }
    }

        return (
        <Box>
            <h1>{props.id[0] + " - " + props.id[1]}</h1>
            <style>
                {`#preline {
          white-space: pre-line;
        }`}
            </style>
            <p id="preline">{displayText}</p>



            <Button variant="contained" onClick={() => setId(null)}>Zurück</Button>

        </Box>

    // https://www.npmjs.com/package/react-diff-viewer <ReactDiffViewer oldValue={oldCode} newValue={newCode} splitView={true} />

);

}

