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

    const {all_poems_json} = props;

    //global states
    const [selectedPoem, setSelectedPoem] = React.useState(null);
    const [searchInput, setSearchInput] = React.useState('');
    const [searchFilter, setSearchFilter] = React.useState('all');

    const [value, setValue] = React.useState(0);

    const [canvasActive, setCanvasActive] = React.useState(false);
    const [start, setStart] = React.useState(0);
    const [end, setEnd] = React.useState(0);
    const [wordClicked, setWordClicked] = React.useState(false);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        if (newValue === 2) {
            setCanvasActive(true)

        } else {
            setCanvasActive(false)
        }
    };


    //main view
    return (<Box sx={{width: '100%'}}>
        <Nav selectedPoem={selectedPoem} start={start} end={end} wordClicked={wordClicked}/>
        <Grid container rowSpacing={1} columnSpacing={{xs: 1, sm: 2, md: 3}}>
            {/*left component*/}
            <Grid item xs={6}>
                {/*render text when table entry is chosen*/}
                {selectedPoem === null ? <Item>
                    <ContentTable setSelectedPoem={setSelectedPoem}
                                  searchInput={searchInput}
                                  searchFilter={searchFilter}
                                  all_poems_json={all_poems_json}
                    />
                </Item> : <Item>
                    <ContentPage TabPanel={TabPanel} wordClicked={wordClicked} setWordClicked={setWordClicked}
                                 setStart={setStart} setEnd={setEnd} all_poems_json={all_poems_json} selectedPoem={selectedPoem}
                                 setSelectedPoem={setSelectedPoem} searchInput={searchInput} searchFilter={searchFilter}
                                 setValue={setValue} canvasActive={canvasActive} setCanvasActive={setCanvasActive}
                    />
                </Item>}

            </Grid>
            {/*right component*/}
            <Grid item xs={6}>
                <Item>
                    <Box sx={{width: '100%'}}>
                        <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                <Tab label="Suche"/>
                                <Tab label="Details" disabled={selectedPoem === null}/>
                                <Tab label="Prosodie" disabled={selectedPoem === null}/>
                                <Tab label="POS" disabled/>
                            </Tabs>
                        </Box>
                        <TabPanel value={value} index={0}>
                            <SearchTab searchInput={searchInput}
                                       setString={setSearchInput}
                                       searchFilter={searchFilter}
                                       setSearchFilter={setSearchFilter}
                                       setSearchInput={setSearchInput}/>
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            {selectedPoem ? <DetailsTab selectedPoem={selectedPoem}/> :
                                <h1>Für die Detailansicht bitte ein neues Gedicht auswählen</h1>}
                        </TabPanel>
                        <TabPanel value={value} index={2}>
                            {<ProsodyTab selectedPoem={selectedPoem}/>}
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
