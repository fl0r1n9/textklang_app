import * as React from "react";

import Box from "@mui/material/Box";

import {VictoryBar, VictoryChart} from "victory";

export default function ProsodyTab() {


    return (

        <Box sx={{alignContent: "flex-start", justifyContent: "flex-start"}}>
            <VictoryBar/>
            <VictoryChart/>
        </Box>

    )
}