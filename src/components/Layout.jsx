import * as React from 'react';
import {styled} from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import SearchTable from "./SearchTable";
import Nav from "./Nav";
import SearchField from "./SearchField";

const Item = styled(Paper)(({theme}) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function Layout() {
    const numbers = [{name: "abc", age: "23"}, {name: "def", age: "41"}, {name: "ghi", age: "43"}];

    return (
        <Box sx={{width: '100%'}}>
            <Nav/>
            <Grid container rowSpacing={1} columnSpacing={{xs: 1, sm: 2, md: 3}}>
                <Grid item xs={6}>
                    <Item>
                    <SearchTable/>
                    </Item>
                </Grid>
                <Grid item xs={6}>
                    <Item>
                        <SearchField/>
                    </Item>
                </Grid>
            </Grid>
        </Box>
    );
}