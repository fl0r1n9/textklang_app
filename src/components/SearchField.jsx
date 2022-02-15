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

    const [age, setAge] = React.useState('');
    const handleChange = (event) => {
        setAge(event.target.value);
    };

    const [stateShowText, manipulateShowText] = React.useState(false);

    function renderShowText(buttonPress) {
        if (buttonPress === true) {
            return <h1>Hello World</h1>;
        } else {
            return <h1/>
        }
    }

    function name(parameter) {

        manipulateShowText(true)
    }

    const theFunction = () => {manipulateShowText(true)}

    return (
        <div>

            <Box sx={{display: 'flex', justifyContent: 'space-between'}}>


                <Box sx={{display: 'flex', alignItems: 'flex-end'}}>
                    <AccountCircle sx={{color: 'action.active', mr: 1, my: 0.5}}/>
                    <TextField id="input-with-sx" label="suchen" variant="standard"/>
                </Box>

                <FormControl> {/* TODO: fullwidth*/}
                    <InputLabel id="demo-simple-select-label">Age</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={age}
                        label="Age"
                        onChange={handleChange}
                    >
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </FormControl>

            </Box>

            {
                renderShowText(stateShowText)
            }

            <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                <Button variant="contained" onClick={theFunction}>1</Button>

                <Button variant="contained">2</Button>
            </Box>

        </div>
    );

}