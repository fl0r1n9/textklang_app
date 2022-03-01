import * as React from "react";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import {InputLabel, MenuItem, Select} from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";


//routine and logic for adding components

export function CreateNewCondition(props) {

    const {
        handleAddCondition, func, setFunc,
        entity, setEntity,where,setWhere,
        conditionSearchInput,setConditionSearchInput,
        handleDeleteCondition, handleSavePreset, first
    }
        = props;


//editable condition box
//TODO: add more details/dependecies?
    return <div>
        <Box sx={{display: 'flex', justifyContent: 'space-between', mt:2, flexWrap: 'wrap'}}>

            {first ? <FormControl variant="standard" sx={{minWidth: 120}}>
                <InputLabel id="demo-simple-select-standard-label">Funktion</InputLabel>
                <Select

                    value={func || ''}
                    onChange={(event) => setFunc(event.target.value)}
                    displayEmpty
                >
                    <MenuItem value="contains">
                        enthält
                    </MenuItem>
                    <MenuItem value="not">enthält nicht</MenuItem>
                    <MenuItem value="min">enthält mindestens</MenuItem>
                    <MenuItem value="max">enthält maximal</MenuItem>
                </Select>
            </FormControl> :
                <FormControl variant="standard" sx={{minWidth: 120}}>
                    <InputLabel id="demo-simple-select-standard-label">Funktion</InputLabel>
                    <Select

                        value={func || ''}
                        onChange={(event) => setFunc(event.target.value)}
                        displayEmpty
                    >
                        <MenuItem value="follows">
                            folgt
                        </MenuItem>
                        <MenuItem value="follows_not">folgt nicht</MenuItem>
                    </Select>
                </FormControl>

            }


            <FormControl variant="standard" sx={{minWidth: 120}}>
                <InputLabel id="demo-simple-select-standard-label">was?</InputLabel>
                <Select

                    value={entity || ''}
                    onChange={(event) => setEntity(event.target.value)}
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
            <FormControl variant="standard" sx={{minWidth: 120}}>
                <InputLabel id="demo-simple-select-standard-label">wo?</InputLabel>
                <Select

                    value={where || ''}
                    onChange={(event) => setWhere(event.target.value)}
                    displayEmpty
                >
                    <MenuItem value="wayne">egal</MenuItem>
                    <MenuItem value="vers_start">
                        Versbeginn
                    </MenuItem>
                    <MenuItem value="vers_end">Versende</MenuItem>
                    <MenuItem value="str_start">Strophenbeginn</MenuItem>
                    <MenuItem value="str_end">Strophenende</MenuItem>
                    <MenuItem value="int_start">Beginn Intonationsphrase</MenuItem>
                    <MenuItem value="int_end">Ende Intonationsphrase</MenuItem>
                </Select>
            </FormControl>
            <TextField sx={{minWidth: 100}} id="input-for-condition" label="Detaileingabe" variant="standard"
                       value={conditionSearchInput || ''}
                       onChange={(event) => setConditionSearchInput(event.target.value)}/>

        </Box>

        {/*bottom button row */}
        {/*//TODO: better positioning*/}
        <Box sx={{display: 'flex', justifyContent: 'space-between', mt:4, flexWrap: 'wrap'}}>
            {/*take out ||!entity||!where for debugging*/}
            <Button variant="contained" onClick={handleAddCondition} disabled={!func}>Filter
                +</Button>
            <Button variant="contained" onClick={handleDeleteCondition}>Filter -</Button>
            {/*//TODO: these two buttons, modals, slide menu */}
            <Button variant="contained" onClick={handleSavePreset}>Filter speichern</Button>

            <Button variant="contained">Filter laden</Button>
        </Box>
    </div>

}