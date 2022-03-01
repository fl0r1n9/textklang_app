import * as React from "react";
import {poems} from '../data/poems'

export default function DetailsTab(props) {

    const poem = poems.find((poem) => poem.title === props.id[1])

    return (

        <>
            <p>{poem.author + " - " + poem.title}</p>
            <p>{poem.reader}</p>
        </>

    )
}