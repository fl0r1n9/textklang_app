import * as React from 'react';
import Box from '@mui/material/Box';
import {MenuItem} from "@mui/material";
import {Select} from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';


export default function SearchField() {

    const [searchFilter, setSearchFilter] = React.useState('');
    const handleChange = (event) => {
        setSearchFilter(event.target.value);
    };

    const [stateShowText, manipulateShowText] = React.useState(false);

    function renderShowText(buttonPress) {
        if (buttonPress === true) {
            return <h1>Optionen auswählen</h1>;
        } else {
            return <h1/>
        }
    }

    const theFunction = () => {manipulateShowText(true)}

    return (
        <div>

            <Box sx={{display: 'flex', justifyContent: 'space-between'}}>


                <Box sx={{display: 'flex', alignItems: 'flex-end'}}>
                    {/*TODO: new icon */}
                    {/*<AccountCircle sx={{color: 'action.active', mr: 1, my: 0.5}}/>*/}
                    <TextField id="input-with-sx" label="Suchen" variant="standard"/>
                </Box>

                <FormControl sx={{ minWidth: 120 }}> {/* TODO: change size*/}
                    <InputLabel id="demo-simple-select-label">Kategorie</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={searchFilter}
                        label="Search Filter"
                        onChange={handleChange}
                    >
                        <MenuItem value={1}>Alle</MenuItem>
                        <MenuItem value={2}>Titel</MenuItem>
                        <MenuItem value={3}>Autor</MenuItem>
                        <MenuItem value={4}>Leser</MenuItem>
                    </Select>
                </FormControl>

            </Box>

            {
                renderShowText(stateShowText)
            }

            <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                <Button variant="contained" onClick={theFunction}>Filter hinzufügen</Button>

                <Button variant="contained">Preset speichern</Button>
            </Box>

        </div>
    );

}