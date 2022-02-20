import * as React from 'react';
import {styled} from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import SearchTable from "./SearchTable";
import Nav from "./Nav";
import SearchField from "./SearchField";
import ContentPage from "./ContentPage";

const Item = styled(Paper)(({theme}) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));


export default function Layout() {

    const [id, setId] = React.useState(null);

    return (
        <Box sx={{width: '100%'}}>
            <Nav/>
            <Grid container rowSpacing={1} columnSpacing={{xs: 1, sm: 2, md: 3}}>
                <Grid item xs={6}>

                    {
                        id === null ? <Item>
                            <SearchTable setId={setId}/>
                        </Item> : <Item>
                            <ContentPage id={id} setId={setId}/>
                        </Item>
                    }

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