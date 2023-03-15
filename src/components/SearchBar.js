import SearchIcon from '@mui/icons-material/Search';
import { IconButton, TextField, Select, MenuItem, InputAdornment, Button, InputLabel, FormControl } from "@mui/material";
import { useEffect, useState, useReducer, useCallback } from "react";
import { React } from 'react';
import store from '../store';

const SearchBar = () => {
    const [choice, setChoice] = useState(1);

    const useStorageState = (key, initialState) => {
        const [value, setValue] = useState('')
        useEffect(() => {
            localStorage.setItem(key, value);
        }, [value, key]);
        return [value, setValue];
    } 
    const [searchTerm, setSearchTerm] = useStorageState('search', '');
    
    const handleFetch = useCallback(() => {
        if(!searchTerm) return;
        if(choice == 1 || choice == 2 || choice == 3) {
            store.dispatch({type: choice, searchTerm: searchTerm})
        }
        }, [searchTerm]);

    useEffect(() => {
        handleFetch();
    }, [handleFetch])

    const handleChange = (e) => {
        setChoice(e.target.value)
    }
    const reset = (e) => {
        setSearchTerm('')
        store.dispatch({type: 'RESET', searchTerm: searchTerm})
    }
    
    return(
    <FormControl fullWidth style={{ flexWrap:'wrap', 'justifyContent': 'space-between', display:'flex', 'flex-direction':'row'}}>
        <InputLabel id="simple-select-label">Filter By</InputLabel>
        <Select style={{width: '30%'}}
            labelId="simple-select-label"
            id="simple-select"
            value={choice}
            label="Find By"
            placeholder="Find By"
            onChange={handleChange}
        >
            <MenuItem value={1}>Type</MenuItem>
            <MenuItem value={2}>Status</MenuItem>
            <MenuItem value={3}>None</MenuItem>
        </Select>
        <TextField 
            id="search-bar"
            className="text"
            onInput={(e) => {
                setSearchTerm(e.target.value)
            }}
            value={searchTerm}
            variant = "outlined"
            placeholder="Search for capsule"
            size="medium"
            InputProps={{
                startAdornment: (
                    <InputAdornment position='start'>
                    <IconButton type="submit" aria-label="search">
                        <SearchIcon style={{fill: 'blue'}} />
                    </IconButton>
                    </InputAdornment>
                )
            }}
            style={{width: '30%', marginLeft: '5%'}}
        ></TextField>
        <Button onClick={reset} >Reset</Button>
    </FormControl>
);
}

export default SearchBar;