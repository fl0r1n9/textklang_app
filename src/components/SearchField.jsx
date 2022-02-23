import * as React from 'react';
import Box from '@mui/material/Box';
import {InputLabel, MenuItem} from "@mui/material";
import {Select} from "@mui/material";
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Condition from "./Condition";
import {CreateNewCondition} from "./CreateNewCondition";

export default function SearchField(props) {


    const {setResult, searchInput, setString, searchFilter, setSearchFilter, setSearchInput} = props;


    //SearchFilter hook
    const handleChange = (event) => {
        setSearchFilter(event.target.value);
        setString('');
        setResult([]);
    };

    //add conditions hook
    const [conditions, setConditions] = React.useState([]);

    //FormControl hooks
    const [func, setFunc] = React.useState(null);

    const [entity, setEntity] = React.useState(null);



    const handleAddCondition = () => {
        setConditions(conditions.concat(new Condition(func, entity)));
        setFunc(null);
        setEntity(null);
    }


    //added conditions to be rendered
    function showConditions() {

        return conditions.map(condition => {
            return <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                <FormControl variant="standard" sx={{minWidth: 120}}>
                    <InputLabel id="demo-simple-select-standard-label">Funktion</InputLabel>
                    <Select
                        disabled={true}
                        value={condition.func}
                        //onChange={handleChange_fc}
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
                        disabled={true}
                        value={condition.entity}
                        //  onChange={handleChange_uc}
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
        })
    }

    return (

        <div>
            {/*standard condition component*/}
            <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end'}}>

                {/*main search bar*/}

                <Box sx={{display: 'flex', alignItems: 'flex-end'}}>
                    <TextField sx={{minWidth: 300}} id="input-with-sx" label="Suchen" variant="standard"
                               value={searchInput}
                               onChange={(event) => setSearchInput(event.target.value)}/>
                </Box>

                {/*filter button*/}
                <FormControl variant="standard" sx={{minWidth: 120}}>
                    <InputLabel id="demo-simple-select-standard-label">Suchen nach...</InputLabel>
                    <Select
                        value={searchFilter}
                        onChange={handleChange}
                        displayEmpty
                    >
                        <MenuItem value="all">Alle</MenuItem>
                        <MenuItem value="title">Titel</MenuItem>
                        <MenuItem value="author">Autor</MenuItem>
                        <MenuItem value="reader">Leser</MenuItem>
                    </Select>
                </FormControl>

            </Box>

            {showConditions()}
            <CreateNewCondition handleAddCondition={handleAddCondition}
                                conditions={conditions} func={func} setFunc={setFunc} entity={entity} setEntity={setEntity}/>


        </div>
    );

}