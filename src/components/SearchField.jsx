import * as React from 'react';
import Box from '@mui/material/Box';
import {MenuItem} from "@mui/material";
import {Select} from "@mui/material";
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
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

    const theFunction = () => {
        manipulateShowText(true)
    }

    return (
        <div>

            <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end'}}>


                <Box sx={{display: 'flex', alignItems: 'flex-end'}}>
                    {/*TODO: search button? */}
                    <TextField sx={{minWidth: 300}} id="input-with-sx" label="Suchen" variant="standard" />
                </Box>

                <FormControl variant="standard" sx={{minWidth: 120}}>
                    <Select
                        value={searchFilter}
                        onChange={handleChange}
                        displayEmpty
                    >
                        <MenuItem value="" itemID="all">
                            Alle
                        </MenuItem>
                        <MenuItem itemID="title">Titel</MenuItem>
                        <MenuItem itemID="author">Autor</MenuItem>
                        <MenuItem itemID="reader">Leser</MenuItem>
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