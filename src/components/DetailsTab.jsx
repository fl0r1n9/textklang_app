import * as React from "react";
import {poems} from '../data/poems'
import Box from "@mui/material/Box";

export default function DetailsTab(props) {

    const poem = poems.find((poem) => poem.title === props.id[1])

    return (

        <Box sx={{alignContent: "flex-start", justifyContent: "flex-start"}}>
            <p>Titel: {poem.title} </p>
            <p>Autor: {poem.author}</p>
            <p>Leser: {poem.reader}</p>
        </Box>

    )
}