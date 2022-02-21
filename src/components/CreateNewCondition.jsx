import * as React from "react";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import {InputLabel, MenuItem, Select} from "@mui/material";
import Button from "@mui/material/Button";


//routine and logic for adding components

export function CreateNewCondition(props){

   const {handleAddCondition} = props;

//FormControl hooks
    const [func,setFunc] = React.useState(null);
    const handleChange_fc = (event) => {
        setFunc(event.target.value);
    };
    const [entity,setEntity] = React.useState(null);
    const handleChange_ec = (event) => {
        setEntity(event.target.value);
    };

//first condition
    return <div>
        <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
            <FormControl variant="standard" sx={{minWidth: 120}}>
                <InputLabel id="demo-simple-select-standard-label">Funktion</InputLabel>
                <Select

                    value={func}
                    onChange={handleChange_fc}
                    displayEmpty
                >
                    <MenuItem value="contains">
                        enthält
                    </MenuItem>
                    <MenuItem value="not">enthält nicht</MenuItem>
                    <MenuItem value="min">enthält mindestens</MenuItem>
                    <MenuItem value="max">enthält maximal</MenuItem>
                </Select>
            </FormControl>
            <FormControl variant="standard" sx={{minWidth: 120}}>
                <InputLabel id="demo-simple-select-standard-label">was?</InputLabel>
                <Select

                    value={entity}
                    onChange={handleChange_ec}
                    displayEmpty
                >
                    <MenuItem value="punctuation">
                        Satzzeichen
                    </MenuItem>
                    <MenuItem value="syl">Silbe</MenuItem>
                    <MenuItem value="word">Wort</MenuItem>
                    <MenuItem value="verse">Vers</MenuItem>
                </Select>
            </FormControl>
        </Box>
        <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
            <Button variant="contained" onClick={handleAddCondition} disabled={func === null || entity === null}>Filter hinzufügen</Button>

            <Button variant="contained">Preset laden</Button>
        </Box>
    </div>

}