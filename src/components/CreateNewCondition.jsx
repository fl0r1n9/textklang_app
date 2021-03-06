import * as React from "react";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    InputLabel,
    List,
    ListItem,
    ListItemText,
    MenuItem,
    Select
} from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import PropTypes from "prop-types";


//routine and logic for adding components

export function CreateNewCondition(props) {

    const {
        handleAddCondition, func, setFunc,
        entity, setEntity, where, setWhere,
        conditionSearchInput, setConditionSearchInput,
        handleDeleteCondition, handleSavePreset,
        first, saveFilterName, setSaveFilterName, handleLoadPreset,
        loadOpen, setLoadOpen, selectedValue
    } = props;


    //savePreset dialog hooks
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    //loadPreset dialog hooks...
    const handleClickLoadOpen = () => {
        setLoadOpen(true);
    };

    const handleCloseLoadOpen = () => {
        setLoadOpen(false);
    };

    //... & custom function
    function LoadPresetDialog(props) {
        const {onClose, open} = props;

        const handleListItemClick = (value) => {
            onClose(value);
        };

        //read from local storage
        let filterList = []
        for (let i = 0; i < localStorage.length; i++) {
            filterList.push(localStorage.key(i))
        }

        return (<Dialog onClose={handleCloseLoadOpen} open={open}>
            <DialogTitle>Filter laden</DialogTitle>
            <List sx={{pt: 0}}>
                {filterList.length > 0 ? filterList.map((entry) =>
                    (<ListItem button onClick={() => handleListItemClick(entry)} key={entry}>

                        <ListItemText primary={entry}/>
                    </ListItem>)) : <ListItem key="empty">
                    <ListItemText primary="Keine Filter vorhanden"/>
                    </ListItem>}
                    </List>
                    </Dialog>);
                }

                LoadPresetDialog.propTypes = {
                onClose: PropTypes.func.isRequired, open: PropTypes.bool.isRequired, selectedValue: PropTypes.string.isRequired,
            };


                //editable condition box
                return <div>
                <Box sx={{display: 'flex', justifyContent: 'space-between', mt: 2, flexWrap: 'wrap'}}>

                    {first ? <FormControl variant="standard" sx={{minWidth: 120}}>
                        <InputLabel id="demo-simple-select-standard-label">Funktion</InputLabel>
                        <Select

                            value={func || ''}
                            onChange={(event) => setFunc(event.target.value)}
                            displayEmpty
                        >
                            <MenuItem value="contains">
                                enth??lt
                            </MenuItem>
                            <MenuItem value="not">enth??lt nicht</MenuItem>
                            <MenuItem value="min">enth??lt mindestens</MenuItem>
                            <MenuItem value="max">enth??lt maximal</MenuItem>
                        </Select>
                    </FormControl> : <FormControl variant="standard" sx={{minWidth: 120}}>
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
                {/*//TODO: better positioning, 2x2?*/}
                <Box sx={{display: 'flex', justifyContent: 'space-between', mt: 4, flexWrap: 'wrap'}}>
                    {/*take out ||!entity||!where for debugging*/}
                    <Button variant="contained" onClick={handleAddCondition} disabled={!func}>Filter
                        +</Button>
                    <Button variant="contained" onClick={handleDeleteCondition}>Filter -</Button>
                    <Button variant="contained" onClick={handleClickOpen}>Filter speichern</Button>
                    <Button variant="contained" onClick={handleClickLoadOpen}>Filter laden</Button>
                </Box>
                {/*add filter dialog, TODO: saveFilterName must not be empty*/}
                <Dialog open={open} onClose={handleSavePreset}>
                    <DialogTitle>Filter speichern</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Bitte einen Namen f??r den/die zu speichernden Filter angeben. Das Abspeichern geschieht
                            ausschlie??lich lokal
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Name"
                            type="string"
                            fullWidth
                            variant="standard"
                            value={saveFilterName}
                            onChange={(event) => setSaveFilterName(event.target.value)}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Abbrechen</Button>
                        <Button onClick={() => {
                            handleSavePreset();
                            handleClose()
                        }}>OK</Button>
                    </DialogActions>

                </Dialog>
                {/*load filter dialog*/}
                <LoadPresetDialog
                    selectedValue={selectedValue}
                    open={loadOpen}
                    onClose={handleLoadPreset}
                />

            </div>

                }