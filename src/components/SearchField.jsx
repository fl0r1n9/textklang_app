import * as React from 'react';
import Box from '@mui/material/Box';
import {InputLabel, MenuItem} from "@mui/material";
import {Select} from "@mui/material";
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Condition from "./Condition";
import {CreateNewCondition} from "./CreateNewCondition";
import {poems} from "../data/poems";
import {useState} from "react";


export default function SearchField() {

    //TODO: search for all & lift up
    /*
    const result = poems.filter(poem.text => {
        return "string" in poem = true;
    }).map(poem)
    */

    const [string,setString] = useState('');
    const [result,setResult] = useState('');

    const filterResults = (e) => {
        const searchString = e.target.value;

        if (searchString !== '') {

            let results;

            switch (searchFilter){
                case 'all':
                        results = poems.filter((poemData) => {
                            return poemData.text.toLowerCase().includes(searchString.toLowerCase());
                        });
                    break;
                case 'title':
                    results = poems.filter((poemData) => {
                        return poemData.title.toLowerCase().includes(searchString.toLowerCase());
                    });
                    break;
                case 'author':
                    results = poems.filter((poemData) => {
                        return poemData.author.toLowerCase().includes(searchString.toLowerCase());
                    });
                    break;
                case 'reader':
                    results = poems.filter((poemData) => {
                        return poemData.reader.toLowerCase().includes(searchString.toLowerCase());
                    });
                    break;
            }

            setResult(results);
        }else {
            setResult([]);
        }
        setString(searchString);
        console.log(result);
    }



    //FormControl hooks
    const [searchFilter, setSearchFilter] = React.useState('all');
    const handleChange = (event) => {
        setSearchFilter(event.target.value);
    };


    //add filter hook
    const [conditions, setConditions] = React.useState([]);


    const handleAddCondition = () => {
        setConditions(conditions.concat(new Condition(true, "contains", "punctuation", "vers_beg", "")));
    }


    //placeholder&preview condition
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
        //standard condition component

        <div>

            <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end'}}>

        {/*main search bar*/}

                <Box sx={{display: 'flex', alignItems: 'flex-end'}}>
                    {/*TODO: search button? */}
                    <TextField sx={{minWidth: 300}} id="input-with-sx" label="Suchen" variant="standard" value={string} onChange={filterResults}/>
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
            <CreateNewCondition handleAddCondition={handleAddCondition}/>


        </div>
    );

}