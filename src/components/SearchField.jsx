import * as React from 'react';
import Box from '@mui/material/Box';
import {MenuItem} from "@mui/material";
import {Select} from "@mui/material";
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useState} from "react";


export default function SearchField() {


    const [searchFilter, setSearchFilter] = React.useState('');

    const handleChange = (event) => {
        setSearchFilter(event.target.value);
    };

    const [stateShowNewBox, manipulateShowNewBox] = React.useState(false);

    function renderShowNewBox(buttonPress) {
        if (buttonPress === true) {
            return <h7>test</h7>
        } else {
            return <h1/>
        }
    }

    const setShowBoxTrue = () => {
        manipulateShowNewBox(true)
    }

    function NewBox(){
        const [state] = useState({count:0});

        return  <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
        </Box>
    }


    return (
        <div>

            <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end'}}>


                <Box sx={{display: 'flex', alignItems: 'flex-end'}}>
                    {/*TODO: search button? */}
                    <TextField sx={{minWidth: 300}} id="input-with-sx" label="Suchen" variant="standard"/>
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
                renderShowNewBox(stateShowNewBox)
            }
            <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                <Button variant="contained" onClick={setShowBoxTrue}>Filter hinzufügen</Button>

                <Button variant="contained">Preset speichern</Button>
            </Box>

        </div>
    );

}