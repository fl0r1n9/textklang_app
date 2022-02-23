import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {poems} from "../data/poems"
import Highlighter from "react-highlight-words";

export default function ContentPage(props) {

    //all parameters destructured
    const {id, setId, searchInput} = props;

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

    return (
        <Box>
            <h1>{id[0] + " - " + id[1]}</h1>
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


            <Button variant="contained" onClick={() => setId(null)}>Zurück</Button>

        </Box>
        // https://www.npmjs.com/package/react-diff-viewer <ReactDiffViewer oldValue={oldCode} newValue={newCode} splitView={true} />

    );

}
