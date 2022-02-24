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
    //TODO: optimize: don't initialize w/ null
    const [first, setFirst] = React.useState(true);

    const [func, setFunc] = React.useState(null);

    const [entity, setEntity] = React.useState(null);

    const [where,setWhere] = React.useState(null);

    const [conditionSearchInput, setConditionSearchInput] = React.useState('');




    const handleAddCondition = () => {
        setConditions(conditions.concat(new Condition(first, func, entity, where,conditionSearchInput)));
        console.log(new Condition(first, func, entity, where,conditionSearchInput));
        setFirst(false);
        setFunc(null);
        setEntity(null);
        setWhere(null);
        setConditionSearchInput('');
    }


    //added conditions to be rendered
    function showConditions() {

        return conditions.map(condition => {
            return <Box sx={{display: 'flex', justifyContent: 'space-between', border:2, mt:2}}>
                <FormControl variant="standard" sx={{minWidth: 120}}>
                    <InputLabel id="demo-simple-select-standard-label">Funktion</InputLabel>
                    <Select
                        disabled={true}
                        value={condition.func}
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
                        disabled={true}
                        value={condition.where}
                        displayEmpty
                    >
                        <MenuItem value="wayne">egal</MenuItem>
                        <MenuItem value="vers_start">Versbeginn</MenuItem>
                        <MenuItem value="vers_end">Versende</MenuItem>
                        <MenuItem value="str_start">Strophenbeginn</MenuItem>
                        <MenuItem value="str_end">Strophenende</MenuItem>
                        <MenuItem value="int_start">Beginn Intonationsphrase</MenuItem>
                        <MenuItem value="int_end">Ende Intonationsphrase</MenuItem>
                    </Select>
                </FormControl>



                <TextField disabled={true} sx={{minWidth: 100}} id="input-for-condition-retro"
                           variant="standard" label={condition.conditionSearchInput}
                           value={condition.searchInput}/>

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
                        <MenuItem value="text">Text</MenuItem>

                    </Select>
                </FormControl>

            </Box>

            {showConditions()}
            <CreateNewCondition handleAddCondition={handleAddCondition}
                                conditions={conditions}
                                first={first} setFirst={setFirst}
                                func={func} setFunc={setFunc}
                                entity={entity} setEntity={setEntity}
                                where={where} setWhere={setWhere}
                                conditionSearchInput={conditionSearchInput} setConditionSearchInput={setConditionSearchInput}

            />


        </div>
    );

}