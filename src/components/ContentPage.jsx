import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";


export default function ContentPage(props) {

    //all parameters destructured
    const {id,setId} = props;

    return (
        <Box>
            <h1>{props.id}</h1>
            <Button variant="contained" onClick={() => setId(null)}>Zurück</Button>

        </Box>

    // https://www.npmjs.com/package/react-diff-viewer <ReactDiffViewer oldValue={oldCode} newValue={newCode} splitView={true} />

);

}

