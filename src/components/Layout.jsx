import * as React from 'react';
import {styled} from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import ContentTable from "./ContentTable";
import Nav from "./Nav";
import ContentPage from "./ContentPage";
import SearchTab from "./SearchTab";
import {Tab, Tabs} from "@mui/material";
import Typography from "@mui/material/Typography";
import DetailsTab from "./DetailsTab";
import ProsodyTab from "./ProsodyTab";

const Item = styled(Paper)(({theme}) => ({
    ...theme.typography.body2, padding: theme.spacing(1), textAlign: 'center', color: theme.palette.text.secondary,
}));


export default function Layout(props) {

    const {json} = props;

    const [id, setId] = React.useState(null);
    const [result, setResult] = React.useState('');
    const [searchInput, setSearchInput] = React.useState('');
    const [searchFilter, setSearchFilter] = React.useState('all');

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (<Box sx={{width: '100%'}}>
            <Nav/>
            <Grid container rowSpacing={1} columnSpacing={{xs: 1, sm: 2, md: 3}}>
                <Grid item xs={6}>

                    {id === null ? <Item>
                        <ContentTable setId={setId}
                                      result={result}
                                      searchInput={searchInput}
                                      searchFilter={searchFilter}
                        />
                    </Item> : <Item>
                        <ContentPage id={id} setId={setId} searchInput={searchInput} setValue={setValue}/>
                    </Item>}

                </Grid>

                <Grid item xs={6}>
                    <Item>
                        <Box sx={{width: '100%'}}>
                            <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                    <Tab label="Suche"/>
                                    <Tab label="Details" disabled={id === null}/>
                                    <Tab label="Prosodie" disabled={id === null}/>
                                    <Tab label="POS" disabled/>
                                </Tabs>
                            </Box>
                            <TabPanel value={value} index={0}>
                                <SearchTab setResult={setResult}
                                           searchInput={searchInput}
                                           setString={setSearchInput}
                                           searchFilter={searchFilter}
                                           setSearchFilter={setSearchFilter}
                                           setSearchInput={setSearchInput}/>
                            </TabPanel>
                            <TabPanel value={value} index={1}>
                                {id ? <DetailsTab id={id}/> :
                                    <h1>Für die Detailansicht bitte ein neues Gedicht auswählen</h1>}
                            </TabPanel>
                            <TabPanel value={value} index={2}>
                                {<ProsodyTab json={json}/>}
                            </TabPanel>
                        </Box>
                    </Item>
                </Grid>
            </Grid>
        </Box>);
}


function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (<div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (<Box sx={{p: 3}}>
                    <Typography>{children}</Typography>
                </Box>)}
        </div>);
}
