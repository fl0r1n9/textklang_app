import * as React from "react";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    InputLabel, List, ListItem, ListItemAvatar, ListItemText,
    MenuItem,
    Select
} from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";


//routine and logic for adding components

export function CreateNewCondition(props) {

    const {
        handleAddCondition, func, setFunc,
        entity, setEntity, where, setWhere,
        conditionSearchInput, setConditionSearchInput,
        handleDeleteCondition, handleSavePreset, handleLoadPreset,
        first, saveFilterName, setSaveFilterName
    }
        = props;


    //savePreset dialog hooks
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const emails = ['username@gmail.com', 'user02@gmail.com'];


    function SimpleDialog(props) {
        const { onClose, selectedValue, open } = props;

        const handleLoadClose = () => {
            onClose(selectedValue);
        };

        const handleListItemClick = (value) => {
            onClose(value);
        };

        return (
            <Dialog onClose={handleLoadClose} open={open}>
                <DialogTitle>Set backup account</DialogTitle>
                <List sx={{ pt: 0 }}>
                    {emails.map((email) => (
                        <ListItem button onClick={() => handleListItemClick(email)} key={email}>

                            <ListItemText primary={email} />
                        </ListItem>
                    ))}
                </List>
            </Dialog>
        );
    }

    const [loadOpen, setLoadOpen] = React.useState(false);
    const [selectedValue, setSelectedValue] = React.useState("");

    const handleClickLoadOpen = () => {
        setLoadOpen(true);
    };

    const handleLoadClose = (value) => {
        setLoadOpen(false);
        setSelectedValue(value);
    };


//editable condition box
//TODO: add more details/dependecies?
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
        <Box sx={{display: 'flex', justifyContent: 'space-between', mt: 4, flexWrap: 'wrap'}}>
            {/*take out ||!entity||!where for debugging*/}
            <Button variant="contained" onClick={handleAddCondition} disabled={!func}>Filter
                +</Button>
            <Button variant="contained" onClick={handleDeleteCondition}>Filter -</Button>
            <Button variant="contained" onClick={handleClickOpen}>Filter speichern</Button>

            {/*//TODO: this button's functionality, modals, slide menu */}
            <Button variant="contained" onClick={handleClickLoadOpen}>Filter laden</Button>
        </Box>
        {/*add filter dialog*/}
        <Dialog open={open} onClose={handleLoadClose}>
            <DialogTitle>Filter speichern</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Bitte einen Namen für den/die zu speichernden Filter angeben
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
                <Button onClick={() => {handleSavePreset(); handleClose()}}>OK</Button>
            </DialogActions>

        </Dialog>
            <SimpleDialog
                selectedValue={selectedValue}
                open={loadOpen}
                onClose={handleLoadClose}
            />

    </div>

}