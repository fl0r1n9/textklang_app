import * as React from "react";
import Box from "@mui/material/Box";

export default function DetailsTab(props) {

    //const poem = poems.find((poem) => poem.title === props.selectedPoem[1])

    return (

        <Box sx={{alignContent: "flex-start", justifyContent: "flex-start"}}>
            <p>Titel: {props.selectedPoem.title} </p>
            <p>Autor: {props.selectedPoem.author}</p>
            <p>Leser: {props.selectedPoem.reader}</p>
        </Box>

    )
}