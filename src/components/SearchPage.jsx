import * as React from 'react';
import Box from '@mui/material/Box';
import {
    InputLabel, MenuItem, Snackbar
} from "@mui/material";
import {Select} from "@mui/material";
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Condition from "./Condition";
import {CreateNewCondition} from "./CreateNewCondition";

export default function SearchPage(props) {


    const {searchInput, setString, searchFilter, setSearchFilter, setSearchInput, conditions, setConditions} = props;


    //SearchFilter hook
    const handleChange = (event) => {
        setSearchFilter(event.target.value);
        setString('');
    };

    //FormControl hooks
    const [first, setFirst] = React.useState(true);

    const [func, setFunc] = React.useState(null);

    const [entity, setEntity] = React.useState(null);

    const [where, setWhere] = React.useState(null);

    const [conditionSearchInput, setConditionSearchInput] = React.useState('');

    const [saveFilterName, setSaveFilterName] = React.useState('');

    //snackbar hooks
    const [open, setOpen] = React.useState(false);
    const [message, setMessage] = React.useState("");

    function SimpleSnackbar() {

        const handleClose = (event, reason) => {
            if (reason === 'clickaway') {
                return;
            }

            setOpen(false);
        };

        return (<div>
            <Snackbar
                open={open}
                autoHideDuration={500}
                onClose={handleClose}
                anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
                message={message}
            />
        </div>);
    }

    //adding a condition box when filter+ button is pressed
    const handleAddCondition = () => {
        setConditions(conditions.concat(new Condition(first, func, entity, where, conditionSearchInput)));
        setFirst(false);
        setFunc(null);
        setEntity(null);
        setWhere(null);
        setConditionSearchInput('');
        setOpen(true)
        setMessage("Filter hinzugef??gt")
    }

    //undo previous
    const handleDeleteCondition = () => {
        if (conditions.length === 1) {
            setFirst(true);
        }
        setConditions(conditions.filter((element) => element !== conditions.slice(-1)[0]));
        setOpen(true)
        setMessage("Filter gel??scht")
    }

    //simple savePreset function
    const handleSavePreset = () => {

        let conditions_appended = {};
        conditions_appended[saveFilterName] = [];

        conditions_appended[saveFilterName].push({"searchInput": searchInput, "searchFilter": searchFilter});
        conditions.forEach((element) => {
            conditions_appended[saveFilterName].push(element);
        });

        //add filter blocks to local storage
        //TODO: on first instance: download&save standard filters from server, then check on startup whether they are deleted
        localStorage.setItem(saveFilterName, JSON.stringify(conditions_appended))
    }

    //loadPreset dialog hooks
    const [loadOpen, setLoadOpen] = React.useState(false);
    const [selectedValue, setSelectedValue] = React.useState("");

    const handleLoadPreset = (value) => {
        setLoadOpen(false);
        setSelectedValue(value);

        //get filters from local storage
        let retrieved = JSON.parse(localStorage.getItem(value))

        //set filters
        setSearchInput(Object.values(retrieved)[0][0].searchInput);
        setSearchFilter(Object.values(retrieved)[0][0].searchFilter);

        for (let i = 1; i < Object.values(retrieved)[0].length; i++) {
            conditions[i - 1] = Object.values(retrieved)[0][i];
        }

    };


    //render newly added conditions
    function showConditions() {
        return conditions.map(condition => {
            return <Box sx={{display: 'flex', justifyContent: 'space-between', border: 2, mt: 2, flexWrap: 'wrap'}}>
                <FormControl variant="standard" sx={{minWidth: 120}}>
                    <InputLabel id="demo-simple-select-standard-label">Funktion</InputLabel>
                    <Select
                        style={{color:'darkgreen'}}
                        disabled={true}
                        value={condition.func || ''}
                        displayEmpty
                    >
                        <MenuItem value="contains">
                            enth??lt
                        </MenuItem>
                        <MenuItem value="not">enth??lt nicht</MenuItem>
                        <MenuItem value="min">enth??lt mindestens</MenuItem>
                        <MenuItem value="max">enth??lt maximal</MenuItem>
                        <MenuItem value="follows">
                            folgt
                        </MenuItem>
                        <MenuItem value="follows_not">folgt nicht</MenuItem>
                    </Select>
                </FormControl>
                <FormControl variant="standard" sx={{minWidth: 120}}>
                    <InputLabel id="demo-simple-select-standard-label">was?</InputLabel>
                    <Select
                        disabled={true}
                        value={condition.entity || ''}
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
                        value={condition.where || ''}
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
                           variant="standard" label={"Detaileingabe"}
                           value={condition.conditionSearchInput || ''}/>

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
                                handleDeleteCondition={handleDeleteCondition}
                                conditions={conditions}
                                first={first} setFirst={setFirst}
                                func={func} setFunc={setFunc}
                                entity={entity} setEntity={setEntity}
                                where={where} setWhere={setWhere}
                                conditionSearchInput={conditionSearchInput}
                                setConditionSearchInput={setConditionSearchInput}
                                handleSavePreset={handleSavePreset}
                                handleLoadPreset={handleLoadPreset}
                                loadOpen={loadOpen}
                                setLoadOpen={setLoadOpen}
                                selectedValue={selectedValue}
                                saveFilterName={saveFilterName}
                                setSaveFilterName={setSaveFilterName}

            />
        <SimpleSnackbar/>
        </div>);

}